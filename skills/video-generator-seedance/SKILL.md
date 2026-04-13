# Video Generator

Video Generator技能，提供相关功能和服务。

---
name: Video-Generator-SeeDance
description: 使用火山引擎 SD1.5pro API 生成视频。支持文本到视频和图生视频，异步处理任务。
allowed-tools: Bash(python *)
---

# SD1.5pro 视频生成技能

## 功能
使用火山引擎的 SD1.5pro API 生成视频，支持纯文本生成和图生视频。

## 首次使用配置

### 1. 创建配置文件

在技能目录中创建 `config.json` 文件：

```json
{
  "api_key": "你的火山引擎API Key",
  "model": "你的模型ID（如：ep-20260313005600-p8s6m）"
}
```

### 2. 配置说明

- **api_key**: 火山引擎API Key（必需）
- **model**: 模型ID（必需），默认使用 `ep-20260313005600-p8s6m`

### 3. 获取API Key和模型ID

1. 访问火山引擎控制台：https://console.volcengine.com/
2. 在API Key管理中创建或获取API Key
3. 在模型服务中找到SD1.5pro模型的ID

## 使用方法

### 基本用法（仅文本生成）
```bash
python scripts/generate_video.py "提示词"
```

### 图生视频（需要参考图片）
```bash
python scripts/generate_video.py "提示词" --image "https://example.com/image.jpg"
```

### 指定输出路径
```bash
python scripts/generate_video.py "提示词" --output "C:\Users\Desktop\视频.mp4"
```

### 完整参数
```bash
python scripts/generate_video.py "提示词" \
  --image "https://example.com/image.jpg" \
  --duration 5 \
  --output "C:\Users\Desktop\视频.mp4" \
  --camera-fixed False \
  --watermark True
```

## 参数说明

| 参数 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| `prompt` | 字符串 | 是 | - | 文本提示词 |
| `--image` | 字符串 | 否 | 无 | 参考图片URL（图生视频） |
| `--duration` | 整数 | 否 | 5 | 视频时长（秒） |
| `--output` | 字符串 | 否 | 桌面 | 输出文件路径 |
| `--camera-fixed` | 布尔 | 否 | False | 相机是否固定 |
| `--watermark` | 布尔 | 否 | True | 是否添加水印 |

## 工作流程

1. **创建任务**: 调用API创建视频生成任务
2. **异步处理**: 轮询任务状态，等待生成完成
3. **下载视频**: 自动下载生成的视频到指定位置

## 示例

### 示例1：纯文本生成
```bash
python scripts/generate_video.py "冬日的杭州西湖，雪花纷纷扬扬飘落"
```

### 示例2：图生视频
```bash
python scripts/generate_video.py "无人机穿越障碍" \
  --image "https://example.com/reference.jpg"
```

### 示例3：自定义参数
```bash
python scripts/generate_video.py "美丽风景" \
  --duration 10 \
  --output "C:\Videos\风景.mp4" \
  --watermark False
```

## 注意事项

- 首次使用前必须配置 `config.json` 文件
- 视频生成是异步的，可能需要几分钟
- 建议使用桌面路径保存视频
- 支持MP4格式输出
- 默认视频时长为5秒，最大时长取决于模型限制

## 错误处理

如果遇到以下错误：

1. **配置文件不存在**: 创建 `config.json` 文件并配置API Key和模型ID
2. **API Key无效**: 检查API Key是否正确
3. **模型ID错误**: 确认模型ID是否有效
4. **网络错误**: 检查网络连接和防火墙设置

## API文档

- 火山引擎控制台: https://console.volcengine.com/
- API文档: https://www.volcengine.com/docs/
