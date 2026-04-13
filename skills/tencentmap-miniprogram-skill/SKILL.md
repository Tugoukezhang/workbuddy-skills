---
name: tencentmap-miniprogram-skill
description: "此技能提供微信小程序地图开发的完整指导，包括地图组件使用、位置服务、标记点管理、路线规划、地理编码、POI搜索、点聚合和可视化图层等功能。当用户需求涉及微信小程序地图功能开发（如 map 组件、marker、callout、polyline、polygon、circle、地图、点标记、折线、多边形、圆形、弧线、定位、导航、路线规划、POI搜索、地理编码、点聚合、热力图、腾讯地图 SDK 等）时，应加载此技能。适用平台：微信小程序。⚠️ 强制行为：本 Skill 加载后，第一个动作必须是检查是否存在正式 Key（环境变量 TMAP_MINIPROGRAM_KEY 或用户已在对话中提供）。若已有正式 Key，直接继续处理用户请求。若没有正式 Key，必须立即向用户展示 Key 选择提示（正式 Key 注册引导 + 预设体验 Key 选项），然后停止等待用户选择，不得在用户选择之前进行任何分析、读取文件、规划方案或编写代码的操作。"
description_zh: "微信小程序地图开发指南（组件、定位、标记、路线、搜索与可视化）"
description_en: "WeChat Mini Program map guide: components, location, markers, routing & search"
version: 1.0.0
homepage: https://lbs.qq.com/miniProgram/js/jsSdk/jsSdkGuide/jsSdkGuide
allowed-tools: Read,Write,Glob,Grep
metadata:
  clawdbot:
    emoji: "🗺️"
    requires:
      env:
        - TMAP_MINIPROGRAM_KEY
---

# 腾讯地图微信小程序开发技能

帮助用户在微信小程序中实现地图功能开发，包含地图组件、位置服务、地图控制和后端服务能力。

## 目录结构

### API 文档

所有API文档位于 `references/` 目录：

#### 地图组件文档
- **references/map_component_guide.md** - 完整的小程序地图组件文档
  - 地图基础属性：longitude、latitude、scale、rotate、skew等
  - 标记点（marker）：在地图上显示标注，支持自定义图标、气泡、标签
  - 路线（polyline）：绘制路线和彩虹线，支持箭头、文本标注
  - 多边形（polygon）：绘制闭合区域，支持虚线边框
  - 圆形（circle）：显示圆形覆盖物
  - 点聚合：大量标记点的聚合展示
  - 自定义气泡：callout、customCallout
  - 地图事件：点击、视野变化、标记点点击等
  - 碰撞检测：marker碰撞关系配置
  - 地图控件：指南针、比例尺、3D楼块等

#### MapContext API文档
`references/mapContext_api/` 目录包含32个API文档：

**地图控制类**
- MapContext.md - MapContext总览
- wx.createMapContext.md - 创建MapContext实例
- MapContext.getCenterLocation.md - 获取地图中心点坐标
- MapContext.moveToLocation.md - 移动到指定位置
- MapContext.getRegion.md - 获取地图视野范围
- MapContext.getScale.md - 获取地图缩放级别
- MapContext.getRotate.md - 获取地图旋转角度
- MapContext.getSkew.md - 获取地图倾斜角度
- MapContext.setCenterOffset.md - 设置地图中心点偏移
- MapContext.setBoundary.md - 限制地图显示范围
- MapContext.includePoints.md - 缩放视野包含所有坐标点

**标记点管理类**
- MapContext.addMarkers.md - 添加标记点
- MapContext.removeMarkers.md - 移除标记点
- MapContext.translateMarker.md - 平移标记点（带动画）
- MapContext.moveAlong.md - 沿路径移动标记点（轨迹回放）
- MapContext.setLocMarkerIcon.md - 设置定位点图标

**点聚合类**
- MapContext.initMarkerCluster.md - 初始化点聚合配置
- MapContext.addMarkers.md - 添加聚合标记点

