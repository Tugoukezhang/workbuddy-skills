# wx.startLocationUpdateBackground(Object object)

## 功能说明

开启小程序进入前后台时均接收位置消息。后台包括以下两个场景：
- 离开小程序后继续使用微信（微信仍在前台）。
- 离开微信（微信在后台）。

该接口需要引导用户开启授权。授权成功后，小程序在运行中或进入后台均可接收位置消息的变化。

**相关更新：**
自 **2022 年 7 月 14 日** 后发布的小程序，若使用该接口，必须在 `app.json` 中进行声明，否则无法正常使用。在此之前发布的小程序不受影响。

## 申请开通与使用限制

该接口暂只对特定类目的小程序开放，且需在小程序管理后台的「开发」-「开发管理」-「接口设置」中自助开通。从 2022 年 7 月 14 日起，代码审核将检测该接口是否已开通，未开通将无法提审。

**开放的类目包括：**

### 国内主体：

- **电商平台**、**商家自营**：提供线下商超导览、导航服务。
- **交通服务**：代驾、打车、共享交通、实时导航。
- **生活服务**（跑腿、共享服务）：基于地理位置的共享工具或配送服务。
- **物流服务**：快递/货物收发服务。
- **餐饮服务**：点餐、外卖平台，提供餐饮配送或门店导航。
- **工具 - 健康管理**：基于实时地理位置的身体管理记录。
- **旅游**：景区导航、导览、酒店导航。
- **政务民生** / **政府主体账号**。

### 海外主体：

- **交通服务**：代驾、打车、共享交通、实时导航。
- **生活服务**（家政、外送）、**快递业与邮政**、**餐饮服务**、**跨境电商**。
- **本地服务**：各类电商平台、百货等，提供线下商超导览。

## 支持情况

- **基础库版本**：2.8.0 开始支持（低版本需做兼容处理）。
- **Promise 风格**：支持。
- **用户授权**：需要 `scope.userLocationBackground`。
- **小程序插件**：不支持。
- **微信鸿蒙 OS 版**：支持。
- **版本要求**：安卓微信 7.0.6 版本，iOS 7.0.5 版本起支持。

## 参数

### Object object

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| type | string | 'gcj02' | 否 | 指定坐标系类型：<br> `wgs84`：返回 GPS 坐标<br> `gcj02`：返回可用于 `wx.openLocation` 的坐标 |
| success | function | | 否 | 接口调用成功的回调函数 |
| fail | function | | 否 | 接口调用失败的回调函数 |
| complete | function | | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

## 配置要求

- **app.json 配置**：需在 `app.json` 中配置 `requiredBackgroundModes: ['location']`。
- **隐私配置**：需在 `app.json` 中配置 [地理位置用途说明](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#permission)。

## 返回值

该 API 本身无直接返回值，结果通过 `success` 或 `fail` 回调函数返回。若支持 Promise 调用，则返回 Promise 对象。

## 注意事项

1. 用户首次使用时会弹窗询问是否允许"使用小程序期间和离开小程序后"获取位置信息。
2. 若用户拒绝授权，需要引导用户在设置页手动开启。
3. 为了省电，系统可能会对后台定位频率进行限制。

## 示例代码

### 基础调用示例

```javascript
wx.startLocationUpdateBackground({
  type: 'gcj02', // 坐标系类型
  success(res) {
    console.log('开启后台定位成功', res)
    // 监听位置变化事件
    wx.onLocationChange(function(res) {
      console.log('位置变化:', res.latitude, res.longitude)
    })
  },
  fail(err) {
    console.error('开启后台定位失败', err)
    wx.showToast({
      title: '定位授权失败',
      icon: 'none'
    })
  }
})
```

### Promise 风格调用示例

```javascript
wx.startLocationUpdateBackground({
  type: 'wgs84'
}).then(res => {
  console.log('成功开启后台定位');
  wx.onLocationChange((location) => {
    console.log('当前经度：', location.longitude);
    console.log('当前纬度：', location.latitude);
  });
}).catch(err => {
  console.error('开启失败：', err);
});
```
