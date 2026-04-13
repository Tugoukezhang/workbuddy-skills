---
name: "game-development"
description: "游戏开发编排技能 - 提供核心原则并根据项目需求路由到特定子技能。适用于Web、移动、PC、VR/AR等平台的2D/3D游戏开发。"
read_when:
  - 开发游戏项目时
  - 需要游戏开发指导时
---

# Game Development Skill

## 概述

这是一个**游戏开发编排技能**，提供核心原则并根据项目需求路由到特定子技能。

## 子技能路由

### 平台选择

| 游戏目标平台 | 使用子技能 |
|--------------|-----------|
| Web浏览器 (HTML5, WebGL) | `game-development/web-games` |
| 移动端 (iOS, Android) | `game-development/mobile-games` |
| PC (Steam, 桌面) | `game-development/pc-games` |
| VR/AR头显 | `game-development/vr-ar` |

### 维度选择

| 游戏类型 | 使用子技能 |
|----------|-----------|
| 2D (精灵、瓦片地图) | `game-development/2d-games` |
| 3D (网格、着色器) | `game-development/3d-games` |

### 专业领域

| 需求 | 使用子技能 |
|------|-----------|
| GDD、平衡、玩家心理学 | `game-development/game-design` |
| 多人游戏、网络 | `game-development/multiplayer` |
| 视觉风格、资产管道、动画 | `game-development/game-art` |
| 声音设计、音乐、自适应音频 | `game-development/game-audio` |

## 核心原则（所有平台）

### 1. 游戏循环

每个游戏，无论平台，都遵循此模式：

```
INPUT  → 读取玩家操作
UPDATE → 处理游戏逻辑（固定时间步长）
RENDER → 绘制帧（插值）
```

### 2. 模式选择矩阵

| 模式 | 适用场景 | 示例 |
|------|----------|------|
| **状态机** | 3-5个离散状态 | 玩家: 待机→行走→跳跃 |
| **对象池** | 频繁生成/销毁 | 子弹、粒子 |
| **观察者/事件** | 跨系统通信 | 生命值→UI更新 |
| **ECS** | 数千个相似实体 | RTS单位、粒子 |
| **命令** | 撤销、重放、网络 | 输入记录 |
| **行为树** | 复杂AI决策 | 敌人AI |

### 3. 性能预算（60 FPS = 16.67ms）

| 系统 | 预算 |
|------|------|
| 输入 | 1ms |
| 物理 | 3ms |
| AI | 2ms |
| 游戏逻辑 | 4ms |
| 渲染 | 5ms |
| 缓冲 | 1.67ms |

> **记住**: 伟大的游戏来自迭代，而非完美。快速原型，然后打磨。
