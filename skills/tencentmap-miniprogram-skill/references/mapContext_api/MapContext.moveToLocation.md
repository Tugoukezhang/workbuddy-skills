# MapContext.moveToLocation(Object object)

> 基础库 1.2.0 开始支持，低版本需做兼容处理。

> **以 Promise 风格 调用**：不支持
>
> **用户授权**：需要 scope.userLocation
>
> **小程序插件**：支持

> 相关文档: map

## 功能描述

将地图中心移置当前定位点，此时需设置地图组件 show-location 为true。2.8.0 起支持将地图中心移动到指定位置。

## 参数

### Object object

| 属性      | 类型     | 默认值 | 必填 | 说明                                       | 最低版本 |
| --------- | -------- | ------ | ---- | ------------------------------------------ | -------- |
| longitude | number   |        | 否   | 经度                                       | 2.8.0    |
| latitude  | number   |        | 否   | 纬度                                       | 2.8.0    |
| success   | function |        | 否   | 接口调用成功的回调函数                     |          |
| fail      | function |        | 否   | 接口调用失败的回调函数                     |          |
| complete  | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |          |
