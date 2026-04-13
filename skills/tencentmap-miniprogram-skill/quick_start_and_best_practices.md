# 快速开始与最佳实践

本文档包含微信小程序地图开发的快速开始指南、常见场景示例、注意事项和最佳实践。

## 快速开始

### 基础地图显示

**WXML代码**：
```xml
<map 
  id="map" 
  longitude="{{longitude}}" 
  latitude="{{latitude}}" 
  scale="16" 
  show-location="{{true}}" 
  bindtap="onMapTap"
  bindregionchange="onRegionChange">
</map>
```

**JavaScript代码**：
```javascript
Page({
  data: {
    longitude: 116.397128,
    latitude: 39.916527
  },
  
  onLoad() {
    this.getUserLocation()
  },
  
  getUserLocation() {
    wx.getLocation({
      type: 'gcj02', // 使用国测局坐标系
      success: (res) => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      },
      fail: () => {
        wx.showModal({
          title: '需要位置权限',
          content: '请授权位置信息以使用地图功能',
          success: (res) => {
            if (res.confirm) {
              wx.openSetting()
            }
          }
        })
      }
    })
  }
})
```

### 添加标记点

```javascript
Page({
  data: {
    markers: [{
      id: 1,
      latitude: 39.916527,
      longitude: 116.397128,
      title: '天安门',
      iconPath: '/images/marker.png',
      width: 30,
      height: 30,
      callout: {
        content: '北京市中心',
        color: '#ffffff',
        fontSize: 14,
        borderRadius: 5,
        bgColor: '#ff0000',
        padding: 10,
        display: 'ALWAYS'
      }
    }]
  },
  
  onMarkerTap(e) {
    console.log('点击标记点', e.detail.markerId)
  }
})
```

**WXML**：
```xml
<map 
  markers="{{markers}}" 
  bindmarkertap="onMarkerTap"
  longitude="{{longitude}}"
  latitude="{{latitude}}">
</map>
```

### 使用腾讯位置服务SDK

**引入SDK**：
```javascript
// 将 assets/libs/qqmap-wx-jssdk.js 复制到项目目录
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')

Page({
  onLoad() {
    // 实例化API核心类
    this.qqmapsdk = new QQMapWX({
      key: 'YOUR_KEY' // 在腾讯位置服务官网申请
    })
  },
  
  // POI搜索
  searchPOI(keyword) {
    this.qqmapsdk.search({
      keyword: keyword,
      success: (res) => {
        console.log('搜索结果:', res)
      },
      fail: (error) => {
        console.error('搜索失败:', error)
      }
    })
  },
  
  // 路线规划
  planRoute(from, to) {
    this.qqmapsdk.direction({
      mode: 'driving', // 'driving', 'walking', 'bicycling', 'transit'
      from: from,
      to: to,
      success: (res) => {
        console.log('路线规划结果:', res)
      }
    })
  }
})
```

### 地图控制（MapContext）

```javascript
Page({
  onReady() {
    this.mapCtx = wx.createMapContext('map')
  },
  
  // 获取地图中心点
  getCenter() {
    this.mapCtx.getCenterLocation({
      success: (res) => {
        console.log('中心点:', res.longitude, res.latitude)
      }
    })
  },
  
  // 移动到指定位置
  moveTo(latitude, longitude) {
    this.mapCtx.moveToLocation({
      latitude: latitude,
      longitude: longitude
    })
  },
  
  // 轨迹回放
  playback(markerId, path) {
    this.mapCtx.moveAlong({
      markerId: markerId,
      path: path,
      duration: 5000
    })
  },
  
  // 添加标记点
  addMarker(marker) {
    this.mapCtx.addMarkers({
      markers: [marker],
      success: () => {
        console.log('添加成功')
      }
    })
  }
})
```

## 常见场景

### 场景1：实时定位追踪

```javascript
Page({
  data: {
    longitude: 116.397128,
    latitude: 39.916527,
    markers: []
  },
  
  onLoad() {
    this.startLocationUpdate()
  },
  
  startLocationUpdate() {
    wx.startLocationUpdate({
      success: () => {
        wx.onLocationChange((res) => {
          this.setData({
            longitude: res.longitude,
            latitude: res.latitude,
            markers: [{
              id: 1,
              latitude: res.latitude,
              longitude: res.longitude,
              iconPath: '/images/location.png'
            }]
          })
        })
      }
    })
  },
  
  onUnload() {
    wx.stopLocationUpdate()
  }
})
```

### 场景2：周边POI搜索

```javascript
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')

Page({
  onLoad() {
    this.qqmapsdk = new QQMapWX({ key: 'YOUR_KEY' })
  },
  
  searchNearby(keyword) {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.qqmapsdk.search({
          keyword: keyword,
          location: `${res.latitude},${res.longitude}`,
          success: (searchRes) => {
            const markers = searchRes.data.map((item, index) => ({
              id: index,
              latitude: item.location.lat,
              longitude: item.location.lng,
              title: item.title,
              callout: {
                content: item.title,
                display: 'BYCLICK'
              }
            }))
            this.setData({ markers })
          }
        })
      }
    })
  }
})
```

