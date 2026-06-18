# OpenAI Whisper API

通过OpenAI音频转录API转录音频。

---
name: openai-whisper-api
description: "Transcribe audio via OpenAI Audio Transcriptions API (Whisper)."
description_zh: "通过 OpenAI API 转录音频"
description_en: "Transcribe audio via OpenAI Whisper API"
---

# OpenAI Whisper API (curl)

Transcribe an audio file via OpenAI's `/v1/audio/transcriptions` endpoint.

## Quick start

```bash
{baseDir}/scripts/transcribe.sh /path/to/audio.m4a
```

Defaults:
- Model: `whisper-1`
- Output: `<input>.txt`

## Useful flags

```bash
{baseDir}/scripts/transcribe.sh /path/to/audio.ogg --model whisper-1 --out /tmp/transcript.txt
{baseDir}/scripts/transcribe.sh /path/to/audio.m4a --language en
{baseDir}/scripts/transcribe.sh /path/to/audio.m4a --prompt "Speaker names: Peter, Daniel"
{baseDir}/scripts/transcribe.sh /path/to/audio.m4a --json --out /tmp/transcript.json
```

## API key

Set `OPENAI_API_KEY` environment variable.
