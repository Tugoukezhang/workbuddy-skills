# PPT 外观设计经验总结

> 基于竞品分析 + ppt-master dark-tech 流水线实操

---

## 一、竞品（浮生为卿歌）拆解出来的 5 条铁律

### 1. 背景不是纯色，是场景
- 竞品：游戏实机截图全屏铺开，有景深（前景→中景→远景）
- 我的失败：纯 `#0D1B3E`，用户说"跟全黑有啥区别"
- **结论**：要么有高清素材，要么用渐变+几何+发光制造"深度感"

### 2. 文字至少 4-5 个层级
```
层级1：顶部标签（小号, 半透明, monospace）  ← "CREATIVE PROPOSAL / 2026"
层级2：主标题（大号, 渐变/发光, 加粗）     ← "STARUSH" 88px
层级3：副标题（中号, 浅色）                ← "弹幕射击 × 男偶像养成"
层级4：分割线 + 标语（小号, 二级文字色）   ← "女性向市场的动作+养成融合新品类"
层级5：卡片内文字（标题+描述, 三级文字色） ← "核心玩法 / 弹幕舞台 × 偶像竞演"
```
- 只用 2 个层级 = Word 文档

### 3. 装饰元素不能省
- 竞品：金色细线、竖排文字、半透明角标
- 我加的：渐变装饰线（顶部+底部）、发光圆点、暗网格
- **刚需清单**：顶部线、底部线、页码、章节标、网格底纹

### 4. 卡片 > 列表
- 竞品底部 5 个卡片：图标 + 标题 + 副标题 + 编号 + 彩色边框
- 我的封面底部 4 个卡片（01-04）：monospace编号 + 中文标题 + 描述 + 不同颜色边框
- 纯文本列表 = 简陋

### 5. 颜色要有"系统"，不是随便配
- 竞品：暗底 + 金色点缀 + 5 个卡片 5 种颜色边框（有规律）
- 我用的：青 `#00D4FF` / 粉 `#F472B6` / 紫 `#A78BFA`，**全 deck 统一**
- 配置在 `spec_lock.md` 里，每页用同套色板

---

## 二、dark-tech 风格规范（ppt-master 内置）

| 维度 | 规范 |
|------|------|
| **形状** | 锐利几何，圆角 rx 4-8，薄发光线 |
| **装饰** | 发光点缀、细网格背景、monospace 标签、节点/连接线 |
| **留白** | 暗色负空间 = 深度，让元素"浮"在上面 |
| **排版** | 干净 sans 正文 + monospace 标签/数字 |
| **对比** | 暗底上 1-2 个发光色抢焦点，其余低调 |
| **纹理** | 发光和层次营造深度，不用投影 |

---

## 三、实际操作踩的坑

### 坑1：手动硬写 python-pptx → 必死
- 第一次 5 页：python-pptx API 直接写，结果像 Word 文档
- 第二次 12 页：PptxGenJS，卡片布局好一点，但仍然简陋
- **正确路径**：手写 SVG → ppt-master finalize → svg_to_pptx

### 坑2：SVG 技术约束（ppt-master 硬规定）
```
❌ 禁止：mask, <style>, class, foreignObject, textPath, animate, <g opacity>, rgba()
❌ 禁止：HTML 命名实体（用 Unicode 原始字符）
✅ 背景用 <rect>
✅ 文字换行用 <tspan>
✅ 透明度用 fill-opacity / stroke-opacity
✅ viewBox 必须是 0 0 1280 720
✅ 每个元素单独设 opacity
```

### 坑3：svg_to_pptx 流程顺序
```
svg_output/*.svg
  → finalize_svg.py  （嵌入图标、对齐图片、圆角矩形→Path）
  → svg_to_pptx.py   （导出 PPTX）
  → exports/*.pptx
```
缺依赖时报错 `ModuleNotFoundError: No module named 'pptx'`，先 `pip install python-pptx`。

### 坑4：spec_lock.md 是必选项
即使只做一页也得有，不然 svg_to_pptx 可能找不到配色/字体配置。

---

## 四、可复用的配色模板

```yaml
# STARUSH C 配色（dark-tech 暗舞台）
background:      "#0D1B3E"   # 深蓝黑底
secondary_bg:    "#152A50"   # 卡片/分区底色
primary:         "#00D4FF"   # 青色（主强调）
accent:          "#F472B6"   # 粉色（次要强调）
secondary_accent:"#A78BFA"   # 紫色（第三强调）
body_text:       "#E8EEF5"   # 主文字
secondary_text:  "#C9D6E8"   # 副文字
tertiary_text:   "#8A95B0"   # 注释/页脚
border:          "#00D4FF"   # 边框（半透明用 opacity）
```

**使用规则**：
- 60% 背景色、30% 卡片色、10% 强调色
- 三种强调色（青/粉/紫）交替用于不同卡片/模块
- 文字色从不直接用纯白，用 `#E8EEF5`（带点暖灰）

---

## 五、一页 PPT 的标准结构

```
┌──────────────────────────────────────┐
│ 顶部标签 (11px, monospace, tertiary) │
│ ═══════ 顶部装饰线（渐变）══════════ │
│                                      │
│         主标题 (64-88px, bold, 渐变) │
│         副标题 (24-28px, secondary)  │
│         ──── 分割线 ────             │
│         标语 (14-16px, tertiary)     │
│                                      │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐│
│  │ 卡片1 │ │ 卡片2 │ │ 卡片3 │ │ 卡片4 ││
│  └──────┘ └──────┘ └──────┘ └──────┘│
│                                      │
│ ═══════ 底部装饰线（渐变）══════════ │
│ 页脚 (10px, monospace, tertiary)    │
└──────────────────────────────────────┘
```

**卡片规格**：
- 宽 260px，高 72px
- 间距 20px
- 圆角 rx 6
- 背景 `#152A50` + 60% opacity
- 边框 0.8px，各卡片不同色（青/紫/粉交替）
- 内部：编号(monospace) + 标题(bold) + 描述(tertiary)

---

## 六、模型天花板对比

| 能力 | Claude Opus 4.7 | 我这个级别 |
|------|----------------|-----------|
| 排版精度 | 杂志级，衬线/无衬线混搭，字距精确 | 能用，但没"出版感" |
| 配色层次 | 微妙色调过渡，暗部 4-5 层 | 3 层到头 |
| 布局创意 | 非对称分割、全出血、浮动文字 | 居中+卡片横排，模板化 |
| 装饰细节 | 像素级精确，像专业设计师做的 | 差不多就行 |
| **结论** | **能惊艳** | **能用，不丢人** |

---

## 七、ptt-master 交接清单（给 Claude 用）

如果要把项目交给更强的模型接手：

```
projects/starush_proposal_ppt169_20260708/
├── spec_lock.md          ← 配色/字体/风格已锁定
├── sources/
│   └── proposal-context.md  ← 源素材
├── svg_output/
│   └── 01_cover.svg      ← 封面参考
└── exports/
    └── *.pptx            ← 当前输出

ppt-master 命令：
  python skills/ppt-master/scripts/finalize_svg.py <project>
  python skills/ppt-master/scripts/svg_to_pptx.py <project>
```
