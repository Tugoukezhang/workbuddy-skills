---
name: zenstudio
description: ZenStudio 官方 AI 内容创作 CLI 工具 (zencli)。支持 AI 生图、AI 生视频、项目管理、资产库、媒资管理、无限画布、文件上传下载等。Use when user asks to generate images, generate videos, manage projects, upload files, download assets, manage
  materials, or interact with ZenStudio platform via command line.
description_zh: ZenStudio AI 内容创作（生图、生视频、画布、素材管理）
description_en: 'ZenStudio AI content creation: image/video generation, canvas, assets'
version: 1.3.5
homepage: https://ai.tvi.v.qq.com/zenstudio
allowed-tools: Bash,Read
metadata: '{"openclaw":{"emoji":"🎬","requires":{"bins":["zencli"],"env":["ZENSTUDIO_API_KEY","ZENSTUDIO_ENDPOINT","ZENCLI_CONFIG_DIR","ZENCLI_NO_UPDATE_CHECK"]},"primaryEnv":"ZENSTUDIO_API_KEY","credentials":{"storage":"~/.zencli/config.json","configDirEnv":"ZENCLI_CONFIG_DIR","description":"zencli
  auth login 写入的 API Key 持久化文件，JSON 格式，仅存储 api_key 和 endpoint。非持久化容器中可通过 ZENCLI_CONFIG_DIR 环境变量指定配置目录"},"install":[{"id":"npm","kind":"node","package":"zenstudio-cli@1.3.5","bins":["zencli"],"label":"Install
  ZenStudio CLI (npm)"}],"category":"AIGC","tags":["zenstudio","aigc","cli","video-generation","image-generation","ai-tools"]}}'
license: MIT-0
author: ZenStudio Team
user-invocable: 'true'
---

# ZenStudio CLI (zencli)

AI 内容创作全流程命令行工具，封装 ZenStudio 平台 19+ 核心能力。

## 安装 & 配置

```bash
npm install -g zenstudio-cli@1.3.5

# 配置 API Key（三选一）
zencli auth login                          # 交互式登录（推荐）
zencli auth login --token <YOUR_API_KEY>   # 命令行传入
export ZENSTUDIO_API_KEY=<YOUR_API_KEY>    # 环境变量（仅推荐 CI/CD，Agent/子进程可能读不到 shell 配置）
# ↑ auth login 自动将 Token 写入配置文件：
#   若 ZENCLI_CONFIG_DIR 已设置 → $ZENCLI_CONFIG_DIR/config.json
#   否则 → ~/.zencli/config.json

zencli auth status                         # 验证登录状态
```