**覆盖物类**
- MapContext.addGroundOverlay.md - 添加自定义图片图层
- MapContext.updateGroundOverlay.md - 更新自定义图片图层
- MapContext.removeGroundOverlay.md - 移除自定义图片图层
- MapContext.addArc.md - 添加弧线
- MapContext.removeArc.md - 移除弧线

**可视化图层类**
- MapContext.addVisualLayer.md - 添加可视化图层
- MapContext.removeVisualLayer.md - 移除可视化图层
- MapContext.executeVisualLayerCommand.md - 执行可视化图层指令

**自定义图层类**
- MapContext.addCustomLayer.md - 添加个性化图层
- MapContext.removeCustomLayer.md - 移除个性化图层

**坐标转换类**
- MapContext.toScreenLocation.md - 经纬度转屏幕坐标
- MapContext.fromScreenLocation.md - 屏幕坐标转经纬度

**其他功能**
- MapContext.openMapApp.md - 拉起地图APP选择导航
- MapContext.eraseLines.md - 擦除或置灰已添加的线段
- MapContext.on.md - 监听地图事件

#### 位置服务API文档
`references/wx_location_api/` 目录包含12个API文档：

**基础定位**
- wx.getLocation.md - 获取当前的地理位置、速度
- wx.getFuzzyLocation.md - 获取模糊位置（隐私保护）

**地图选点**
- wx.chooseLocation.md - 打开地图选择位置
- wx.choosePoi.md - 选择POI点

**位置展示**
- wx.openLocation.md - 使用内置地图查看位置

**持续定位**
- wx.startLocationUpdate.md - 开启小程序前后台时均接收位置消息
- wx.startLocationUpdateBackground.md - 开启小程序进入前后台时均接收位置消息
- wx.stopLocationUpdate.md - 停止接收位置消息
- wx.onLocationChange.md - 监听实时地理位置变化事件
- wx.onLocationChangeError.md - 监听实时地理位置错误事件
- wx.offLocationChange.md - 取消监听实时地理位置变化事件
- wx.offLocationChangeError.md - 取消监听实时地理位置错误事件

#### LBS后端服务文档
`references/lbs_service_guide/` 目录包含9个API文档：

**SDK核心**
- qqMapwx.md - QQMapWX SDK核心类和使用指南

**搜索服务**
- methodSearch.md - 地点搜索（周边POI搜索）
- methodGetsuggestion.md - 关键词输入提示

**地理编码**
- methodGeocoder.md - 地址解析（地址转坐标）
- methodReverseGeocoder.md - 逆地址解析（坐标转地址）

**路线规划**
- methodDirection.md - 路线规划（驾车、步行、骑行、公交）

**距离计算**
- methodCalculatedistance.md - 距离计算（步行、驾车）

**行政区划**
- methodGetcitylist.md - 获取全国城市列表
- methodGetdistrictbycityid.md - 获取城市下行政区划

### 示例代码

`assets/examples/` 目录包含3个完整的小程序示例项目：

#### minicode-location/ - 定位功能示例
完整的获取用户位置示例项目


#### minicode-marker/ - 标记点示例
完整的地图标记点示例项目

#### minicode-markerCluster/ - 点聚合示例
完整的点聚合功能示例项目

### SDK库

`assets/libs/` 目录：
- **qqmap-wx-jssdk.js** - 腾讯位置服务微信小程序JS SDK
  - 完整的SDK源码
  - 支持地点搜索、路线规划、地理编码等功能

## 前置检查：API Key

### 检查步骤

1. 检查是否已有正式 Key（环境变量 `TMAP_MINIPROGRAM_KEY` 或对话中用户已提供）

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
   > 注册后可通过环境变量 `TMAP_MINIPROGRAM_KEY=你的Key` 或对话中告知我来配置。
   >
   > ---
   >
   > 或者，您也可以选择使用腾讯位置服务平台提供的预设体验 Key（免注册，直接使用）。
   > 请注意体验 Key 的限制：
   > - 调用频次受限，超出后触发限流
   > - 数据稳定性一般，不建议用于生产环境
   > - 电动车路线等接口不可用
   >
   > **请告诉我您的选择：**
   > - 回复"我已有 Key"或直接提供 Key → 切换正式模式
   > - 回复"使用体验 Key" → 以受限模式继续

   收到用户明确回复后，再按用户选择继续：
   - 用户提供正式 Key → 记录 Key，切换正式模式，继续处理请求
   - 用户选择体验 Key → 切换体验模式，继续处理请求（见下方"体验模式调用规则"）

