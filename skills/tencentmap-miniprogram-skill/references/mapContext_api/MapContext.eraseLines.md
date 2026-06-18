# MapContext.eraseLines(Object object)

> 基础库 2.5.0 开始支持，低版本需做兼容处理。

> **以 Promise 风格 调用**：不支持
>
> **小程序插件**：支持
>
> **微信 鸿蒙 OS 版**：支持

> 相关文档: map

## 功能描述

擦除或置灰已添加到地图中的线段。

## 参数

### Object object

| 属性     | 类型            | 默认值 | 必填 | 说明                                       |
| -------- | --------------- | ------ | ---- | ------------------------------------------ |
| lines    | Array.&lt;Object&gt; |        | 是   | 要擦除的线段数组。详见 polyline 属性。     |
| success  | function        |        | 否   | 接口调用成功的回调函数                     |
| fail     | function        |        | 否   | 接口调用失败的回调函数                     |
| complete | function        |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

#### lines 结构

| 结构属性 | 类型    | 默认值 | 必填 | 说明                           |
| -------- | ------- | ------ | ---- | ------------------------------ |
| id       | number  |        | 是   | 线段的 id。                    |
| index    | number  |        | 是   | 指定线段的某一段，线段起点 index 为 0 |
| point    | Object  |        | 是   | 指定线段某一段中的点           |
| clear    | boolean | true   | 否   | 为 true 时擦除，false 时置灰   |

##### point 结构

| 结构属性  | 类型   | 默认值 | 必填 | 说明 |
| --------- | ------ | ------ | ---- | ---- |
| longitude | number |        | 是   | 经度 |
| latitude  | number |        | 是   | 纬度 |
