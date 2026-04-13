'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var paths = require('./paths');

var DISTILLER_MIN_CAPSULES = parseInt(process.env.DISTILLER_MIN_CAPSULES || '10', 10) || 10;
var DISTILLER_INTERVAL_HOURS = parseInt(process.env.DISTILLER_INTERVAL_HOURS || '24', 10) || 24;
var DISTILLER_MIN_SUCCESS_RATE = parseFloat(process.env.DISTILLER_MIN_SUCCESS_RATE || '0.7') || 0.7;
var DISTILLED_MAX_FILES = 12;
var DISTILLED_ID_PREFIX = 'gene_distilled_';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readJsonIfExists(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    var raw = fs.readFileSync(filePath, 'utf8');
    if (!raw.trim()) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function readJsonlIfExists(filePath) {
  try {
    if (!fs.existsSync(filePath)) return [];
    var raw = fs.readFileSync(filePath, 'utf8');
    return raw.split('\n').map(function (l) { return l.trim(); }).filter(Boolean).map(function (l) {
      try { return JSON.parse(l); } catch (e) { return null; }
    }).filter(Boolean);
  } catch (e) {
    return [];
  }
}

function appendJsonl(filePath, obj) {
  ensureDir(path.dirname(filePath));
  fs.appendFileSync(filePath, JSON.stringify(obj) + '\n', 'utf8');
}

function distillerLogPath() {
  return path.join(paths.getMemoryDir(), 'distiller_log.jsonl');
}

function distillerStatePath() {
  return path.join(paths.getMemoryDir(), 'distiller_state.json');
}

function readDistillerState() {
  return readJsonIfExists(distillerStatePath(), {});
}

function writeDistillerState(state) {
  ensureDir(path.dirname(distillerStatePath()));
  var tmp = distillerStatePath() + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(state, null, 2) + '\n', 'utf8');
  fs.renameSync(tmp, distillerStatePath());
}

function computeDataHash(capsules) {
  var ids = capsules.map(function (c) { return c.id || ''; }).sort();
  return crypto.createHash('sha256').update(ids.join('|')).digest('hex').slice(0, 16);
}

// ---------------------------------------------------------------------------
// Step 1: collectDistillationData
// ---------------------------------------------------------------------------
function collectDistillationData() {
  var assetsDir = paths.getGepAssetsDir();
  var evoDir = paths.getEvolutionDir();

  var capsulesJson = readJsonIfExists(path.join(assetsDir, 'capsules.json'), { capsules: [] });
  var capsulesJsonl = readJsonlIfExists(path.join(assetsDir, 'capsules.jsonl'));
  var allCapsules = [].concat(capsulesJson.capsules || [], capsulesJsonl);

  var unique = new Map();
  allCapsules.forEach(function (c) { if (c && c.id) unique.set(String(c.id), c); });
  allCapsules = Array.from(unique.values());

  var successCapsules = allCapsules.filter(function (c) {
    if (!c || !c.outcome) return false;
    var status = typeof c.outcome === 'string' ? c.outcome : c.outcome.status;
    if (status !== 'success') return false;
    var score = c.outcome && Number.isFinite(Number(c.outcome.score)) ? Number(c.outcome.score) : 1;
    return score >= DISTILLER_MIN_SUCCESS_RATE;
  });

  var events = readJsonlIfExists(path.join(assetsDir, 'events.jsonl'));

  var memGraphPath = process.env.MEMORY_GRAPH_PATH || path.join(evoDir, 'memory_graph.jsonl');
  var graphEntries = readJsonlIfExists(memGraphPath);

  var grouped = {};
  successCapsules.forEach(function (c) {
    var geneId = c.gene || c.gene_id || 'unknown';
    if (!grouped[geneId]) {
      grouped[geneId] = {
        gene_id: geneId, capsules: [], total_count: 0,
        total_score: 0, triggers: [], summaries: [],
      };
    }
    var g = grouped[geneId];
    g.capsules.push(c);
    g.total_count += 1;
    g.total_score += (c.outcome && Number.isFinite(Number(c.outcome.score))) ? Number(c.outcome.score) : 0.8;
    if (Array.isArray(c.trigger)) g.triggers.push(c.trigger);
    if (c.summary) g.summaries.push(String(c.summary));
  });

  Object.keys(grouped).forEach(function (id) {
    var g = grouped[id];
    g.avg_score = g.total_count > 0 ? g.total_score / g.total_count : 0;
  });

  return {
    successCapsules: successCapsules,
    allCapsules: allCapsules,
    events: events,
    graphEntries: graphEntries,
    grouped: grouped,
    dataHash: computeDataHash(successCapsules),
  };
}