---

### 体验模式调用规则

本 Skill 涉及的后端服务（QQMapWX SDK、直接 `wx.request` 调用 WebService API）在体验模式下，按以下规则替换：

- **域名**：`https://apis.map.qq.com` → `https://h5gw.map.qq.com`
- **Key 参数**：`key=none`
- **apptag 参数**：根据接口路径查下方对照表

> ⚠️ **QQMapWX SDK 在体验模式下不能直接使用**
>
> `qqmap-wx-jssdk.js` 的构造函数要求传入有效 key，且内部 `BASE_URL` 硬编码为 `https://apis.map.qq.com/ws/`。体验模式下无法直接用 SDK，需要**绕过 SDK，使用 `wx.request` 直接调用体验模式接口**。
>
> ```javascript
> // ✅ 体验模式：使用 wx.request 直接调用（替代 QQMapWX SDK）
> function experienceRequest(apiPath, params) {
>   return new Promise((resolve, reject) => {
>     wx.request({
>       url: `https://h5gw.map.qq.com/ws/${apiPath}`,
>       data: {
>         ...params,
>         key: 'none',
>         apptag: getApptag(apiPath), // 根据对照表获取
>         output: 'json'
>       },
>       success: (res) => resolve(res.data),
>       fail: (err) => reject(err)
>     })
>   })
> }
>
> // 示例：体验模式逆地址解析
> experienceRequest('geocoder/v1/', {
>   location: '39.984154,116.307490'
> }).then(res => console.log(res))
> ```
>
> **正式模式下仍使用 QQMapWX SDK**：
> ```javascript
> const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
> const qqmapsdk = new QQMapWX({ key: 'YOUR_FORMAL_KEY' })
> ```

#### ⚠️ 体验模式参数格式注意事项（重要）

体验模式绕过 SDK 直接调用 WebService API，**部分接口的参数格式与 SDK 封装的参数不同**，必须按 WebService API 原始格式传参：

**1. 地点搜索（`/ws/place/v1/search`）—— `boundary` 参数必须手动构造**

SDK 的 `location`、`region`、`rectangle`、`distance` 等独立参数在 WebService API 中**不存在**，SDK 内部会自动将它们拼接成 `boundary` 参数。体验模式下必须直接传 `boundary`：

| 搜索类型 | boundary 格式 | 示例 |
|---------|--------------|------|
| 周边搜索 | `nearby(纬度,经度,半径米[,auto_extend])` | `nearby(39.984060,116.307520,1000,1)` |
| 城市搜索 | `region(城市名[,auto_extend][,纬度,经度])` | `region(北京,0,39.984060,116.307520)` |
| 矩形搜索 | `rectangle(左下纬度,左下经度,右上纬度,右上经度)` | `rectangle(39.9,116.3,40.0,116.5)` |

```javascript
// ✅ 体验模式搜索示例：周边搜索附近 1km 内的酒店
experienceRequest('place/v1/search', {
  keyword: '酒店',
  boundary: 'nearby(39.984060,116.307520,1000)',
  orderby: '_distance',
  page_size: 10,
  page_index: 1
})

