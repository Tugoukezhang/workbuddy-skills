# GitHub 动漫视频最强工具速查表

## 你的痛点 → 对标的工具

| 痛点 | 工具 | 效果 |
|:--|:--|:--|
| 写分镜 Prompt 太累 | **TipAI Cinema Skills** | 自动 10 维参数生成 140+词 Prompt |
| 审查 50 轮累死 | **TipAI Cinema Skills** | 5 层交叉审计 + 20 条规则代码验证 |
| 景别/角度老标错 | **TipAI Cinema Skills** | D2 摄影机物理参数自动量化 |
| 角色每段脸不一样 | InstantID | 一张三视图锁定 18 段长相 |
| 剧本→分镜 Prompt | PenShot | 3 行代码，任意格式 → 分镜 JSON |
| 本地分镜工作台 | Storyboard Studio | AI 解析+抽帧+生成+合并，导出剪映 |
| 打斗不流畅 | ToonCrafter | 两帧之间自动生成中间帧 |
| 逐段粘贴 Prompt 太慢 | comfyui-storyboard | 可视化分镜面板，一键批量生成 |
| 手动拼接 18 段素材 | CapCutAPI | 脚本自动拼接+转场 |

---

## 🏆 0. TipAI Cinema Skills（分镜+审查·真正的王牌）

**仓库**：`github.com/aitippro/tipai-cinema-skills`

### 安装
```bash
git clone https://github.com/aitippro/tipai-cinema-skills.git
# 零依赖，纯 Skill 文件。核心文件：skills/ai-video-studio.md
```

### 6 步强制工作流
```
剧本分析 → 角色锁定 → 分镜分解 → 逐镜生成 → 表情注入 → 交叉审计
```

### 10 维度参数体系
| 维度 | 内容 | 示例 |
|:--|:--|:--|
| D1 灯光 | 色温/角度/光比 | 4200K, 45° key, 3:1 ratio |
| D2 摄影机 | 机型/焦段/ISO | 85mm T1.4, ISO 800 |
| D3 角色 | Hex色值+SSS参数 | 发色 #1a1a1a, 肤色 #f5f0e8 |
| D4 表情 | 23 AU×强度 | AU1=0.05 AU4=0.05 |
| D5 微运动 | 速度/轨迹/频率 | 0.3cm/s arc |
| D6 氛围 | 粒子/密度/对流 | steam+dust dens0.15 |
| D7 色彩 | LUT/颗粒/饱和度 | Kodak2383, grain2.5% |
| D8 材质 | 粗糙度/镜面/SSS | — |
| D9 音画 | 声源/混响/视位 | — |
| D10 后期 | 颗粒/晕影/色差 | halation0.1, CA0.3px |

### 5 层交叉审计
```
自洽性 → 维度覆盖 → 物理合理性 → 引用完整性 → 可合成性 → ✅/❌
```
❌ 则自动修复→重新审计。

### 20 条质量规则验证器
```bash
node validator/check-shots.js my-shots.json
# 检查：镜头ID唯一性、景别重复≤3、光照变化≤±3°、
#       情感连续性、跨镜头特征一致性、FACS完整性...
```
**相当于我们手动 50 轮审查，一键完成。**

### 用法
加载 `skills/ai-video-studio.md` 给 AI Agent，说 "Start Creating"，粘贴剧本，AI 自动执行 6 步。

---

## 📝 1. PenShot（剧本→分镜 Prompt 自动生成）

**仓库**：`github.com/neopen/story-shot-agent`

### 安装
```bash
pip install penshot
```

### 用法
```python
from penshot.api import create_penshot_agent
agent = create_penshot_agent()
agent.breakdown_script_async("凌晨2点，男生打完BOSS后入睡，坠入异世界...")
# 输出：JSON 含 prompt / negative_prompt / duration / style / audio_prompt
```

### 对你的价值
任意格式剧本 → 标准化分镜 JSON，直接对接 Seedance。内置记忆系统确保角色/场景跨镜头一致。

---

## 🖥️ 2. Storyboard Studio（本地分镜工作台）

**仓库**：`github.com/BroderQi/Storyboard`

### 安装
从 Gitee Release 下载 `StoryboardSetup.exe`（国内更快），安装 .NET 8 运行时。

### 功能
- 视频导入 → 4 种智能抽帧模式
- 文本输入 → AI 自动拆分镜头
- 专业参数：5 种景别 + 7 种运镜 + 光线/色调/构图
- 导出 JSON 可直接导入剪映

---

## 1. comfyui-storyboard（分镜管理·批量生成）

**仓库**：`github.com/colorAi/comfyui-storyboard`

### 安装
```bash
# 进入 ComfyUI 目录
cd ComfyUI/custom_nodes
git clone https://github.com/colorAi/comfyui-storyboard.git
# 重启 ComfyUI，菜单栏出现「Storyboard」按钮
```

### 用法
1. 打开 ComfyUI → 点菜单栏「Storyboard」
2. 创建新分镜 → 每格填入你的 Prompt（直接从终稿文档复制）
3. 设置 3D 相机角度：正面/低角度/仰拍/高角度 一键预设
4. 点「Run All」→ 18 段一次性生成
5. 数据自动存 SQLite，不会丢