// ---------------------------------------------------------------------------
// Step 2: analyzePatterns
// ---------------------------------------------------------------------------
function analyzePatterns(data) {
  var grouped = data.grouped;
  var report = {
    high_frequency: [],
    strategy_drift: [],
    coverage_gaps: [],
    total_success: data.successCapsules.length,
    total_capsules: data.allCapsules.length,
    success_rate: data.allCapsules.length > 0 ? data.successCapsules.length / data.allCapsules.length : 0,
  };

  Object.keys(grouped).forEach(function (geneId) {
    var g = grouped[geneId];
    if (g.total_count >= 5) {
      var flat = [];
      g.triggers.forEach(function (t) { if (Array.isArray(t)) flat = flat.concat(t); });
      var freq = {};
      flat.forEach(function (t) { var k = String(t).toLowerCase(); freq[k] = (freq[k] || 0) + 1; });
      var top = Object.keys(freq).sort(function (a, b) { return freq[b] - freq[a]; }).slice(0, 5);
      report.high_frequency.push({ gene_id: geneId, count: g.total_count, avg_score: Math.round(g.avg_score * 100) / 100, top_triggers: top });
    }

    if (g.summaries.length >= 3) {
      var first = g.summaries[0];
      var last = g.summaries[g.summaries.length - 1];
      if (first !== last) {
        var fw = new Set(first.toLowerCase().split(/\s+/));
        var lw = new Set(last.toLowerCase().split(/\s+/));
        var inter = 0;
        fw.forEach(function (w) { if (lw.has(w)) inter++; });
        var union = fw.size + lw.size - inter;
        var sim = union > 0 ? inter / union : 1;
        if (sim < 0.6) {
          report.strategy_drift.push({ gene_id: geneId, similarity: Math.round(sim * 100) / 100, early_summary: first.slice(0, 120), recent_summary: last.slice(0, 120) });
        }
      }
    }
  });

  var signalFreq = {};
  (data.events || []).forEach(function (evt) {
    if (evt && Array.isArray(evt.signals)) {
      evt.signals.forEach(function (s) { var k = String(s).toLowerCase(); signalFreq[k] = (signalFreq[k] || 0) + 1; });
    }
  });
  var covered = new Set();
  Object.keys(grouped).forEach(function (geneId) {
    grouped[geneId].triggers.forEach(function (t) {
      if (Array.isArray(t)) t.forEach(function (s) { covered.add(String(s).toLowerCase()); });
    });
  });
  var gaps = Object.keys(signalFreq)
    .filter(function (s) { return signalFreq[s] >= 3 && !covered.has(s); })
    .sort(function (a, b) { return signalFreq[b] - signalFreq[a]; })
    .slice(0, 10);
  if (gaps.length > 0) {
    report.coverage_gaps = gaps.map(function (s) { return { signal: s, frequency: signalFreq[s] }; });
  }

  return report;
}

