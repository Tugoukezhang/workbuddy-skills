# MapContext.toScreenLocation(Object object)

> 基础库 2.14.0 开始支持，低版本需做兼容处理。

> **以 Promise 风格 调用**：不支持
>
> **小程序插件**：支持

> 相关文档: map

## 功能描述

获取经纬度对应的屏幕坐标，坐标原点为地图左上角。

## 参数

### Object object

| 属性      | 类型     | 默认值 | 必填 | 说明                                       |
| --------- | -------- | ------ | ---- | ------------------------------------------ |
| latitude  | Number   |        | 是   | 纬度                                       |
| longitude | Number   |        | 是   | 经度                                       |
| success   | function |        | 否   | 接口调用成功的回调函数                     |
| fail      | function |        | 否   | 接口调用失败的回调函数                     |
| complete  | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

#### object.success 回调函数

##### 参数

###### Object res

| 属性 | 类型   | 说明      |
| ---- | ------ | --------- |
| x    | number | x 坐标值  |
| y    | number | y 坐标值  |