API Key 申请：[Claw 配置](https://ai.tvi.v.qq.com/zenstudio/open-api)

## 命令速查

```bash
# === 项目管理 ===
zencli project list [--search "关键词"]    # 列出/搜索项目
zencli project create "项目名"             # 创建项目
zencli project get <id>                    # 项目详情
zencli project update <id> --name "新名称" # 更新项目

# === 上传 / 下载 ===
zencli upload ./file.png -o json           # 上传文件 (COS SDK 直传)
zencli download <asset_id> [-d ./output/]  # 下载素材 (自动处理私有读签名)

# === AI 生图 ===
zencli generate image-models               # 查看可用模型（必须先调用！）
zencli generate image --prompt "描述" --model <model_id> [--aspect-ratio 16:9] [--input-images "url"] --poll

# === AI 生视频 (4 种驱动模式) ===
zencli generate video-models               # 查看可用模型（必须先调用！）
zencli generate video --prompt "描述" --model <provider_id> --poll                        # 纯文生视频（默认 Text 模式）
zencli generate video --prompt "描述" --model <provider_id> --single-image-url "url" --poll  # 图生视频（Text 模式 + 参考图）
zencli generate video --mode FirstLastFrame --prompt "描述" --model <provider_id> --first-frame-url "url" --poll  # 首尾帧
# 其他模式: FrameSequence(--sequence-frames)  SubjectToVideo(--reference-assets)
# --mode 默认 Text；通用选项: --duration <秒> --count 1-4 --enable-sound --poll

# === 媒资库 (asset) — 项目级媒体文件池 ===
zencli asset create --url <cdn_url> --project-id <id> -o json  # 入库（返回带签名 URL）
zencli asset search --project-id <id>      # 搜索
zencli asset get <asset_id>                # 详情
zencli asset update <asset_id> --name "新名称"  # 更新素材 (目前仅支持改名)

# === 资产库 (material) — 树形管理：人物/道具/场景/网盘 ===
zencli material list role_person           # 人物  |  role_prop 道具  |  role_scene 场景  |  root 网盘文件夹
zencli material add ...                    # 创建素材/文件夹（从媒资库挂载）
zencli material get <material_id>          # 素材详情
zencli role get <role_id>                  # 角色详情（LoRA/提示词/版本）

# === 画布 ===
zencli canvas list                         # 列出画布
zencli canvas create "名称"                # 创建画布
zencli canvas build-draft <canvas_id> --file nodes.json          # 增量合并（默认保留已有节点）
zencli canvas build-draft <canvas_id> --nodes '[...]'            # 同上，直接传 JSON
zencli canvas build-draft <canvas_id> -d "id1,id2"               # 删除指定节点
zencli canvas build-draft <canvas_id> -n '[...]' -d "old1"       # 同时增删改
zencli canvas build-draft <canvas_id> -n '[...]' --mode overwrite  # 全量覆盖（清空后重建）

# === 任务查询 ===
zencli generate task <task_id> [--poll]    # 查询/轮询生成任务状态

# === 通用透传（调用任意 MCP 工具）===
zencli tools list                          # 列出所有工具
zencli tools describe <tool_name>          # 查看参数 schema
zencli tools call <tool_name> --arg key=value [--json-args '{}']

# === URL / 升级 ===
zencli url build "页面名" [--params '{}']  # 构建 ZenStudio 前端链接
zencli url parse <url>                     # 解析 URL
zencli upgrade [--check]                   # 升级 / 仅检查
```

输出格式: `-o json`(默认, Agent 推荐) | `-o table`(人类阅读) | `-o text`(管道/脚本) | `zencli config set output_format <fmt>`

## 关键工作流：上传文件

**概念**：媒资库(asset) = 项目级文件池；资产库(material) = 树形目录(人物/道具/场景/网盘文件夹)。资产库的素材只能从媒资库挂载。

```bash
# 步骤 1: 上传 → CDN URL
zencli upload ./character.png -o json
# 步骤 2: 入媒资库（必须！返回 asset_id + 带签名的 asset_details）
zencli asset create --url <cdn_url> --project-id <project_id> -o json
# 步骤 3（按需）: 挂载到资产库（必传 asset_id + 完整 asset_details）
zencli material add --material-id <asset_id> --material-detail '<asset_details_json>' \
  --parent-id <target_id> --type 2 --project-ids <project_id>
```

> **步骤 1→2 强制绑定**，上传后必须入媒资库。视频/音频为私有读，只有入库后的 URL 才带签名。
>
> **步骤 3 由 Agent 判断**："上传文件" → 两步 | "上传到角色/道具/场景/文件夹" → 三步 | "媒资素材添加到资产库" → 仅步骤 3

## ⚠️ 重要规则

1. **前端链接必须用 `zencli url build` 生成**，严禁自行拼接 URL
2. **模型 ID 必须动态获取**：`image-models` / `video-models`，严禁猜测或硬编码
3. **`canvas` ≠ `project`**：画布用 `canvas`，短番项目用 `project`，不要混用
4. **`build-draft` 实时生效**：写入后正在查看画布的用户会**立即**看到变更，无需刷新页面
5. **`build-draft` 默认增量合并**：只需传变更的节点（新增/修改），已有节点自动保留。删除用 `-d`，全量覆盖用 `--mode overwrite`
6. **`build-draft` 支持多人协同**：CLI 写入画布时不会覆盖其他用户的并发编辑，可安全地与浏览器用户同时操作同一画布
7. **`build-draft` 节点数据校验**：
   - `type` 必须是 `image`/`video`/`audio`/`imageGenerator`/`videoGenerator`/`artboard`/`text`/`freehand` 之一
   - `image`/`video`/`audio` 节点**必须包含 `data.asset.id`**（非空字符串），否则被拒绝
   - `text` 节点**必须包含 `data.text.content`**（文本内容，最大2000字符），可选 fontSize/fontWeight/textAlign/color
   - `freehand` 节点**必须包含 `data.freehand.points`**（笔触坐标数组）和 **`data.freehand.initialSize`**（{width,height}），可选 color/size
   - `audio` 节点默认尺寸 260×80；`artboard` 节点缺少尺寸时默认 600×800
   - 服务端会自动修正常见问题（如空 `style`、缺少 `measured`、text/freehand 默认属性），但关键必填字段缺失无法修正
8. **素材命名最佳实践**：
   - **画布内生成**：使用 `--name` 传入"画布名称_素材特征"作为名字（如"产品设计画布_蓝色运动鞋"），通过 `canvas list` 获取画布名称
   - **非画布生成**：使用 `--name` 传入自定义名称，从 prompt 中提取核心关键词
9. **不确定参数时**用 `--help` 或 `tools describe` 自行探索

## 环境变量

- `ZENSTUDIO_API_KEY` — API Key (Bearer Token)
- `ZENSTUDIO_ENDPOINT` — API 端点 (默认 `https://ai.tvi.v.qq.com/zenstudio/api/mcp`)
- `ZENCLI_CONFIG_DIR` — 配置文件目录 (默认 `~/.zencli`，非持久化容器建议指向持久卷)
- `ZENCLI_NO_UPDATE_CHECK=1` — 禁用自动版本检查 (CI/CD 推荐)


## 工具说明

本技能使用以下工具：

- **Read**: 读取项目文件和配置