// ---------------------------------------------------------------------------
// Step 3: LLM response parsing
// ---------------------------------------------------------------------------
function extractJsonFromLlmResponse(text) {
  var str = String(text || '');
  var buffer = '';
  var depth = 0;
  for (var i = 0; i < str.length; i++) {
    var ch = str[i];
    if (ch === '{') { if (depth === 0) buffer = ''; depth++; buffer += ch; }
    else if (ch === '}') {
      depth--; buffer += ch;
      if (depth === 0 && buffer.length > 2) {
        try { var obj = JSON.parse(buffer); if (obj && typeof obj === 'object' && obj.type === 'Gene') return obj; } catch (e) {}
        buffer = '';
      }
      if (depth < 0) depth = 0;
    } else if (depth > 0) { buffer += ch; }
  }
  return null;
}

function buildDistillationPrompt(analysis, existingGenes, sampleCapsules) {
  var genesRef = existingGenes.map(function (g) {
    return { id: g.id, category: g.category || null, signals_match: g.signals_match || [] };
  });
  var samples = sampleCapsules.slice(0, 8).map(function (c) {
    return { gene: c.gene || c.gene_id || null, trigger: c.trigger || [], summary: (c.summary || '').slice(0, 200), outcome: c.outcome || null };
  });

  return [
    'You are a Gene synthesis engine for the GEP (Genome Evolution Protocol).',
    'Your job is to distill successful evolution capsules into a high-quality, reusable Gene',
    'that other AI agents can discover, fetch, and execute.',
    '',
    '## OUTPUT FORMAT',
    '',
    'Output ONLY a single valid JSON object (no markdown fences, no explanation).',
    '',
    '## GENE ID RULES (CRITICAL)',
    '',
    '- The id MUST start with "' + DISTILLED_ID_PREFIX + '" followed by a descriptive kebab-case name.',
    '- The suffix MUST describe the core capability in 3-6 hyphen-separated words.',
    '- NEVER include timestamps, numeric IDs, random numbers, tool names (cursor, vscode, etc.), or UUIDs.',
    '- Good: "gene_distilled_retry-with-exponential-backoff", "gene_distilled_database-migration-rollback"',
    '- Bad: "gene_distilled_cursor-1773331925711", "gene_distilled_1234567890", "gene_distilled_fix-1"',
    '',
    '## SUMMARY RULES',
    '',
    '- The "summary" MUST be a clear, human-readable sentence (30-200 chars) describing',
    '  WHAT capability this Gene provides and WHY it is useful.',
    '- Write as if for a marketplace listing -- the summary is the first thing other agents see.',
    '- Good: "Retry failed HTTP requests with exponential backoff, jitter, and circuit breaker to prevent cascade failures"',
    '- Bad: "Distilled from capsules", "AI agent skill", "cursor automation", "1773331925711"',
    '- NEVER include timestamps, build numbers, or tool names in the summary.',
    '',
    '## SIGNALS_MATCH RULES',
    '',
    '- Each signal MUST be a generic, reusable keyword that describes WHEN to trigger this Gene.',
    '- Use lowercase_snake_case. Signals should be domain terms, not implementation artifacts.',
    '- NEVER include timestamps, build numbers, tool names, session IDs, or random suffixes.',
    '- Include 3-7 signals covering both the problem domain and the solution approach.',
    '- Good: ["http_retry", "request_timeout", "exponential_backoff", "circuit_breaker", "resilience"]',
    '- Bad: ["cursor_auto_1773331925711", "cli_headless_1773331925711", "bypass_123"]',
    '',
    '## STRATEGY RULES',
    '',
    '- Strategy steps MUST be actionable, concrete instructions an AI agent can execute.',
    '- Each step should be a clear imperative sentence starting with a verb.',
    '- Include 5-10 steps. Each step should be self-contained and specific.',
    '- Do NOT describe what happened; describe what TO DO.',
    '- Include rationale or context in parentheses when non-obvious.',
    '- Where applicable, include inline code examples using backtick notation.',
    '- Good: "Wrap the HTTP call in a retry loop with `maxRetries=3` and initial delay of 500ms"',
    '- Bad: "Handle retries", "Fix the issue", "Improve reliability"',
    '',
    '## PRECONDITIONS RULES',
    '',
    '- List concrete, verifiable conditions that must be true before applying this Gene.',
    '- Each precondition should be a testable statement, not a vague requirement.',
    '- Good: "Project uses Node.js >= 18 with ES module support"',
    '- Bad: "need to fix something"',
    '',
    '## CONSTRAINTS',
    '',
    '- constraints.max_files MUST be <= ' + DISTILLED_MAX_FILES,
    '- constraints.forbidden_paths MUST include at least [".git", "node_modules"]',
    '',
    '## VALIDATION',
    '',
    '- Validation commands MUST start with "node ", "npm ", or "npx " (security constraint).',
    '- Include commands that actually verify the Gene was applied correctly.',
    '- Good: "npx tsc --noEmit", "npm test"',
    '- Bad: "node -v" (proves nothing about the Gene)',
    '',
    '## QUALITY BAR',
    '',
    'Imagine this Gene will be published on a marketplace for thousands of AI agents.',
    'It should be as professional and useful as a well-written library README.',
    'Ask yourself: "Would another agent find this Gene by searching for the signals?',
    'Would the summary make them want to fetch it? Would the strategy be enough to execute?"',
    '',
    '---',
    '',
    'SUCCESSFUL CAPSULES (grouped by pattern):',
    JSON.stringify(samples, null, 2),
    '',
    'EXISTING GENES (avoid duplication):',
    JSON.stringify(genesRef, null, 2),
    '',
    'ANALYSIS:',
    JSON.stringify(analysis, null, 2),
    '',
    'Output a single Gene JSON object with these fields:',
    '{ "type": "Gene", "id": "gene_distilled_<descriptive-kebab-name>", "summary": "<clear marketplace-quality description>", "category": "repair|optimize|innovate", "signals_match": ["generic_signal_1", ...], "preconditions": ["Concrete condition 1", ...], "strategy": ["Step 1: verb ...", "Step 2: verb ...", ...], "constraints": { "max_files": N, "forbidden_paths": [".git", "node_modules", ...] }, "validation": ["npx tsc --noEmit", ...], "schema_version": "1.6.0" }',
  ].join('\n');
}

