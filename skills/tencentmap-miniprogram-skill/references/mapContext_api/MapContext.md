# MapContext

> 相关文档: map

MapContext 实例，可通过 wx.createMapContext 获取。

MapContext 通过 `id` 跟一个 map 组件绑定，操作对应的 map 组件。

## 方法

### MapContext.getCenterLocation(Object object)

获取当前地图中心的经纬度。返回的是 gcj02 坐标系，可以用于 wx.openLocation()

### MapContext.setLocMarkerIcon(Object object)

设置定位点图标，支持网络路径、本地路径、代码包路径

### MapContext.moveToLocation(Object object)

将地图中心移置当前定位点，此时需设置地图组件 show-location 为true。2.8.0 起支持将地图中心移动到指定位置。

### MapContext.translateMarker(Object object)

平移marker，带动画。

### MapContext.moveAlong(Object object)

沿指定路径移动 `marker`，用于轨迹回放等场景。动画完成时触发回调事件，若动画进行中，对同一 `marker` 再次调用 `moveAlong` 方法，前一次的动画将被打断。

### MapContext.includePoints(Object object)

缩放视野展示所有经纬度

### MapContext.getRegion()

获取当前地图的视野范围

### MapContext.getRotate()

获取当前地图的旋转角

### MapContext.getSkew()

获取当前地图的倾斜角

### MapContext.getScale()

获取当前地图的缩放级别

### MapContext.setCenterOffset(Object object)

设置地图中心点偏移，向后向下为增长，屏幕比例范围(0.25~0.75)，默认偏移为[0.5, 0.5]

### MapContext.removeCustomLayer(Object object)

移除个性化图层。

### MapContext.addCustomLayer(Object object)

添加个性化图层。图层创建参考文档

### MapContext.addGroundOverlay(Object object)

创建自定义图片图层，图片会随着地图缩放而缩放。

### MapContext.addVisualLayer(Object object)

添加可视化图层。需要刷新时，interval 可设置的最小值为 15 s。

### MapContext.removeVisualLayer(Object object)

移除可视化图层。

### MapContext.executeVisualLayerCommand(Object object)

执行可视化图层指令，结合 `MapContext.on('visualLayerEvent')` 监听事件使用。

### MapContext.addArc(Object object)

添加弧线，途经点与夹角必须设置一个。途经点必须在起终点有效坐标范围内，否则不能生成正确的弧线，同时设置夹角角度时，以夹角角度为准。夹角定义为起点到终点，与起点外切线逆时针旋转的角度。工具侧暂未支持。

### MapContext.removeArc(Object object)

删除弧线。工具侧暂未支持。

### MapContext.setBoundary(Object object)

限制地图的显示范围。此接口同时会限制地图的最小缩放整数级别。

### MapContext.updateGroundOverlay(Object object)

更新自定义图片图层。

### MapContext.removeGroundOverlay(Object object)

移除自定义图片图层。

### MapContext.toScreenLocation(Object object)

获取经纬度对应的屏幕坐标，坐标原点为地图左上角。

### MapContext.fromScreenLocation(Object object)

获取屏幕上的点对应的经纬度，坐标原点为地图左上角。

### MapContext.openMapApp(Object object)

拉起地图APP选择导航。

### MapContext.addMarkers(Object object)

添加 marker。

### MapContext.removeMarkers(Object object)

移除 marker。

### MapContext.initMarkerCluster(Object object)

初始化点聚合的配置，未调用时采用默认配置。

### MapContext.on(string event, function callback)

监听地图事件。

### visualLayerEvent

可视化图层 visualLayer 统一回调出口，2.26.0 起支持。

#### 返回参数

| 参数 | 类型 | 说明 |
|------|------|------|
| layerId | String | 图层 id |
| eventType | String | 事件类型 |
| eventInfo | String | 事件信息 |

### markerClusterCreate

缩放或拖动导致新的聚合簇产生时触发，仅返回新创建的聚合簇信息。

#### 返回参数

| 参数 | 类型 | 说明 |
|------|------|------|
| clusters | `Array<ClusterInfo>` | 聚合簇数据 |

### markerClusterClick

聚合簇的点击事件。

#### 返回参数

| 参数 | 类型 | 说明 |
|------|------|------|
| cluster | ClusterInfo | 聚合簇 |

#### ClusterInfo 结构

| 参数 | 类型 | 说明 |
|------|------|------|
| clusterId | Number | 聚合簇的 id |
| center | LatLng | 聚合簇的坐标 |
| markerIds | `Array<Number>` | 该聚合簇内的点标记数据数组 |

### markerCollisionStatusChange

marker 参与碰撞后隐藏时的回调，3.4.3 起支持。

#### 返回参数

| 参数 | 类型 | 说明 |
|------|------|------|
| show | `Array<Number>` | 碰撞时隐藏后又显示的 `markerIds` |
| hide | `Array<Number>` | 碰撞时被隐藏的 `markerIds` |

### MapContext.eraseLines(Object object)

擦除或置灰已添加到地图中的线段。

## 示例代码

```html
<!-- map.wxml -->
<map id="myMap" show-location />

<button type="primary" bindtap="getCenterLocation">获取位置</button>
<button type="primary" bindtap="moveToLocation">移动位置</button>
<button type="primary" bindtap="translateMarker">移动标注</button>
<button type="primary" bindtap="includePoints">缩放视野展示所有经纬度</button>
```

```javascript
// map.js
Page({
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude:23.10229,
        longitude:113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude:23.10229,
        longitude:113.3345211,
      }, {
        latitude:23.00229,
        longitude:113.3345211,
      }]
    })
  }
})
```