// ✅ 体验模式搜索示例：在北京搜索酒店
experienceRequest('place/v1/search', {
  keyword: '酒店',
  boundary: 'region(北京,0)'
})
```

> ❌ 体验模式下不要传 `location`、`region`、`rectangle`、`distance` 这些 SDK 封装参数，它们不是 WebService API 的原始参数。

**2. 坐标参数格式 —— 统一使用 String**

SDK 支持 Object 格式 `{ latitude: 39.98, longitude: 116.30 }`，WebService API 只接受 String 格式 `'纬度,经度'`（纬度在前）：

| 参数 | SDK 格式（正式模式） | WebService API 格式（体验模式） |
|------|---------------------|-------------------------------|
| `location` | `{ latitude: 39.98, longitude: 116.30 }` 或 `'39.98,116.30'` | `'39.98,116.30'` |
| `from` / `to` | Object 或 String 均可 | `'39.98,116.30'` |

**3. 距离计算 —— 接口路径已变更**

SDK 内部调用的 `/ws/distance/v1/` 接口已下线，体验模式 apptag 对照表映射的是新接口 `/ws/distance/v1/matrix`（距离矩阵）。参数差异：
- `from`：`'纬度,经度'`（支持多起点 `;` 分隔）
- `to`：`'纬度,经度;纬度,经度'`（多终点 `;` 分隔）
- `mode`：`'driving'` / `'walking'` / `'bicycling'`

```javascript
// ✅ 体验模式距离计算示例
experienceRequest('distance/v1/matrix', {
  from: '39.984060,116.307520',
  to: '39.974060,116.317520;40.000000,116.400000',
  mode: 'driving'
})
```

**apptag 对照表：**

| 接口路径 | apptag |
|---|---|
| `/ws/place/v1/search` | `lbsplace_search` |
| `/ws/place/v1/suggestion` | `lbsplace_sug` |
| `/ws/geocoder/v1` | `lbs_geocoder` |
| `/ws/location/v1/ip` | `lbslocation_ip` |
| `/ws/district/v1/getchildren` | `lbsdistrict_getchildren` |
| `/ws/district/v1/list` | `lbsdistrict_list` |
| `/ws/direction/v1/driving` | `lbsdirection_driving` |
| `/ws/direction/v1/transit` | `lbsdirection_transit` |
| `/ws/direction/v1/bicycling` | `lbsdirection_bicycling` |
| `/ws/direction/v1/walking` | `lbsdirection_walking` |
| `/ws/distance/v1/matrix` | `lbsdistance_matrix` |

**体验模式不可用的接口**（需透传用户 Key，体验模式不支持）：
- `/ws/weather/v1/`（天气查询）
- `/ws/direction/v1/ebicycling/`（电动车路线）

当用户在体验模式下请求以上不可用接口时，回复：

> ⚠️ 您当前请求的「[接口名称]」功能在体验模式下不可用，需要配置正式 Key 才能调用。
> 请前往官网申请正式 Key → https://lbs.qq.com/dev/console/key/manage

**每次 API 调用返回结果后，必须在回复末尾追加以下提醒（每次都要加，不可省略）：**

> 📌 温馨提示：当前使用的是腾讯位置服务预设体验 Key，数据稳定性和调用频次均受限。建议尽快申请腾讯位置服务正式 Key → https://lbs.qq.com/dev/console/key/manage

**注意：地图组件 `<map>` 不受影响**

小程序原生 `<map>` 组件的基础功能（地图显示、标记点、折线、多边形、定位等）**不需要 Key**，由微信框架内置支持。体验模式限制仅影响 QQMapWX SDK 提供的后端服务（搜索、路线规划、地理编码等）。

---

## 工作流程

### 1. 理解用户需求

当用户询问小程序地图相关问题时，首先明确：
- **功能类型**：地图显示、定位、标记点、路线规划、搜索、地图控制等
- **平台**：微信小程序
- **是否需要后端服务**：判断是否需要调用腾讯位置服务API

### 2. 查询 API 文档

根据需求类型读取对应的 references 文件：

- **地图显示/组件相关** → 读取 `references/map_component_guide.md`
- **地图控制/MapContext** → 读取 `references/mapContext_api/` 下对应文件
- **定位和用户位置相关** → 读取 `references/wx_location_api/` 下对应文件
- **LBS后端服务** → 读取 `references/lbs_service_guide/` 下对应文件

对于大文件，使用 grep 搜索关键信息，例如marker：
```bash
grep -n "marker\|标记点" references/map_component_guide.md
```

### 3. 查找示例代码

根据需求在 `assets/examples/` 目录查找对应示例：

- **定位功能** → `assets/examples/minicode-location/`
- **标记点功能** → `assets/examples/minicode-marker/`
- **点聚合功能** → `assets/examples/minicode-markerCluster/`

读取示例代码的关键文件：
```bash
# 查看页面结构
cat assets/examples/minicode-marker/index/index.wxml

