# wx.offLocationChange

## 功能描述

移除实时地理位置变化事件的监听函数。

## 支持说明

- **基础库版本**：2.8.1 开始支持（低版本需做兼容处理）。
- **小程序插件**：不支持。
- **微信鸿蒙 OS 版**：支持。

## 参数

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| listener | function | 否 | `onLocationChange` 传入的监听函数。如果不传此参数，则移除所有监听函数。 |

## 返回值

该文档内容未明确显示返回值信息（通常此类移除监听的 API 无返回值或返回 undefined）。

## 示例代码

```javascript
const listener = function (res) { 
  console.log(res) 
}

wx.onLocationChange(listener)
wx.offLocationChange(listener) // 需传入与监听时同一个的函数对象
```