### 对你的价值
替代「打开 Loart → 粘贴 Prompt → 等待 → 下载 → 下一个」的 18 次循环。**一次配置，批量出图。**

---

## 2. ToonCrafter（补帧·打斗流畅核心）

**仓库**：`github.com/Doubiiu/ToonCrafter`

### 安装
```bash
git clone https://github.com/Doubiiu/ToonCrafter.git
cd ToonCrafter
pip install -r requirements.txt
```

### 用法
```bash
# 给 F3 末帧 + F4 首帧 → 生成 4 帧中间帧
python run.py --first_frame F3_last.png --last_frame F4_first.png --num_frames 4
```

### 对你的价值
- F3(冲刺横斩) → F4(横斩命中) 之间插 3 帧 = **刀从起手到命中不再是瞬移**
- F7(起跳) → F8(光核暴击) 之间插 4 帧 = **跳斩有飞行过程**
- 每段 Seedance 生成的视频丢进去补帧，24fps → 60fps，打斗立刻流畅

### 局限
- 单次最多 16 帧（~0.5 秒），适合做"关键帧间过渡"
- 分辨率 512×320，需要后期放大
- 需要 GPU（6GB+ VRAM）

---

## 3. InstantID（角色一致性）

**仓库**：`github.com/InstantID/InstantID`

### 安装
```bash
git clone https://github.com/InstantID/InstantID.git
cd InstantID
pip install -r requirements.txt
# 下载模型
huggingface-cli download InstantX/InstantID --local-dir ./models
```

### 用法
```python
# 一张男生三视图正面 → 所有生成图脸都一样
from instantid import InstantID
model = InstantID()
model.load_reference("男生三视图正面.png")
result = model.generate(prompt="男生持刀站在深坑边缘，琥珀天空", ref_scale=0.8)
```

### 对你的价值
- 18 段 × 每段 3-5 镜 = 约 60 张首帧图
- 每张用同一张面部参考图 → 60 张面孔一致
- 比 LoRA 轻：不用训练，即插即用

---

## 4. anime-pipeline（全自动管线·可选）

**仓库**：`github.com/yousan514-del/anime-pipeline`

### 安装
```bash
git clone https://github.com/yousan514-del/anime-pipeline.git
cd anime-pipeline
pip install -r requirements.txt
# 需要 ComfyUI + WAN 2.2 环境
```

### 用法
```bash
# 一键：主题 → 分镜 → 批量生成 → 质量筛选 → 打包
python run.py --theme "凌晨打游戏睡着后坠入异世界" --style "dark fantasy anime" --output ./episode1/
```

### 对你的价值
- 如果你要做**系列化内容**（第 2-7 段），这个管线可以自动出后续分镜
- 内置 Smooth_Booster v4 LoRA → 减少帧间抖动
- 自动质量筛选 → 丢弃明显坏图

### 局限
- 需要 WAN 2.2 模型（~20GB 显存）
- 配置复杂，适合批量生产而非单集精修

---

## 5. CapCutAPI（自动剪辑）

**仓库**：`github.com/sunguannan/capcut-api`

### 安装
```bash
pip install capcut-api
```

### 用法
```python
from capcut_api import CapCutAPI
api = CapCutAPI()

# 自动拼接 18 段素材
segments = ["S1A.mp4", "S1B.mp4", ..., "S6C.mp4"]
api.create_project("异世界第一集")
for seg in segments:
    api.add_clip(seg)
    api.add_transition("dissolve", duration=0.3)  # 叠化 0.3s

# 自动加 BGM
api.add_audio("BGM1_凌晨.mp3", start=0, end=24)
api.add_audio("BGM2_坠落.mp3", start=24, end=54)
# ...

api.export("异世界第一集_成品.mp4")
```

### 对你的价值
- 18 段手动拖时间线 → 脚本 10 行搞定
- BGM 轨道精准对位（你有 6 轨 BGM 要拼接）
- 转场统一叠化，比手动拉快 10 倍

---

## 📊 推荐优先级

| 优先级 | 工具 | 理由 |
|:--|:--|:--|
| **P0 立刻装** | comfyui-storyboard | 替代你手动 18 次粘贴 Prompt |
| **P0 立刻装** | InstantID | 解决角色脸不一致 |
| **P1 打斗前装** | ToonCrafter | F3→F4、F7→F8 补帧，打斗流畅立竿见影 |
| **P2 批量做时用** | anime-pipeline | 全自动管线，省人省时间 |
| **P2 剪辑时用** | CapCutAPI | 18 段自动拼接 |

---

## ⚡ 最小可行组合（今天就装）

```bash
# 1. 分镜管理
cd ComfyUI/custom_nodes && git clone https://github.com/colorAi/comfyui-storyboard.git

# 2. 角色一致性
git clone https://github.com/InstantID/InstantID.git && cd InstantID && pip install -r requirements.txt

# 3. 打斗补帧
git clone https://github.com/Doubiiu/ToonCrafter.git && cd ToonCrafter && pip install -r requirements.txt
```
