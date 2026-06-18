# Video-Generator-SeeDance 视频生成技能

使用火山引擎 SD1.5pro API 生成视频，支持纯文本生成和图生视频。

## 🚀 快速开始

### 1. 配置技能

复制示例配置文件并填写您的信息：

```bash
cp config.example.json config.json
```

编辑 `config.json` 文件：

```json
{
  "api_key": "你的火山引擎API Key",
  "model": "你的模型ID（如：ep-20260313005600-p8s6m）"
}
```

### 2. 生成视频

#### 纯文本生成
```bash
python scripts/generate_video.py "冬日的杭州西湖，雪花纷纷扬扬飘落"
```

#### 图生视频
```bash
python scripts/generate_video.py "无人机穿越障碍" \
  --image "https://example.com/reference.jpg"
```

## 📋 获取API Key和模型ID

1. 访问火山引擎控制台：https://console.volcengine.com/
2. **获取API Key****:
   - 进入"API Key管理"
   - 创建或复制API Key
3. **获取模型ID**:
   - 进入"模型服务"
   - 找到SD1.5pro模型
   - 复制模型ID

## 🛠️ 参数说明

| 参数 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| `prompt` | 字符串 | 是 | - | 文本提示词 |
| `--image` | 字符串 | 否 | 无 | 参考图片URL（图生视频） |
| `--duration` | 整数 | 否 | 5 | 视频时长（秒） |
| `--output` | 字符串 | 否 | 桌面 | 输出文件路径 |
| `--camera-fixed` | 布尔 | 否 | False | 相机是否固定 |
| `--watermark` | 布尔 | 否 | True | 是否添加水印 |
| `--config` | 字符串 | 否 | config.json | 配置文件路径 |

## 📝 使用示例

### 示例1：纯文本生成
```bash
python scripts/generate_video.py "美丽风景"
```

### 示例2：指定输出路径
```bash
python scripts/generate_video.py "美丽风景" \
  --output "C:\Videos\风景.mp4"
```

### 示例3：图生视频
```需要的bash
python scripts/generate_video.py "无人机穿越障碍" \
  --image "https://example.com/reference.jpg"
```

### 示例4：自定义所有参数
```bash
python scripts/generate_video.py "美丽风景" \
  --image "https://example.com/reference.jpg" \
  --duration 10 \
  --output "C:\Videos\风景.mp4" \
  --camera-fixed False \
  --watermark False
```

## ⚠️ 注意事项

1. **配置文件**: 首次使用前必须配置 `config.json` 文件
2. **异步处理**: 视频生成是异步的，可能需要几分钟
3. **网络连接**: 需要稳定的网络连接
4. **文件路径**: 建议使用绝对路径保存视频
5. **模型限制**: 不同模型可能有不同的时长和分辨率限制

## 🔧 故障排除

### 错误：配置文件不存在
**解决方案**: 创建 `config.json` 文件并配置API Key和模型ID

### 错误：配置文件中缺少api_key
**解决方案**: 在 `config.json` 中添加 `api_key` 字段

### 错误：API Key无效
**解决方案**: 检查API Key是否正确，是否已过期

### 错误：模型ID错误
**解决方案**: 确认模型ID是否有效，模型是否可用

### 错误：网络连接失败
**解决方案**: 检查网络连接和防火墙设置

## 📚 相关文档

- [火山引擎控制台](https://console.volcengine.com/)
- [火山引擎API文档](https://www.volcengine.com/docs/)
- [ClawHub](https://clawhub.com)

## 📄 许可证

This skill is released under the MIT-0 License (MIT No Attribution). Feel free to use it for any purpose without attribution.

## 🤝 贡献

欢迎提交问题和改进建议！
