# wx.offLocationChangeError

## 功能说明

该接口用于移除监听"持续定位接口返回失败时触发"事件的回调函数。

## 支持版本

- **基础库版本**：2.19.5 开始支持（低版本需做兼容处理）。
- **小程序插件**：不支持。
- **微信鸿蒙 OS 版**：支持。

## 参数

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| listener | Function | 否 | `onLocationChangeError` 传入的监听函数。如果不传此参数，则移除所有该事件的监听函数。 |

## 返回值

该接口没有返回值。

## 示例代码

```javascript
// 1. 定义监听回调函数
const listener = function (res) {
  console.log('定位错误监听被移除或触发:', res)
}

// 2. 注册监听（示例中需要先有监听才能移除特定的监听函数）
wx.onLocationChangeError(listener)

// 3. 移除指定的监听函数
// 注意：必须传入与监听时同一个的函数对象
wx.offLocationChangeError(listener)
```

## 注意事项

如果要移除所有监听函数，调用时不传参数即可，例如：`wx.offLocationChangeError()`。
