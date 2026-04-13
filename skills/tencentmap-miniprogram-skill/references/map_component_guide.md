# map

> 基础库 1.0.0 开始支持，低版本需做兼容处理。

> **微信 Windows 版**：支持
> 
> **微信 Mac 版**：支持
> 
> **微信 鸿蒙 OS 版**：支持

> 相关文档: wx.createMapContext

渲染框架支持情况：Skyline （使用最新 Nightly 工具调试）、WebView

## 功能描述

地图 v2.7.0 起支持同层渲染。

map组件提供了地图展示、交互、叠加点线面及文字等功能，同时支持个性化地图样式，可结合地图服务 API 实现更丰富功能。

为了更好的提供地图服务，请在调用 `map` 组件之前，先前往腾讯位置服务官网注册一个专属 `KEY`,在地图开发过程中，可以将这个专属 `KEY` 通过 `subkey` 参数传入；后续如遇到地图开发问题也可以在腾讯位置服务官网工单系统提交工单反馈解决；

## 地图个性化样式组件

地图个性化样式组件是腾讯位置服务为开发者提供的地图高级能力，开发者可以在法律允许的范围内定制地图风格，支持定制背景面、背景线、道路、POI等地图元素颜色、显示层级等内容；支持按照类型精细化管理POI的显示、隐藏；灵活地设计贴合业务场景的心仪地图。

购买该能力后，您可以在 MP平台「管理->付费管理->概览->地图个性化样式->去使用」中创建配置您的地图个性化样式，您可以选择我们提供的基础及高级模版，也可以通过在线编辑平台，对多种地图元素的样式进行自定义设置，以满足在不同场景下的个性化需求。

注意：

1. 自2023年6月29日0点起，该能力需要先购买再使用。若未购买，届时将无法使用该能力。具体购买方式见 付费管理。
2. 自2023年6月29日0时起，个性化地图配置界面的入口统一为微信公众平台-付费管理，请从此入口进入，腾讯位置服务官网入口不再使用。已经在小程序生效的个性化样式配置，将于2023年6月29日0时变更为默认样式，如有个性化样式配置需求，请于6月29日0时前，前往微信公众平台-付费管理进行相关能力的开通和配置。

## 地图服务API

地图服务API 与map组件基于同一套数据体系，无缝贴合，叠加使用可实现更丰富的功能。提供：地点搜索、关键词输入提示、正/逆地址解析（经纬度与地址互转）驾车与步行路线规划等功能。

详情见：地图服务API在小程序中的使用方法

若开发者使用通过LBS开放平台自行申请的服务账号，在小程序连接并调用位置服务产品用于商业行为（政府公共事务及公益组织事务除外），腾讯位置服务有权收取商业授权费，详细内容可以查看或咨询腾讯微位置服务官网

## 深入控制地图

通过微信小程序API中wx.createMapContext方法，创建 map 上下文 MapContext 对象，通过其实现更细粒度的地图交互和功能，包括：控制地图视野、获取地图位置与视角等信息、marker移动（轨迹回放）、动态创建个性化图层、拉起地图APP选择导航等

## 小程序插件

现成插件简单接入，提供：路线规划、地图选点、城市选择器、地铁图 常用功能。

详情见：小程序地图插件使用指南



## 地图基础属性

## 属性说明

