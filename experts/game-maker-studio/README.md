# 游戏提案工坊 (Game Pitch Studio) v2.0.0

> 🤖 WorkBuddy Team 型专家包 — 一句话创意到精美路演PPT，一条龙搞定。

## 一句话调用

```
给我一句话描述你的游戏想法，我来帮你把创意变成策划案+路演PPT。
```

## Pipeline

```
创意 → 蓝图森(概念架构师) → 策悟安(策划总编) → 画点晴(提案设计师) → 精美PPT
```

## 团队成员

| 角色 | 花名 | 负责 | Skill |
|---|---|---|---|
| 🎬 创意总监 | 何铸游 | 调度全局 | - |
| 🏗️ 概念架构师 | 蓝图森 | 创意 → 概念蓝图 | game-concept-architect |
| ✍️ 策划总编 | 策悟安 | 概念 → 专业策划案 | game-design-proposal-writer |
| 🎨 提案设计师 | 画点晴 | 策划案 → 路演PPT | guizang-ppt-skill |

## 安装

```bash
# 1. 安装 Skills
cp -r skills/game-concept-architect ~/.workbuddy/skills/
cp -r skills/game-design-proposal-writer ~/.workbuddy/skills/

# 2. 安装 Expert
cp -r . ~/.workbuddy/plugins/marketplaces/my-experts/plugins/game-maker-studio/
```

## PPT Skill 选型

| 场景 | Skill | 格式 |
|---|---|---|
| 路演/投资人 | guizang-ppt-skill | 电子杂志风 HTML |
| 演讲者模式 | html-ppt | 36套主题 + 计时器 |
| 可编辑 | pptx / PPT Master | 原生 .pptx |
| 多风格/上线 | frontend-slides | 可部署 HTML |

## 推荐外置 Skill

- **[PPT Master](https://github.com/hugohe3/ppt-master)** ⭐10.6k+ — 真正可编辑 .pptx, 模板复刻, 旁白配音
