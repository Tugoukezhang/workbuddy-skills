# wx.getFuzzyLocation(Object object)

**基础库版本：** 2.25.0 开始支持（低版本需做兼容处理）

## 调用支持

- **Promise 风格**：不支持
- **用户授权**：需要 `scope.userFuzzyLocation`
- **小程序插件**：支持
- **平台支持**：微信 Windows 版、微信 Mac 版、微信鸿蒙 OS 版

## 功能描述

获取当前的模糊地理位置。

## 使用方法

自 **2022 年 7 月 14 日** 后发布的小程序，若使用该接口，需要在 `app.json` 中进行声明，否则将无法正常使用。2022年7月14日前发布的小程序不受影响。

## 申请开通

- **限制条件**：暂只针对具备与地理位置强相关的使用场景的小程序开放。
- **开通路径**：在小程序管理后台的「开发」->「开发管理」->「接口设置」中自助开通该接口权限。
- **审核机制**：从2022年7月14日开始，代码审核环节将检测该接口是否已完成开通。如未开通，将在代码提审环节进行拦截。

## 参数

### Object object

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| type | string | 'wgs84' | 否 | 返回的坐标类型，可选值见下方 |
| success | function | | 否 | 接口调用成功的回调函数 |
| fail | function | | 否 | 接口调用失败的回调函数 |
| complete | function | | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

**`type` 合法值：**

| 值 | 说明 |
| :--- | :--- |
| wgs84 | 返回 gps 坐标 |
| gcj02 | 返回 gcj02 坐标，可用于 `wx.openLocation` |

## 返回值

### success 回调函数参数 Object res

| 属性 | 类型 | 说明 |
| :--- | :--- | :--- |
| latitude | number | 纬度，范围为 -90~90，负数表示南纬 |
| longitude | number | 经度，范围为 -180~180，负数表示西经 |

## 示例代码

```javascript
wx.getFuzzyLocation({
  type: 'wgs84',
  success (res) {
    const latitude = res.latitude
    const longitude = res.longitude
  }
})
```
