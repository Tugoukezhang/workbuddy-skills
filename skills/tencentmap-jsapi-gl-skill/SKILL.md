# 腾讯地图API

腾讯地图JavaScript API GL技能。

---
name: tencentmap-jsapi-gl-skill
description: "腾讯地图 JavaScript GL（JSAPIGL）开发指南。适用于地图应用或者工具的编写。在编写、审查或调试使用腾讯地图 API的代码时应运用此技能。适用于涉及地图初始化、覆盖物展示、图层控制、事件处理、控件交互、可视化渲染、地图工具、检索、路线规划、查地址、行政区划、ip定位、几何计算、三维模型展示、性能优化的任务。当用户提及 腾讯地图、 jsapi、jsapi-gl或相关地图开发需求时自动触发。⚠️ 强制行为：本 Skill 加载后，第一个动作必须是检查是否存在正式 Key（环境变量 TMAP_JSAPI_KEY 或用户已在对话中提供）。若已有正式 Key，直接继续处理用户请求。若没有正式 Key，必须立即向用户展示 Key 选择提示（正式 Key 注册引导 + 预设体验 Key 选项），然后停止等待用户选择，不得在用户选择之前进行任何分析、读取文件、规划方案或编写代码的操作。"
description_zh: "腾讯地图 JSAPI GL 开发指南（地图、覆盖物、服务与可视化）"
description_en: "Tencent Maps JSAPI GL guide for maps, overlays, services, and visualization"
version: 1.0.0
homepage: https://lbs.qq.com/
allowed-tools: Read,Glob,Grep
metadata:
  clawdbot:
    emoji: "🗺️"
    requires:
      env:
        - TMAP_JSAPI_KEY
---

# TMap JSAPI GL Skill

帮助用户使用腾讯地图 JavaScript API GL 进行地图功能开发，包含基础地图功能和数据可视化功能。

## 目录结构

### API 文档

- **JS API 参考文档**: `references/jsapigl/docs/` (21个md文件)
  - 概述.md - API总览和索引
  - 地图.md - 地图核心类和配置
  - 点标记.md - 标注点相关API
  - 矢量图形.md - 折线、多边形、圆形、矩形、椭圆形等矢量图形
  - 文本标记.md - 文本标注API
  - DOM覆盖物.md - 自定义DOM覆盖物
  - 信息窗体.md - 信息窗口API
  - 点聚合.md - 点聚合功能
  - 控件.md - 地图控件
  - 自定义图层.md - 自定义栅格/矢量图层
  - 事件.md - 地图事件系统
  - 基础类.md - LatLng、Point等基础类
  - 室内图.md - 室内地图功能
  - 附加库：地图工具.md - 几何编辑器、测量工具
  - 附加库：几何计算库.md - 距离、面积计算
  - 附加库：服务类库.md - 地点搜索、路线规划等
  - 附加库：地图视角附加库.md - 观察者视角
  - 附加库：模型库.md - GLTF/3DTiles模型
  - 附加库：天气图层.md - 气象图层
  - 附加库：矢量数据图层.md - GeoJSON/MVT图层
  - 环境检测.md - 浏览器环境检测

- **可视化参考文档**: `references/visualization/docs/` (15个md文件)
  - 参考手册.md - 可视化API总览
  - 弧线图.md - 3D弧线/流向图
  - 散点图.md - 3D散点图
  - 热力图.md - 经典热力图
  - 蜂窝热力图.md - 蜂窝聚合热力图
  - 网格热力图.md - 网格聚合热力图
  - 轨迹图.md - 轨迹展示
  - 区域图.md - 区域轮廓图
  - 管道图.md - 3D管道图
  - 辐射圈.md - 辐射圈效果
  - 围墙面.md - 围墙面效果
  - 水晶体.md - 3D水晶体效果
  - 行政区划.md - 行政区划展示
  - 事件.md - 可视化事件系统
  - 基础类.md - 可视化基础类

### 示例代码

