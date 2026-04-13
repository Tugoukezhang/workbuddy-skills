# wx.chooseLocation(Object object)

打开地图选择位置。

## 功能说明

该接口用于调起微信内置地图，让用户选择一个地理位置。用户选择后，小程序可获取该位置的名称、详细地址以及经纬度信息。

## 权限与兼容性

- **用户授权**：需要 `scope.userLocation`。
- **支持平台**：iOS、Android、Windows、Mac、微信鸿蒙 OS 版。
- **小程序插件**：支持，需基础库版本不低于 1.9.6。
- **调用方式**：支持 Promise 风格调用。

## 使用限制与开通规则

### 声明要求

自 **2022 年 7 月 14 日** 后发布的小程序，若使用该接口，必须在 `app.json` 中进行声明，否则无法正常使用。在此之前发布的小程序不受影响。

### 权限开通

该接口目前**暂只针对具备与地理位置强相关的使用场景**的小程序开放。开发者需在小程序管理后台的「开发」-「开发管理」-「接口设置」中自助开通权限。

- 申请入口已于 2022 年 3 月 31 日全量上线。
- 从 2022 年 4 月 18 日开始，代码审核环节将检测该接口是否已开通，未开通将被拦截。

## 参数

### Object object

| 属性 | 类型 | 默认值 | 必填 | 说明 | 最低基础库版本 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| latitude | number | | 否 | 目标地纬度 | 2.9.0 |
| longitude | number | | 否 | 目标地经度 | 2.9.0 |
| success | function | | 否 | 接口调用成功的回调函数 | |
| fail | function | | 否 | 接口调用失败的回调函数 | |
| complete | function | | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） | |

## 返回值

### success 回调参数 res

当接口调用成功时，回调函数会接收一个对象 `res`，包含以下属性：

| 属性 | 类型 | 说明 |
| :--- | :--- | :--- |
| name | string | 位置名称 |
| address | string | 详细地址 |
| latitude | number | 纬度，浮点数，范围为 -90~90，负数表示南纬。使用 gcj02 国测局坐标系 |
| longitude | number | 经度，浮点数，范围为 -180~180，负数表示西经。使用 gcj02 国测局坐标系 |

## 参考示例

以下为文档中提供的标准调用示例：

```javascript
wx.chooseLocation({
  success: function(res) {
    console.log(res.name);
    console.log(res.address);
    console.log(res.latitude);
    console.log(res.longitude);
  }
});
```