| 属性 | 类型 | 默认值 | 必填 | 说明 | 最低版本 |
|------|------|--------|------|------|----------|
| longitude | number | | 是 | 中心经度 | 1.0.0 |
| latitude | number | | 是 | 中心纬度 | 1.0.0 |
| scale | number | 16 | 否 | 缩放级别，取值范围为3-20 | 1.0.0 |
| min-scale | number | 3 | 否 | 最小缩放级别 | 2.13.0 |
| max-scale | number | 20 | 否 | 最大缩放级别 | 2.13.0 |
| markers | Array.&lt;marker&gt; | | 否 | 标记点 | 1.0.0 |
| covers | Array.&lt;cover&gt; | | 否 | **即将移除，请使用 markers** | 1.0.0 |
| polyline | Array.&lt;polyline&gt; | | 否 | 路线 | 1.0.0 |
| circles | Array.&lt;circle&gt; | | 否 | 圆 | 1.0.0 |
| controls | Array.&lt;control&gt; | | 否 | 控件（即将废弃，建议使用 cover-view 代替） | 1.0.0 |
| include-points | Array.&lt;point&gt; | | 否 | 缩放视野以包含所有给定的坐标点 | 1.0.0 |
| show-location | boolean | false | 否 | 显示带有方向的当前定位点，3.10.0起需要用户位置授权。3.13.2起如果开发者没有手动申请，则会自动申请 | 1.0.0 |
| polygons | Array.&lt;polygon&gt; | | 否 | 多边形 | 2.3.0 |
| subkey | string | | 否 | 地图能力【个性化地图】使用的key，不支持动态修改 | 2.3.0 |
| layer-style | number | 1 | 否 | 地图能力【个性化地图】配置的 style | |
| rotate | number | 0 | 否 | 旋转角度，范围 0 ~ 360, 地图正北和设备 y 轴角度的夹角 | 2.5.0 |
| skew | number | 0 | 否 | 倾斜角度，范围 0 ~ 40 , 关于 z 轴的倾角 | 2.5.0 |
| enable-3D | boolean | false | 否 | 展示3D楼块 | 2.3.0 |
| show-compass | boolean | false | 否 | 显示指南针 | 2.3.0 |
| show-scale | boolean | false | 否 | 显示比例尺，工具暂不支持 | 2.8.0 |
| enable-overlooking | boolean | false | 否 | 开启俯视 | 2.3.0 |
| enable-auto-max-overlooking | boolean | false | 否 | 开启最大俯视角，俯视角度从 45 度拓展到 75 度 | 2.26.0 |
| enable-zoom | boolean | true | 否 | 是否支持缩放 | 2.3.0 |
| enable-scroll | boolean | true | 否 | 是否支持拖动 | 2.3.0 |
| enable-rotate | boolean | false | 否 | 是否支持旋转 | 2.3.0 |
| enable-satellite | boolean | false | 否 | 是否开启卫星图 | 2.7.0 |
| enable-traffic | boolean | false | 否 | 是否开启实时路况 | 2.7.0 |
| enable-poi | boolean | true | 否 | 是否展示 POI 点 | 2.14.0 |
| enable-building | boolean | | 否 | 是否展示建筑物 | 2.14.0 |
| setting | object | | 否 | 配置项 | 2.8.2 |
| bindtap | eventhandle | | 否 | 点击地图时触发，2.9.0起返回经纬度信息 | 1.0.0 |
| bindmarkertap | eventhandle | | 否 | 点击标记点时触发，`e.detail = {markerId}` | 1.0.0 |
| bindlabeltap | eventhandle | | 否 | 点击label时触发，`e.detail = {markerId}` | 2.9.0 |
| bindcontroltap | eventhandle | | 否 | 点击控件时触发，`e.detail = {controlId}` | 1.0.0 |
| bindcallouttap | eventhandle | | 否 | 点击标记点对应的气泡时触发`e.detail = {markerId}` | 1.2.0 |
| bindupdated | eventhandle | | 否 | 在地图渲染更新完成时触发 | 1.6.0 |
| bindregionchange | eventhandle | | 否 | 视野发生变化时触发， | 2.3.0 |
| bindpoitap | eventhandle | | 否 | 点击地图poi点时触发，`e.detail = {name, longitude, latitude}` | 2.3.0 |
| bindpolylinetap | eventhandle | | 否 | 点击地图路线时触发，`e.detail = {longitude, latitude}` | 3.1.0 |
| bindabilitysuccess | eventhandle | | 否 | 地图能力生效时触发，`e.detail = {ability, errCode, errMsg}` | |
| bindabilityfail | eventhandle | | 否 | 地图能力失败时触发，`e.detail = {ability, errCode, errMsg}` | |
| bindauthsuccess | eventhandle | | 否 | 地图鉴权结果成功时触发，`e.detail = {errCode, errMsg}` | |
| bindinterpolatepoint | eventhandle | | 否 | MapContext.moveAlong 插值动画时触发。`e.detail = {markerId, longitude, latitude, animationStatus: "interpolating" | "complete"}`, | 3.1.0 |
| binderror | eventhandle | | 否 | 组件错误时触发，例如创建或鉴权失败，`e.detail = {longitude, latitude}` | |