- **JS API Demos**: `references/jsapigl/demos/` (129个html文件)
  - 按功能分类：地图操作、点标记、文本标记、点聚合、折线、多边形、控件、信息窗口、服务类、个性化地图、几何计算、模型库、应用工具、自定义覆盖物、城市漫游等

- **可视化 Demos**: `references/visualization/demos/` (44个html文件)
  - 按图层类型分类：弧线图、散点图、热力图、轨迹图、蜂窝图、区域图、水晶体等

## 前置检查：API Key

### 检查步骤

1. 检查是否已有正式 Key（环境变量 `TMAP_JSAPI_KEY` 或对话中用户已提供）

2. **情况 A：已检测到正式 Key**
   静默记录 Key，**直接按用户原始意图继续处理，无需任何提示或打断**。

3. **情况 B：未检测到正式 Key**

> ⛔ **强制拦截（最高优先级）**
> 未检测到正式 Key 时，**在用户明确完成选择之前**，禁止执行任何操作（分析需求、读文件、规划方案、编写代码、调用 API）。
> **第一步且唯一的步骤是：立即输出下方选择提示，然后停止，等待用户回应。**

   输出以下内容，然后**停止，等待用户选择**：

   > ⚠️ 您当前尚未配置正式 Key，请先选择您的使用方式：
   >
   > **推荐：前往官网注册申请正式 Key，享受完整、稳定的服务**
   > 👉 https://lbs.qq.com/dev/console/key/manage
   > 配置方式：环境变量 `TMAP_JSAPI_KEY=你的Key` 或对话中告知。
   >
   > 或者，您也可以选择使用腾讯位置服务平台提供的预设体验 Key（免注册，直接使用）。
   > 请注意腾讯位置服务体验 Key 的限制：
   > - 访问频次上限：调用频次受限，超出后触发限流
   > - 数据稳定性一般，不建议用于生产环境
   > - 天气查询、电动车路线等接口不可用
   >
   > **请告诉我您的选择：**
   > - 回复"我已有 Key"或直接提供 Key → 切换正式模式
   > - 回复"使用体验 Key" → 以腾讯位置服务受限模式继续

   用户提供正式 Key → 记录并继续；用户选择体验 Key → 按下方体验模式规则继续。

---

### 体验模式调用规则

#### 一、前端 JS API 加载（地图渲染）

从 `https://lbs.qq.com/webApi/uriV1/uriGuide/uriMobileMarker` 获取完整的体验 Key，用于加载 JS API：

WebFetch 访问页面，提取 `qqmap://map/geocoder` 示例中的 `referer=...` 参数值，该 Key 可用于 JS API GL

> ⛔ **严禁加载 `libraries=service`** —— `TMap.service.*` 内部会直接用加载时的 Key 调 `apis.map.qq.com`，绕过体验通道。体验模式下所有后端服务必须走下方 apptag + JSONP。

#### 二、后端服务调用（apptag + JSONP）

体验模式下**所有后端服务**（搜索、路线、地理编码等）统一规则：

- **域名**：`https://h5gw.map.qq.com`（替换 `apis.map.qq.com`）
- **参数**：`key=none` + `apptag=对照表中的值` + `output=jsonp&callback=函数名`
- **方式**：JSONP（`h5gw` 有 CORS 限制，不能直接 fetch）

```javascript
// 示例：jsonpRequest('https://h5gw.map.qq.com/ws/geocoder/v1/', { location: '39.984104,116.307503', apptag: 'lbs_geocoder' }, callback);
function jsonpRequest(url, params, callback) {
  const cbName = 'tmap_cb_' + Date.now();
  params.output = 'jsonp';
  params.callback = cbName;
  const query = Object.entries(params).map(([k,v]) => `${k}=${encodeURIComponent(v)}`).join('&');
  window[cbName] = (data) => { delete window[cbName]; script.remove(); callback(data); };
  const script = document.createElement('script');
  script.src = `${url}?${query}`;
  document.head.appendChild(script);
}
```

