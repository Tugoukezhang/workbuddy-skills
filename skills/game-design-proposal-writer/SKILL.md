---
name: game-design-proposal-writer
description: Write decision-ready commercial and indie game design proposals from concept contracts, evidence, and production constraints.

# Game Design Proposal Writer

把概念契约、证据、生产约束收束为可评审的游戏策划案。

来源: ParanoiaSkills v0.8.0 (MIT) - https://github.com/DY-2026/ParanoiaSkills

## 输出模式

| 模式 | 触发 |
|---|---|
| commercial_product_proposal | 商业游戏、手游、立项 |
| indie_design_dossier | 独立游戏、Steam、买断 |
| one_page_decision_memo | 快速判断、会前材料 |
| publisher_pitch_outline | 发行、投资、合作方 |
| vertical_slice_design_doc | Demo、first playable |
| proposal_review_and_rewrite | 审核/改进已有案 |

## 一句话创意→策划案流程

1. 先用 `game-concept-architect` 生成概念契约
2. 再用本 skill 选输出模式生成正式策划案
3. 标注证据等级

## 安装

```bash
cp -r skills/game-design-proposal-writer ~/.workbuddy/skills/
```