# 查看页面逻辑
cat assets/examples/minicode-marker/index/index.js
```

### 4. 提供解决方案

根据文档和示例，为用户提供：
- 完整的代码示例（WXML + JS + WXSS）
- API参数详细说明
- 注意事项和最佳实践
- 权限处理建议


## 注意事项

### 地图组件

1. **坐标系**：
   - 小程序地图使用 **GCJ-02**（国测局坐标，火星坐标）
   - `wx.getLocation({ type: 'gcj02' })` 直接返回GCJ-02坐标
   - GPS设备返回的WGS-84坐标需要转换

2. **组件尺寸**：
   - `<map>` 标签建议设置宽高

3. **个性化地图**：
   - 需要在微信公众平台购买并配置
   - 使用 `subkey` 参数传入专属KEY
   - 使用 `layer-style` 指定样式

4. **权限声明**：
   - 自2022年7月14日后发布的小程序，使用位置接口需在 `app.json` 中声明
   ```json
   {
     "permission": {
       "scope.userLocation": {
         "desc": "你的位置信息将用于小程序位置接口的效果展示"
       }
     }
   }
   ```

5. **API规范（非常重要）**：
   - 所有API调用必须使用文档中定义的接口、属性、事件
   - 所有参数必须严格遵守文档格式要求
   - 不确定的参数格式请查阅对应demo

### 位置服务

1. **调用频率限制**：
   - 基础库 2.17.0 起，`wx.getLocation` 增加调用频率限制
   - 避免高频率调用，推荐使用持续定位接口

2. **高精度定位**：
   - 开启高精度定位会增加接口耗时
   - 可设置 `highAccuracyExpireTime` 控制超时时间

3. **持续定位**：
   - 使用 `wx.onLocationChange` 进行持续定位
   - 页面卸载时调用 `wx.stopLocationUpdate` 停止定位

### 腾讯位置服务 SDK

1. **申请Key**：
   - 必须在腾讯位置服务官网申请密钥
   - 申请地址：https://lbs.qq.com/dev/console/key/manage
   - 体验模式下可免 Key 使用后端服务（通过 apptag 逻辑），详见"前置检查：API Key"章节

2. **商业授权**：
   - 商业使用需要授权（政府公共事务及公益组织除外）
   - 详见腾讯位置服务官网说明

3. **错误处理**：
   - 注意处理返回的status和message
   - 常见错误码：
     - 0: 正常
     - 310: 请求参数信息有误
     - 311: key格式错误
     - 110: 请求来源未被授权

### 性能优化

1. **标记点优化**：
   - 标记点过多时使用点聚合功能
   - 及时移除不需要的标记点

2. **数据更新**：
   - 避免频繁 `setData` 更新地图数据
   - 使用 `setting` 对象批量更新属性

3. **路线优化**：
   - 路线点位过多时进行抽稀处理
   - 使用 `polyline` 的 `colorList` 绘制彩虹线

4. **内存管理**：
   - 及时移除不需要的图层和覆盖物
   - 页面卸载时清理地图资源

详细的快速开始指南、常见场景和最佳实践，参见 `references/quick_start_and_best_practices.md`。

## 相关链接

- [微信小程序地图组件文档](https://developers.weixin.qq.com/miniprogram/dev/component/map.html)
- [微信小程序位置API文档](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.getLocation.html)
- [腾讯位置服务官网](https://lbs.qq.com/)
- [腾讯位置服务小程序SDK](https://lbs.qq.com/miniProgram/js/jsSdk/jsSdkGuide/jsSdkGuide)
- [微信小程序地图插件使用指南](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/using.html)