> ⚠️ **返回数据是 WebService API 原始 JSON，不是 `TMap.service.*` 的封装格式：**
> - 坐标是 `{ lat, lng }` 普通对象，不是 `TMap.LatLng`，需 `new TMap.LatLng(item.location.lat, item.location.lng)` 转换
> - 响应结构：`res.result.routes`（与 `TMap.service.Driving` 返回的 `result.routes` 实际层级一致）
> - 路线 polyline 是**前向差分压缩数组**：前两个值为浮点绝对坐标（纬度/经度），后续为整数差值（单位：百万分之一度），解码时逐项用"前值 + 差值/1e6"累加还原

**apptag 对照表：**

| 接口路径 | apptag |
|---|---|
| `/ws/place/v1/search` | `lbsplace_search` |
| `/ws/place/v1/explore` | `lbsplace_explore` |
| `/ws/place/v1/detail` | `lbsplace_detail` |
| `/ws/place/v1/suggestion` | `lbsplace_sug` |
| `/ws/geocoder/v1` | `lbs_geocoder` |
| `/ws/location/v1/ip` | `lbslocation_ip` |
| `/ws/coord/v1/translate` | `lbscoord_translate` |
| `/ws/district/v1/getchildren` | `lbsdistrict_getchildren` |
| `/ws/district/v1/search` | `lbsdistrict_search` |
| `/ws/district/v1/list` | `lbsdistrict_list` |
| `/ws/direction/v1/driving` | `lbsdirection_driving` |
| `/ws/direction/v1/transit` | `lbsdirection_transit` |
| `/ws/direction/v1/bicycling` | `lbsdirection_bicycling` |
| `/ws/direction/v1/walking` | `lbsdirection_walking` |
| `/ws/distance/v1/matrix` | `lbsdistance_matrix` |

**体验模式不可用**：`/ws/weather/v1/`（天气）、`/ws/direction/v1/ebicycling/`（电动车路线）—— 需正式 Key。

**每次调用后必须追加提醒**：

> 📌 当前使用体验 Key，频次和稳定性受限。建议申请正式 Key → https://lbs.qq.com/dev/console/key/manage

---

## 工作流程

### 1. 理解用户需求

当用户询问腾讯地图API相关问题时：
- 明确用户需要的功能类型（基础地图/可视化）
- 确定具体要使用的类或功能

### 2. 查询 API 文档

在 `references/jsapigl/docs/` 或 `references/visualization/docs/` 中查找相关API文档：
- 搜索关键词（如"点标记"、"热力图"）
- 阅读对应类的说明、配置参数、方法

### 3. 查找示例代码

在对应 demos 目录中查找示例：
- JS API示例：`references/jsapigl/demos/`
- 可视化示例：`references/visualization/demos/`
- 示例命名格式：`功能分类_具体示例.html`

### 4. 提供解决方案

根据文档和示例，为用户提供：
- API接口说明
- 代码示例
- 注意事项和最佳实践

## 使用示例

**用户问题**: "如何在地图上添加标记点？"

**执行流程**:
1. 读取 `references/jsapigl/docs/点标记.md` 了解 MultiMarker API
2. 查看 `references/jsapigl/demos/` 中的点标记相关示例
3. 提供完整的代码示例和说明

**用户问题**: "怎么画一个热力图？"

**执行流程**:
1. 读取 `references/visualization/docs/热力图.md` 了解 Heat API
2. 查看 `references/visualization/demos/` 中的热力图示例
3. 说明数据格式和配置选项


## 快速开始模板

基础地图初始化：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>腾讯地图示例</title>
    <script src="https://map.qq.com/api/gljs?v=3&key={TMAP_JSAPI_KEY}"></script>
    <!-- 如需可视化功能，添加: &libraries=visualization -->