## regionchange 返回值

视野改变时，regionchange 会触发两次，返回的 type 值分别为 begin 和 end。

2.8.0 起 begin 阶段返回 causedBy，有效值为  gesture（手势触发） & update（接口触发）

2.3.0 起 end 阶段返回 causedBy，有效值为 drag（拖动导致）、scale（缩放导致）、update（调用更新接口导致）。

```js
e = {causedBy, type, detail: {rotate, skew, scale, centerLocation, region}}
```

## setting

提供 setting 对象统一设置地图配置。同时对于一些动画属性如 `rotate` 和 `skew`，通过 `setData` 分开设置时无法同时生效，需通过 `setting` 统一修改。

```js
// 默认值
const setting = {
  skew: 0,
  rotate: 0,
  showLocation: false,
  showScale: false,
  subKey: '',
  layerStyle: 1,
  enableZoom: true,
  enableScroll: true,
  enableRotate: false,
  showCompass: false,
  enable3D: false,
  enableOverlooking: false,
  enableSatellite: false,
  enableTraffic: false,
}

this.setData({
  // 仅设置的属性会生效，其它的不受影响
  setting: {
    enable3D: true,
    enableTraffic: true
  }
})
```

## marker

标记点用于在地图上显示标记的位置。

注：可结合地图服务API - 地点搜索 实现地图搜索功能。

| 属性 | 说明 | 类型 | 必填 | 备注 | 最低版本 |
|------|------|------|------|------|----------|
| id | 标记点 id | number | 是 | marker 点击事件回调会返回此 id。 | |
| clusterId | 聚合簇的 id | Number | 否 | 自定义点聚合簇效果时使用 | |
| joinCluster | 是否参与点聚合 | Boolean | 否 | 默认不参与点聚合 | |
| latitude | 纬度 | number | 是 | 浮点数，范围 -90 ~ 90 | |
| longitude | 经度 | number | 是 | 浮点数，范围 -180 ~ 180 | |
| title | 标注点名 | string | 否 | 点击时显示，callout 存在时将被忽略 | |
| zIndex | 显示层级 | number | 否 | | 2.3.0 |
| iconPath | 显示的图标 | string | 是 | 项目目录下的图片路径，支持网络路径、本地路径、代码包路径（2.3.0） | |
| rotate | 旋转角度 | number | 否 | 顺时针旋转的角度，范围 0 ~ 360，默认为 0 | |
| alpha | 标注的透明度 | number | 否 | 默认 1，无透明，范围 0 ~ 1 | |
| width | 标注图标宽度 | number/string | 否 | 默认为图片实际宽度 | |
| height | 标注图标高度 | number/string | 否 | 默认为图片实际高度 | |
| callout | 标记点上方的气泡窗口 | Object | 否 | 支持的属性见下表，可识别换行符。 | 1.2.0 |
| customCallout | 自定义气泡窗口 | Object | 否 | 支持的属性见下表 | |
| label | 为标记点旁边增加标签 | Object | 否 | 支持的属性见下表，可识别换行符。 | 1.2.0 |
| anchor | 经纬度在标注图标的锚点，默认底边中点 | Object | 否 | {x, y}，x 表示横向(0-1)，y 表示竖向(0-1)。{x: .5, y: 1} 表示底边中点 | 1.2.0 |
| aria-label | 无障碍访问，（属性）元素的额外描述 | string | 否 | | 2.5.0 |
| collisionRelation | 碰撞关系 | string | 否 | 详见下表碰撞关系 | 3.4.3 |
| collision | 碰撞类型 | string | 否 | 详见下表碰撞关系 | 3.4.3 |

