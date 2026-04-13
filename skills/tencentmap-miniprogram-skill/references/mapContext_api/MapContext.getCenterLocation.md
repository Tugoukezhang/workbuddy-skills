# MapContext.getCenterLocation(Object object)

> **以 Promise 风格 调用**：不支持
>
> **小程序插件**：支持

> 相关文档: map

## 功能描述

获取当前地图中心的经纬度。返回的是 gcj02 坐标系，可以用于 wx.openLocation()

## 参数

### Object object

| 属性     | 类型     | 默认值 | 必填 | 说明                                       |
| -------- | -------- | ------ | ---- | ------------------------------------------ |
| iconPath | string   |        | 否   | 图标路径，支持网络路径、本地路径、代码包路径 |
| success  | function |        | 否   | 接口调用成功的回调函数                     |
| fail     | function |        | 否   | 接口调用失败的回调函数                     |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

#### object.success 回调函数

##### 参数

###### Object res

| 属性      | 类型   | 说明 |
| --------- | ------ | ---- |
| longitude | number | 经度 |
| latitude  | number | 纬度 |