### 场景3：路线规划导航

```javascript
Page({
  planRoute(start, end) {
    this.qqmapsdk.direction({
      mode: 'driving',
      from: `${start.lat},${start.lng}`,
      to: `${end.lat},${end.lng}`,
      success: (res) => {
        const coors = res.result.routes[0].polyline
        const points = []
        
        // 解码路线坐标
        for (let i = 2; i < coors.length; i++) {
          coors[i] = coors[i - 2] + coors[i] / 1000000
        }
        for (let i = 0; i < coors.length; i += 2) {
          points.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        
        this.setData({
          polyline: [{
            points: points,
            color: '#0091FF',
            width: 6,
            arrowLine: true
          }]
        })
      }
    })
  }
})
```

### 场景4：点聚合

```javascript
Page({
  onReady() {
    this.mapCtx = wx.createMapContext('map')
    
    // 初始化点聚合
    this.mapCtx.initMarkerCluster({
      enableDefaultStyle: false,
      zoomOnClick: true,
      gridSize: 60
    })
    
    // 添加标记点
    this.addClusterMarkers()
    
    // 监听聚合创建事件
    this.mapCtx.on('markerClusterCreate', (res) => {
      const clusters = res.clusters.map(cluster => ({
        id: cluster.clusterId,
        latitude: cluster.center.lat,
        longitude: cluster.center.lng,
        iconPath: '/images/cluster.png',
        width: 50,
        height: 50,
        label: {
          content: cluster.markerIds.length.toString(),
          fontSize: 14
        }
      }))
      
      this.mapCtx.addMarkers({
        markers: clusters,
        clear: false
      })
    })
  }
})
```

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

## 最佳实践

### 1. 权限处理

```javascript
// 完整的权限检查和处理流程
checkAndRequestLocation() {
  wx.getSetting({
    success: (res) => {
      if (res.authSetting['scope.userLocation']) {
        // 已授权，直接获取位置
        this.getLocation()
      } else if (res.authSetting['scope.userLocation'] === false) {
        // 用户之前拒绝过，引导去设置
        wx.showModal({
          title: '位置权限',
          content: '需要位置权限才能使用此功能，请在设置中开启',
          confirmText: '去设置',
          success: (modalRes) => {
            if (modalRes.confirm) {
              wx.openSetting()
            }
          }
        })
      } else {
        // 未授权过，发起授权请求
        wx.authorize({
          scope: 'scope.userLocation',
          success: () => {
            this.getLocation()
          },
          fail: () => {
            wx.showToast({
              title: '授权失败',
              icon: 'none'
            })
          }
        })
      }
    }
  })
}
```

### 2. 地图初始化配置

```javascript
// 使用setting对象统一管理地图配置
Page({
  data: {
    setting: {
      skew: 0,
      rotate: 0,
      showLocation: true,
      showScale: true,
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: false,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false
    }
  },
  
  updateMapSetting(newSettings) {
    this.setData({
      setting: {
        ...this.data.setting,
        ...newSettings
      }
    })
  }
})
```

### 3. 错误处理

```javascript
// 统一的错误处理
handleLocationError(error) {
  console.error('位置错误:', error)
  
  // 提供默认位置作为降级方案
  this.setData({
    longitude: 116.397128,
    latitude: 39.916527
  })
  
  wx.showToast({
    title: '获取位置失败，使用默认位置',
    icon: 'none'
  })
}
```

### 4. 数据格式规范

```javascript
// 标记点数据格式
const markerData = {
  id: 1,                          // 必填：标记点id
  latitude: 39.916527,            // 必填：纬度
  longitude: 116.397128,          // 必填：经度
  iconPath: '/images/marker.png', // 必填：图标路径
  width: 30,                      // 可选：图标宽度
  height: 30,                     // 可选：图标高度
  title: '标题',                  // 可选：标题
  callout: {                      // 可选：气泡
    content: '气泡内容',
    color: '#ffffff',
    fontSize: 14,
    borderRadius: 5,
    bgColor: '#ff0000',
    padding: 10,
    display: 'ALWAYS'
  }
}

// 路线数据格式
const polylineData = {
  points: [                       // 必填：坐标点数组
    { latitude: 39.916527, longitude: 116.397128 },
    { latitude: 39.926527, longitude: 116.407128 }
  ],
  color: '#0091FF',              // 可选：线条颜色
  width: 6,                       // 可选：线条宽度
  arrowLine: true,                // 可选：是否带箭头
  dottedLine: false               // 可选：是否虚线
}
```