## marker 碰撞关系

在一定范围内绘制多个 Marker 时，常会出现 Marker 压盖的情况，3.4.3 起支持设置碰撞关系。

#### 碰撞目标

默认 Marker 不参与碰撞，`collision` 用于设置是否参与碰撞，支持枚举值 `poi`、`marker`，多类型时按 "," 分割。
poi: 和 `poi` 点碰撞后隐藏 `poi`
marker: 和 `marker` 碰撞后隐藏自己或被碰的 `marker`

发送碰撞时，按 `zIndex` 区分优先级，优先级低的将会被隐藏。

例如 `collision` 设置为 `poi,marker`，表示与 `poi` 和 `marker` 均会参与碰撞。

#### 整体碰撞或区域碰撞

Marker 的各个部分，包括 `iconPath`、`callout`、`label` 等，可以作为一个整体参与碰撞，也可独立开来。

`collisionRelation` 属性支持 `alone` 和 `together` 两种值。
together: 作为整体参与碰撞后隐藏，此时忽略各部件 `callout` 和 `label` 的 `collision` 属性。
alone：独立参与碰撞后隐藏，此时各部件 `callout` 和 `label` 可单独设置 `collision` 属性，未填写时则与主 `Marker` 保持一致。

## marker 上的气泡 callout

| 属性 | 说明 | 类型 | 最低版本 |
|------|------|------|----------|
| content | 文本 | string | 1.2.0 |
| color | 文本颜色 | string | 1.2.0 |
| fontSize | 文字大小 | number | 1.2.0 |
| borderRadius | 边框圆角 | number | 1.2.0 |
| borderWidth | 边框宽度 | number | 2.3.0 |
| borderColor | 边框颜色 | string | 2.3.0 |
| bgColor | 背景色 | string | 1.2.0 |
| padding | 文本边缘留白 | number | 1.2.0 |
| display | 'BYCLICK':点击显示; 'ALWAYS':常显 | string | 1.2.0 |
| textAlign | 文本对齐方式。有效值: left, right, center | string | 1.6.0 |
| anchorX | 横向偏移量，向右为正数 | number | 2.11.0 |
| anchorY | 纵向偏移量，向下为正数 | number | 2.11.0 |
| collision | 碰撞类型 | string | 3.4.3 |

## marker 上的自定义气泡 customCallout

`customCallout` 存在时将忽略 `callout` 与 `title` 属性。自定义气泡采用 `cover-view` 定制，灵活度更高。

| 属性 | 说明 | 类型 | 最低版本 |
|------|------|------|----------|
| display | 'BYCLICK':点击显示; 'ALWAYS':常显 | string | 2.12.0 |
| anchorX | 横向偏移量，向右为正数 | number | 2.12.0 |
| anchorY | 纵向偏移量，向下为正数 | number | 2.12.0 |

使用方式如下，`map` 组件下添加名为 `callout` 的 `slot` 节点，其内部的 `cover-view` 通过 marker-id 属性与 `marker` 绑定。当 `marker` 创建时，该 `cover-view` 显示的内容将作为 `callout` 显示在标记点上方。

```html
<map>
  <cover-view slot="callout">
    <cover-view marker-id="1"></cover-view>
    <cover-view marker-id="2"></cover-view>
  </cover-view>
</map>
```


## marker 上的气泡 label