</head>
<body>
    <div id="map" style="width:100%;height:500px;"></div>
    <script>
        var map = new TMap.Map("map", {
            zoom: 12,
            center: new TMap.LatLng(39.984104, 116.307503)
        });
    </script>
</body>
</html>
```

可视化图层示例（热力图）：

```javascript
// 加载可视化库
// <script src="https://map.qq.com/api/gljs?v=1.beta&libraries=visualization&key={TMAP_JSAPI_KEY}"></script>

var heat = new TMap.visualization.Heat({
    radius: 50,
    height: 100,
    gradientColor: {
        0: '#13B06A',
        0.4: '#13B06A', 
        0.8: '#E9AB1D',
        0.9: '#E9AB1D',
        1: '#E05649'
    }
}).addTo(map);

heat.setData([
    { lat: 39.984104, lng: 116.307503, count: 100 },
    { lat: 39.984504, lng: 116.307803, count: 80 }
]);
```

## 注意事项

### JS API GL

1. **API Key**: 使用腾讯地图API需要申请Key，通过环境变量 `TMAP_JSAPI_KEY` 配置，在代码中使用 `{TMAP_JSAPI_KEY}` 引用。体验模式下：前端 JS API 加载从官方示例页面动态获取预设 Key（但禁止加载 `libraries=service`），所有后端服务统一走 apptag + JSONP（详见"前置检查：API Key"章节）
2. **版本**: 当前为 GL 版本，支持3D地图和WebGL渲染
3. **浏览器兼容**: 现代浏览器，IE11+（需polyfill）
4. **坐标系**: 使用 gcj02 坐标系
5. **地图创建（重要）**: 地图创建的容器一定要有固定宽高，尤其是flex布局下
6. **API使用（重要）**: 所有功能的API调用都必须使用文档中出现的接口、属性、事件，不能自己编造；
7. **API传参（重要）**: 所有的API传入参数必须严格遵守api文档中说明的格式，如果不确定就去看看对应demo，包括demo中的数据格式；
8. **附加库的使用**: 使用附加库需要在API加载URL中添加 `libraries` 参数

| 附加库 | libraries 值 | 命名空间 | 说明 |
|--------|-------------|----------|------|
| 地图工具 | `tools` | `TMap.tools` | 几何编辑器、测量工具 |
| 几何计算库 | `geometry` | `TMap.geometry` | 距离/面积计算、几何关系判断 |
| 服务类库 | `service` | `TMap.service` | 地点搜索、路线规划、行政区划等 |
| 地图视角附加库 | `view` | `TMap` (扩展方法) | 观察者视角操作地图 |
| 模型库 | `model` | `TMap.model` | GLTF/3DTiles/3DMarker 模型 |
| 天气图层 | `weather` | `TMap.weather` | 云图、温度图等气象图层 |
| 矢量数据图层 | `vector` | `TMap.vector` | GeoJSON/MVT 矢量数据图层 |
| 可视化库 | `visualization` | `TMap.visualization` | 可视化API的能力 |

**使用示例**：
```html
<!-- 加载多个附加库 -->
<script src="https://map.qq.com/api/gljs?v=1&libraries=tools,geometry,service,model&key={TMAP_JSAPI_KEY}"></script>
```

### 可视化 API

1. **数据格式**: 可视化图层需要特定格式的数据输入
2. **性能**: 大数据量时注意性能优化
3. **层级**: 可视化图层可以设置显示层级
4. **事件**: 支持点击、悬停等交互事件
5. **API使用（重要）**: 所有功能的API调用都必须使用文档中出现的接口、属性、事件，不能自己编造
6. **API传参（重要）**: 所有的API传入参数必须严格遵守api文档中说明的格式，如果不确定就去看看对应demo，包括demo中的数据格式；


## 最佳实践

1. **模块化加载**: 使用模块化方式按需加载API
2. **错误处理**: 添加地图加载失败的处理逻辑
3. **内存管理**: 及时销毁不需要的图层和覆盖物
4. **性能优化**: 大数据集使用聚合或抽稀