function distillRequestPath() {
  return path.join(paths.getMemoryDir(), 'distill_request.json');
}

// ---------------------------------------------------------------------------
// Derive a descriptive ID from gene content when the LLM gives a bad name
// ---------------------------------------------------------------------------
function deriveDescriptiveId(gene) {
  var words = [];
  if (Array.isArray(gene.signals_match)) {
    gene.signals_match.slice(0, 3).forEach(function (s) {
      String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).forEach(function (w) {
        if (w.length >= 3 && words.length < 6) words.push(w);
      });
    });
  }
  if (words.length < 3 && gene.summary) {
    var STOP = new Set(['the', 'and', 'for', 'with', 'from', 'that', 'this', 'into', 'when', 'are', 'was', 'has', 'had']);
    String(gene.summary).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).forEach(function (w) {
      if (w.length >= 3 && !STOP.has(w) && words.length < 6) words.push(w);
    });
  }
  if (words.length < 3 && Array.isArray(gene.strategy) && gene.strategy.length > 0) {
    String(gene.strategy[0]).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).forEach(function (w) {
      if (w.length >= 3 && words.length < 6) words.push(w);
    });
  }
  if (words.length < 2) words = ['auto', 'distilled', 'strategy'];
  var unique = [];
  var seen = new Set();
  words.forEach(function (w) { if (!seen.has(w)) { seen.add(w); unique.push(w); } });
  return DISTILLED_ID_PREFIX + unique.slice(0, 5).join('-');
}

