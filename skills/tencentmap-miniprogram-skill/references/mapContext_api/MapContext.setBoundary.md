# MapContext.setBoundary(Object object)

> 基础库 2.22.0 开始支持，低版本需做兼容处理。

> **以 Promise 风格 调用**：不支持
>
> **小程序插件**：支持

> 相关文档: map

## 功能描述

限制地图的显示范围。此接口同时会限制地图的最小缩放整数级别。

## 参数

### Object object

| 属性      | 类型     | 默认值 | 必填 | 说明                                       |
| --------- | -------- | ------ | ---- | ------------------------------------------ |
| southwest | Object   |        | 是   | 西南角经纬度                               |
| northeast | Object   |        | 是   | 东北角经纬度                               |
| success   | function |        | 否   | 接口调用成功的回调函数                     |
| fail      | function |        | 否   | 接口调用失败的回调函数                     |
| complete  | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

#### southwest 结构

| 结构属性  | 类型   | 默认值 | 必填 | 说明 |
| --------- | ------ | ------ | ---- | ---- |
| longitude | number |        | 是   | 经度 |
| latitude  | number |        | 是   | 纬度 |

#### northeast 结构

| 结构属性  | 类型   | 默认值 | 必填 | 说明 |
| --------- | ------ | ------ | ---- | ---- |
| longitude | number |        | 是   | 经度 |
| latitude  | number |        | 是   | 纬度 |
