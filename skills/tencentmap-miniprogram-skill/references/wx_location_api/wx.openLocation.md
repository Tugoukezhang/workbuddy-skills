# wx.openLocation(Object object)

## API 概览

- **功能描述**：使用微信内置地图查看位置。
- **支持情况**：
  - **Promise 风格调用**：支持。
  - **小程序插件**：支持，需要小程序基础库版本不低于 1.9.6。
  - **微信 Mac 版**：支持。
  - **微信鸿蒙 OS 版**：支持。

## 参数

### Object object

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| latitude | number | - | 是 | 纬度，范围为 -90 ~ 90，负数表示南纬。使用 **gcj02** 国测局坐标系。 |
| longitude | number | - | 是 | 经度，范围为 -180 ~ 180，负数表示西经。使用 **gcj02** 国测局坐标系。 |
| scale | number | 18 | 否 | 缩放比例，范围 5 ~ 18。 |
| name | string | - | 否 | 位置名。 |
| address | string | - | 否 | 地址的详细说明。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

## 示例代码

以下代码演示了如何先获取当前位置，然后调用 `wx.openLocation` 在微信内置地图中打开该位置：

```javascript
wx.getLocation({
  type: 'gcj02', // 返回可以用于 wx.openLocation 的经纬度
  success (res) {
    const latitude = res.latitude
    const longitude = res.longitude
    wx.openLocation({
      latitude,
      longitude,
      scale: 18
    })
  }
})
```

## 注意事项

1. **坐标系**：务必使用 `gcj02` 国测局坐标系，否则可能导致位置在地图上显示有偏差。
2. **坐标范围**：请确保传入的纬度和经度在有效范围内（纬度 -90~90，经度 -180~180）。