// ---------------------------------------------------------------------------
// Step 4: sanitizeSignalsMatch -- strip timestamps, random suffixes, tool names
// ---------------------------------------------------------------------------
function sanitizeSignalsMatch(signals) {
  if (!Array.isArray(signals)) return [];
  var cleaned = [];
  signals.forEach(function (s) {
    var sig = String(s || '').trim().toLowerCase();
    if (!sig) return;
    // Strip trailing timestamps (10+ digits) and random suffixes
    sig = sig.replace(/[_-]\d{10,}$/g, '');
    // Strip leading/trailing underscores/hyphens left over
    sig = sig.replace(/^[_-]+|[_-]+$/g, '');
    // Reject signals that are purely numeric
    if (/^\d+$/.test(sig)) return;
    // Reject signals that are just a tool name with optional number
    if (/^(cursor|vscode|vim|emacs|windsurf|copilot|cline|codex|bypass|distill)[_-]?\d*$/i.test(sig)) return;
    // Reject signals shorter than 3 chars after cleaning
    if (sig.length < 3) return;
    // Reject signals that still contain long numeric sequences (session IDs, etc.)
    if (/\d{8,}/.test(sig)) return;
    cleaned.push(sig);
  });
  // Deduplicate
  var seen = {};
  return cleaned.filter(function (s) { if (seen[s]) return false; seen[s] = true; return true; });
}

