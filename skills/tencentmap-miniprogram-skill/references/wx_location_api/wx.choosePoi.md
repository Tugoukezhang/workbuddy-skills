# wx.choosePoi(Object object)

## 基础信息

- **功能描述**：打开 POI（兴趣点）列表选择位置。支持模糊定位（精确到市）和精确定位混选。
- **用户授权**：需要 `scope.userLocation`
- **支持平台**：微信 Windows 版、微信 Mac 版、微信鸿蒙 OS 版、小程序（需满足申请条件）。**小程序插件不支持**。
- **调用方式**：支持 Promise 风格调用。

## 使用限制与申请须知

### 配置要求

- 自 **2022 年 7 月 14 日**后发布的小程序，若使用该接口，必须在 `app.json` 中进行声明，否则无法正常使用。
- 2022年7月14日前发布的小程序不受影响。

### 权限开通

- 该接口暂只针对具备与地理位置强相关使用场景的小程序开放。
- 需要在小程序管理后台的「开发」->「开发管理」->「接口设置」中自助开通权限。
- 接口权限申请已于 2022年3月11日 开始内测，3月31日 全量上线。4月18日 起代码审核环节将检测该接口是否已开通，未开通将拦截提审。

## 参数

### Object object

| 属性 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| success | function | 否 | 接口调用成功的回调函数 |
| fail | function | 否 | 接口调用失败的回调函数 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

## 返回值

### success 回调参数 Object res

当接口调用成功时，回调函数会接收一个对象 `res`，包含以下属性：

| 属性 | 类型 | 说明 |
| :--- | :--- | :--- |
| type | number | 选择类型：值为 **1** 表示选择城市，值为 **2** 表示选择精确位置 |
| city | number | 城市名称 |
| name | string | 位置名称 |
| address | string | 详细地址 |
| latitude | number | 纬度，浮点数，范围为 -90~90，负数表示南纬。（使用 gcj02 国测局坐标系，**即将废弃**） |
| longitude | number | 经度，浮点数，范围为 -180~180，负数表示西经。（使用 gcj02 国测局坐标系，**即将废弃**） |

## 示例代码

```javascript
wx.choosePoi({
  success(res) {
    console.log(res.name, res.address, res.latitude, res.longitude);
    // res.type: 1-城市, 2-精确位置
  },
  fail(err) {
    console.error('获取位置失败', err);
  }
});

// 或者使用 Promise 风格
wx.choosePoi().then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
});
```
