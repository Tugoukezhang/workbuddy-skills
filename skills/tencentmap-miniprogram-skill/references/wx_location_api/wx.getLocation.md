# wx.getLocation(Object object)

## 功能描述

获取当前的地理位置、速度。

- 当用户离开小程序后，此接口无法调用。
- 开启高精度定位，接口耗时会增加，可指定 `highAccuracyExpireTime` 作为超时时间。
- 地图相关使用的坐标格式应为 `gcj02`。
- 高频率调用会导致耗电，如有需要可使用持续定位接口 `wx.onLocationChange`。
- 基础库 `2.17.0` 版本起 `wx.getLocation` 增加调用频率限制。

## 支持情况

- **调用方式**：支持 Promise 风格调用。
- **用户授权**：需要 `scope.userLocation`。
- **小程序插件**：支持，需要小程序基础库版本不低于 1.9.6。
- **客户端支持**：微信 Windows 版、微信 Mac 版、微信鸿蒙 OS 版均支持。

## 使用方法与申请开通

### 使用声明

自 2022 年 7 月 14 日后发布的小程序，若使用该接口，需要在 `app.json` 中进行声明，否则将无法正常使用。

### 申请开通限制

暂只针对特定类目的小程序开放。需要先通过类目审核，再在小程序管理后台「开发」-「开发管理」-「接口设置」中自助开通该接口权限。涉及的类目包括但不限于：

**国内主体**：电商平台、生活服务、物流服务、餐饮服务、医疗、交通、旅游、政务民生、金融等。

**海外主体**：出行与交通、快递业与邮政、餐饮、跨境电商、本地服务等。

## 请求参数

### Object object

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| type | string | 'wgs84' | 否 | 指定坐标类型：`wgs84` 返回 gps 坐标；`gcj02` 返回可用于 `wx.openLocation` 的坐标。 |
| altitude | boolean | false | 否 | 传入 `true` 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度。（最低基础库 1.6.0） |
| isHighAccuracy | boolean | false | 否 | 开启高精度定位。（最低基础库 2.9.0） |
| highAccuracyExpireTime | number | - | 否 | 高精度定位超时时间，指定时间内返回最高精度。该值 3000ms 以上高精度定位才有效果。（最低基础库 2.9.0） |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

## 返回值

### success 回调参数 res

| 属性 | 类型 | 说明 | 最低基础库版本 |
| :--- | :--- | :--- | :--- |
| latitude | number | 纬度，范围为 -90~90，负数表示南纬。 | - |
| longitude | number | 经度，范围为 -180~180，负数表示西经。 | - |
| speed | number | 速度，单位 m/s。 | - |
| accuracy | number | 位置的精确度，反应与真实位置之间的接近程度。可以理解成 10 即与真实位置相差 10m，数值越小越精确。 | - |
| altitude | number | 高度，单位 m。 | 1.2.0 |
| verticalAccuracy | number | 垂直精度，单位 m（Android 无法获取，返回 0）。 | 1.2.0 |
| horizontalAccuracy | number | 水平精度，单位 m。 | 1.2.0 |

## 示例代码

```javascript
wx.getLocation({
  type: 'wgs84',
  success (res) {
    const latitude = res.latitude
    const longitude = res.longitude
    const speed = res.speed
    const accuracy = res.accuracy
  }
})
```

## 注意事项

1. **调用频率限制**：基础库 2.17.0 起，`wx.getLocation` 增加调用频率限制。
2. **开发者工具模拟**：工具中定位模拟使用 IP 定位，可能会有一定误差。且工具目前仅支持 `gcj02` 坐标。
3. **坐标系转换**：使用第三方服务进行逆地址解析时，请确认第三方服务默认的坐标系，正确进行坐标转换。