// ---------------------------------------------------------------------------
// Step 4: validateSynthesizedGene
// ---------------------------------------------------------------------------
function validateSynthesizedGene(gene, existingGenes) {
  var errors = [];
  if (!gene || typeof gene !== 'object') return { valid: false, errors: ['gene is not an object'] };

  if (gene.type !== 'Gene') errors.push('missing or wrong type (must be "Gene")');
  if (!gene.id || typeof gene.id !== 'string') errors.push('missing id');
  if (!gene.category) errors.push('missing category');
  if (!Array.isArray(gene.signals_match) || gene.signals_match.length === 0) errors.push('missing or empty signals_match');
  if (!Array.isArray(gene.strategy) || gene.strategy.length === 0) errors.push('missing or empty strategy');

  // --- Signals sanitization (BEFORE id derivation so deriveDescriptiveId uses clean signals) ---
  if (Array.isArray(gene.signals_match)) {
    gene.signals_match = sanitizeSignalsMatch(gene.signals_match);
    if (gene.signals_match.length === 0) {
      errors.push('signals_match is empty after sanitization (all signals were invalid)');
    }
  }

  // --- Summary sanitization (BEFORE id derivation so deriveDescriptiveId uses clean summary) ---
  if (gene.summary) {
    gene.summary = gene.summary.replace(/\s*\d{10,}\s*$/g, '').replace(/\.\s*\d{10,}/g, '.').trim();
  }

  // --- ID sanitization ---
  if (gene.id && !String(gene.id).startsWith(DISTILLED_ID_PREFIX)) {
    gene.id = DISTILLED_ID_PREFIX + String(gene.id).replace(/^gene_/, '');
  }

  if (gene.id) {
    var suffix = String(gene.id).replace(DISTILLED_ID_PREFIX, '');
    // Strip ALL embedded timestamps (10+ digit sequences) anywhere in the id
    suffix = suffix.replace(/[-_]?\d{10,}[-_]?/g, '-').replace(/[-_]+/g, '-').replace(/^[-_]+|[-_]+$/g, '');
    var needsRename = /^\d+$/.test(suffix) || /^\d{10,}/.test(suffix)
      || /^(cursor|vscode|vim|emacs|windsurf|copilot|cline|codex)[-_]?\d*$/i.test(suffix);
    if (needsRename) {
      gene.id = deriveDescriptiveId(gene);
    } else {
      gene.id = DISTILLED_ID_PREFIX + suffix;
    }
    var cleanSuffix = String(gene.id).replace(DISTILLED_ID_PREFIX, '');
    if (cleanSuffix.replace(/[-_]/g, '').length < 6) {
      gene.id = deriveDescriptiveId(gene);
    }
  }

  // --- Summary fallback (summary was already sanitized above, this handles missing/short) ---
  if (!gene.summary || typeof gene.summary !== 'string' || gene.summary.length < 10) {
    if (Array.isArray(gene.strategy) && gene.strategy.length > 0) {
      gene.summary = String(gene.strategy[0]).slice(0, 200);
    } else if (Array.isArray(gene.signals_match) && gene.signals_match.length > 0) {
      gene.summary = 'Strategy for: ' + gene.signals_match.slice(0, 3).join(', ');
    }
  }

  // --- Strategy quality: require minimum 3 steps ---
  if (Array.isArray(gene.strategy) && gene.strategy.length < 3) {
    errors.push('strategy must have at least 3 steps for a quality skill');
  }

  // --- Constraints ---
  if (!gene.constraints || typeof gene.constraints !== 'object') gene.constraints = {};
  if (!Array.isArray(gene.constraints.forbidden_paths) || gene.constraints.forbidden_paths.length === 0) {
    gene.constraints.forbidden_paths = ['.git', 'node_modules'];
  }
  if (!gene.constraints.forbidden_paths.some(function (p) { return p === '.git' || p === 'node_modules'; })) {
    errors.push('constraints.forbidden_paths must include .git or node_modules');
  }
  if (!gene.constraints.max_files || gene.constraints.max_files > DISTILLED_MAX_FILES) {
    gene.constraints.max_files = DISTILLED_MAX_FILES;
  }

  // --- Validation command sanitization ---
  var ALLOWED_PREFIXES = ['node ', 'npm ', 'npx '];
  if (Array.isArray(gene.validation)) {
    gene.validation = gene.validation.filter(function (cmd) {
      var c = String(cmd || '').trim();
      if (!c) return false;
      if (!ALLOWED_PREFIXES.some(function (p) { return c.startsWith(p); })) return false;
      if (/`|\$\(/.test(c)) return false;
      var stripped = c.replace(/"[^"]*"/g, '').replace(/'[^']*'/g, '');
      return !/[;&|><]/.test(stripped);
    });
  }

  // --- Schema version ---
  if (!gene.schema_version) gene.schema_version = '1.6.0';

  // --- Duplicate ID check ---
  var existingIds = new Set((existingGenes || []).map(function (g) { return g.id; }));
  if (gene.id && existingIds.has(gene.id)) {
    gene.id = gene.id + '_' + Date.now().toString(36);
  }

  // --- Signal overlap check ---
  if (gene.signals_match && existingGenes && existingGenes.length > 0) {
    var newSet = new Set(gene.signals_match.map(function (s) { return String(s).toLowerCase(); }));
    for (var i = 0; i < existingGenes.length; i++) {
      var eg = existingGenes[i];
      var egSet = new Set((eg.signals_match || []).map(function (s) { return String(s).toLowerCase(); }));
      if (newSet.size > 0 && egSet.size > 0) {
        var overlap = 0;
        newSet.forEach(function (s) { if (egSet.has(s)) overlap++; });
        if (overlap === newSet.size && overlap === egSet.size) {
          errors.push('signals_match fully overlaps with existing gene: ' + eg.id);
        }
      }
    }
  }

  return { valid: errors.length === 0, errors: errors, gene: gene };
}

// ---------------------------------------------------------------------------
// shouldDistill: gate check
// ---------------------------------------------------------------------------
function shouldDistill() {
  if (String(process.env.SKILL_DISTILLER || 'true').toLowerCase() === 'false') return false;

  var state = readDistillerState();
  if (state.last_distillation_at) {
    var elapsed = Date.now() - new Date(state.last_distillation_at).getTime();
    if (elapsed < DISTILLER_INTERVAL_HOURS * 3600000) return false;
  }

  var assetsDir = paths.getGepAssetsDir();
  var capsulesJson = readJsonIfExists(path.join(assetsDir, 'capsules.json'), { capsules: [] });
  var capsulesJsonl = readJsonlIfExists(path.join(assetsDir, 'capsules.jsonl'));
  var all = [].concat(capsulesJson.capsules || [], capsulesJsonl);

  var recent = all.slice(-10);
  var recentSuccess = recent.filter(function (c) {
    return c && c.outcome && (c.outcome.status === 'success' || c.outcome === 'success');
  }).length;
  if (recentSuccess < 7) return false;

  var totalSuccess = all.filter(function (c) {
    return c && c.outcome && (c.outcome.status === 'success' || c.outcome === 'success');
  }).length;
  if (totalSuccess < DISTILLER_MIN_CAPSULES) return false;

  return true;
}

// ---------------------------------------------------------------------------
// Step 5a: prepareDistillation -- collect data, build prompt, write to file
// ---------------------------------------------------------------------------
function prepareDistillation() {
  console.log('[Distiller] Preparing skill distillation...');

  var data = collectDistillationData();
  console.log('[Distiller] Collected ' + data.successCapsules.length + ' successful capsules across ' + Object.keys(data.grouped).length + ' gene groups.');

  if (data.successCapsules.length < DISTILLER_MIN_CAPSULES) {
    console.log('[Distiller] Not enough successful capsules (' + data.successCapsules.length + ' < ' + DISTILLER_MIN_CAPSULES + '). Skipping.');
    return { ok: false, reason: 'insufficient_data' };
  }

  var state = readDistillerState();
  if (state.last_data_hash === data.dataHash) {
    console.log('[Distiller] Data unchanged since last distillation (hash: ' + data.dataHash + '). Skipping.');
    return { ok: false, reason: 'idempotent_skip' };
  }

  var analysis = analyzePatterns(data);
  console.log('[Distiller] Analysis: high_freq=' + analysis.high_frequency.length + ' drift=' + analysis.strategy_drift.length + ' gaps=' + analysis.coverage_gaps.length);

  var assetsDir = paths.getGepAssetsDir();
  var existingGenesJson = readJsonIfExists(path.join(assetsDir, 'genes.json'), { genes: [] });
  var existingGenes = existingGenesJson.genes || [];

  var prompt = buildDistillationPrompt(analysis, existingGenes, data.successCapsules);

  var memDir = paths.getMemoryDir();
  ensureDir(memDir);
  var promptFileName = 'distill_prompt_' + Date.now() + '.txt';
  var promptPath = path.join(memDir, promptFileName);
  fs.writeFileSync(promptPath, prompt, 'utf8');

  var reqPath = distillRequestPath();
  var requestData = {
    type: 'DistillationRequest',
    created_at: new Date().toISOString(),
    prompt_path: promptPath,
    data_hash: data.dataHash,
    input_capsule_count: data.successCapsules.length,
    analysis_summary: {
      high_frequency_count: analysis.high_frequency.length,
      drift_count: analysis.strategy_drift.length,
      gap_count: analysis.coverage_gaps.length,
      success_rate: Math.round(analysis.success_rate * 100) / 100,
    },
  };
  fs.writeFileSync(reqPath, JSON.stringify(requestData, null, 2) + '\n', 'utf8');

  console.log('[Distiller] Prompt written to: ' + promptPath);
  return { ok: true, promptPath: promptPath, requestPath: reqPath, dataHash: data.dataHash };
}

// ---------------------------------------------------------------------------
// Step 5b: completeDistillation -- validate LLM response and save gene
// ---------------------------------------------------------------------------
function completeDistillation(responseText) {
  var reqPath = distillRequestPath();
  var request = readJsonIfExists(reqPath, null);

  if (!request) {
    console.warn('[Distiller] No pending distillation request found.');
    return { ok: false, reason: 'no_request' };
  }

  var rawGene = extractJsonFromLlmResponse(responseText);
  if (!rawGene) {
    appendJsonl(distillerLogPath(), {
      timestamp: new Date().toISOString(),
      data_hash: request.data_hash,
      status: 'error',
      error: 'LLM response did not contain a valid Gene JSON',
    });
    console.error('[Distiller] LLM response did not contain a valid Gene JSON.');
    return { ok: false, reason: 'no_gene_in_response' };
  }

  var assetsDir = paths.getGepAssetsDir();
  var existingGenesJson = readJsonIfExists(path.join(assetsDir, 'genes.json'), { genes: [] });
  var existingGenes = existingGenesJson.genes || [];

  var validation = validateSynthesizedGene(rawGene, existingGenes);

  var logEntry = {
    timestamp: new Date().toISOString(),
    data_hash: request.data_hash,
    input_capsule_count: request.input_capsule_count,
    analysis_summary: request.analysis_summary,
    synthesized_gene_id: validation.gene ? validation.gene.id : null,
    validation_passed: validation.valid,
    validation_errors: validation.errors,
  };

  if (!validation.valid) {
    logEntry.status = 'validation_failed';
    appendJsonl(distillerLogPath(), logEntry);
    console.warn('[Distiller] Gene failed validation: ' + validation.errors.join(', '));
    return { ok: false, reason: 'validation_failed', errors: validation.errors };
  }

  var gene = validation.gene;
  gene._distilled_meta = {
    distilled_at: new Date().toISOString(),
    source_capsule_count: request.input_capsule_count,
    data_hash: request.data_hash,
  };

  var assetStore = require('./assetStore');
  assetStore.upsertGene(gene);
  console.log('[Distiller] Gene "' + gene.id + '" written to genes.json.');

  var state = readDistillerState();
  state.last_distillation_at = new Date().toISOString();
  state.last_data_hash = request.data_hash;
  state.last_gene_id = gene.id;
  state.distillation_count = (state.distillation_count || 0) + 1;
  writeDistillerState(state);

  logEntry.status = 'success';
  logEntry.gene = gene;
  appendJsonl(distillerLogPath(), logEntry);

  try { fs.unlinkSync(reqPath); } catch (e) {}
  try { if (request.prompt_path) fs.unlinkSync(request.prompt_path); } catch (e) {}

  console.log('[Distiller] Distillation complete. New gene: ' + gene.id);

  if (process.env.SKILL_AUTO_PUBLISH !== '0') {
    try {
      var skillPublisher = require('./skillPublisher');
      skillPublisher.publishSkillToHub(gene).then(function (res) {
        if (res.ok) {
          console.log('[Distiller] Skill published to Hub: ' + (res.result?.skill_id || gene.id));
        } else {
          console.warn('[Distiller] Skill publish failed: ' + (res.error || 'unknown'));
        }
      }).catch(function () {});
    } catch (e) {
      console.warn('[Distiller] Skill publisher unavailable: ' + e.message);
    }
  }

  return { ok: true, gene: gene };
}

module.exports = {
  collectDistillationData: collectDistillationData,
  analyzePatterns: analyzePatterns,
  prepareDistillation: prepareDistillation,
  completeDistillation: completeDistillation,
  validateSynthesizedGene: validateSynthesizedGene,
  sanitizeSignalsMatch: sanitizeSignalsMatch,
  shouldDistill: shouldDistill,
  buildDistillationPrompt: buildDistillationPrompt,
  extractJsonFromLlmResponse: extractJsonFromLlmResponse,
  computeDataHash: computeDataHash,
  distillerLogPath: distillerLogPath,
  distillerStatePath: distillerStatePath,
  distillRequestPath: distillRequestPath,
  readDistillerState: readDistillerState,
  writeDistillerState: writeDistillerState,
  DISTILLED_ID_PREFIX: DISTILLED_ID_PREFIX,
  DISTILLED_MAX_FILES: DISTILLED_MAX_FILES,
};