| 属性 | 说明 | 类型 | 最低版本 |
|------|------|------|----------|
| content | 文本 | string | 1.2.0 |
| color | 文本颜色 | string | 1.2.0 |
| fontSize | 文字大小 | number | 1.2.0 |
| x | label的坐标（废弃） | number | 1.2.0 |
| y | label的坐标（废弃） | number | 1.2.0 |
| anchorX | label的坐标，原点是 marker 对应的经纬度 | number | 2.1.0 |
| anchorY | label的坐标，原点是 marker 对应的经纬度 | number | 2.1.0 |
| borderWidth | 边框宽度 | number | 1.6.0 |
| borderColor | 边框颜色 | string | 1.6.0 |
| borderRadius | 边框圆角 | number | 1.6.0 |
| bgColor | 背景色 | string | 1.6.0 |
| padding | 文本边缘留白 | number | 1.6.0 |
| textAlign | 文本对齐方式。有效值: left, right, center | string | 1.6.0 |
| collision | 碰撞类型 | string | 3.4.3 |

## 点聚合

当地图上需要展示的标记点 marker 过多时，可能会导致界面上 marker 出现压盖，展示不全，并导致整体性能变差。针对此类问题，推出点聚合能力。

使用流程如下：

1. MapContext.initMarkerCluster 对聚合点进行初始化配置（可选）；
2. MapContext.addMarkers 指定参与聚合的 marker；
3. `MapContext.on('markerClusterCreate', callback)` 触发时，通过 MapContext.addMarkers 更新聚合簇的样式 （可选）；
4. MapContext.removeMarkers 移除参与聚合的 marker；


需注意的是：

1. 地图上的 marker 分为普通的 marker 与参与聚合的 marker，参与聚合时需指定属性 joinCluster 为 true；
2. 自定义聚合簇样式时，同样通过 MapContext.addMarkers 进行绘制，此时需携带 clusterId。

## polyline

指定一系列坐标点，从数组第一项连线至最后一项。绘制彩虹线时，需指定不同分段的颜色，如 points 包含 5 个点，则 colorList 应传入 4 个颜色值；若 colorList 长度小于 points.length - 1，则剩下的分段颜色与最后一项保持一致。

注：可结合 地图服务API - 驾车路线规划，实现路线计算与展示。

| 属性 | 说明 | 类型 | 必填 | 备注 | 最低版本 |
|------|------|------|------|------|----------|
| points | 经纬度数组 | array | 是 | [{latitude: 0, longitude: 0}] | |
| color | 线的颜色 | string | 否 | 十六进制 | |
| colorList | 彩虹线 | array | 否 | 存在时忽略 color 值 | 2.13.0 |
| width | 线的宽度 | number | 否 | | |
| dottedLine | 是否虚线 | boolean | 否 | 默认 false | |
| arrowLine | 带箭头的线 | boolean | 否 | 默认 false，开发者工具暂不支持该属性 | 1.2.0 |
| arrowIconPath | 更换箭头图标 | string | 否 | 在 arrowLine 为 true 时生效 | 1.6.0 |
| borderColor | 线的边框颜色 | string | 否 | | 1.2.0 |
| borderWidth | 线的厚度 | number | 否 | | 1.2.0 |
| level | 压盖关系 | string | 否 | 默认为 abovelabels | 2.14.0 |
| textStyle | 文字样式 | TextStyle | 否 | 折线上文本样式 | 2.22.0 |
| segmentTexts | 分段文本 | `Array<SegmentText>` | 否 | 折线上文本内容和位置 | 2.22.0 |

注：`textStyle` 与 `segmentTexts` 结合可在折线线段上面绘制文字，用来显示路名。

#### SegmentText

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 名称 | string | '' |
| startIndex | 起点 | number | |
| endIndex | 终点 | number | |

#### TextStyle

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| textColor | 文本颜色 | string | #000000 |
| strokeColor | 描边颜色 | string | #ffffff |
| fontSize | 文本大小 | number | 14 |

`level` 字段表示与其它地图元素的压盖关系，可选值如下：

| 值 | 说明 | 最低版本 |
|----|------|----------|
| abovelabels | 显示在所有 POI 之上 | 2.14.0 |
| abovebuildings | 显示在楼块之上 POI 之下 | 2.14.0 |
| aboveroads | 显示在道路之上楼块之下 | 2.14.0 |

## polygon

指定一系列坐标点，根据 points 坐标数据生成闭合多边形

| 属性 | 说明 | 类型 | 必填 | 备注 | 最低版本 |
|------|------|------|------|------|----------|
| dashArray | 边线虚线 | `Array<number>` | 否 | 默认值 [0, 0] 为实线，[10, 10]表示十个像素的实线和十个像素的空白（如此反复）组成的虚线 | 2.22.0 |
| points | 经纬度数组 | array | 是 | [{latitude: 0, longitude: 0}] | 2.3.0 |
| strokeWidth | 描边的宽度 | number | 否 | | 2.3.0 |
| strokeColor | 描边的颜色 | string | 否 | 十六进制 | 2.3.0 |
| fillColor | 填充颜色 | string | 否 | 十六进制 | |
| zIndex | 设置多边形 Z 轴数值 | number | 否 | | 2.3.0 |
| level | 压盖关系 | string | 否 | 默认为 abovelabels | 2.14.0 |

## circle

在地图上显示圆

| 属性 | 说明 | 类型 | 必填 | 备注 |
|------|------|------|------|------|
| latitude | 纬度 | number | 是 | 浮点数，范围 -90 ~ 90 |
| longitude | 经度 | number | 是 | 浮点数，范围 -180 ~ 180 |
| color | 描边的颜色 | string | 否 | 十六进制 |
| fillColor | 填充颜色 | string | 否 | 十六进制 |
| radius | 半径 | number | 是 | |
| strokeWidth | 描边的宽度 | number | 否 | |
| level | 压盖关系 | string | 否 | 默认为 abovelabels |

## control

在地图上显示控件，控件不随着地图移动。**即将废弃，请使用 cover-view**

| 属性 | 说明 | 类型 | 必填 | 备注 |
|------|------|------|------|------|
| id | 控件id | number | 否 | 在控件点击事件回调会返回此id |
| position | 控件在地图的位置 | object | 是 | 控件相对地图位置 |
| iconPath | 显示的图标 | string | 是 | 项目目录下的图片路径，支持本地路径、代码包路径 |
| clickable | 是否可点击 | boolean | 否 | 默认不可点击 |

## position

| 属性 | 说明 | 类型 | 必填 | 备注 |
|------|------|------|------|------|
| left | 距离地图的左边界多远 | number | 否 | 默认为0 |
| top | 距离地图的上边界多远 | number | 否 | 默认为0 |
| width | 控件宽度 | number | 否 | 默认为图片宽度 |
| height | 控件高度 | number | 否 | 默认为图片高度 |

## bindregionchange 返回值

| 属性 | 说明 | 类型 | 备注 |
|------|------|------|------|
| type | 视野变化开始、结束时触发 | string | 视野变化开始为begin，结束为end |
| causedBy | 导致视野变化的原因 | string | 拖动地图导致(drag)、缩放导致(scale)、调用接口导致(update) |

## 比例尺

| | | | | | | | | | |
|---|---|---|---|---|---|---|---|---|---|
| scale | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| 比例 | 1000km | 500km | 200km | 100km | 50km | 25km | 20km | 10km | 5km |
| scale | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
| 比例 | 2km | 1km | 500m | 200m | 100m | 50m | 20m | 10m | 5m |

## bindabilitysuccess、bindabilityfail 和 binderror 的返回值

bindabilitysuccess 和 bindabilityfail 事件具有额外的参数 ability 来指示是何种地图能力，可能的取值有: `layer-style`。

共同参数如下 errCode 的定义如下：

| errCode | 说明 |
|---------|------|
| 无 | 地图创建失败 |
| 0 | 成功 |
| [-100, -500] | 服务器鉴权错误 |
| 1000 | 网络链路错误 |
| 1001 | 内部错误 |
| 1400001 | 欠费 |

