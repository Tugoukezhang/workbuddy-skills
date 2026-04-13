# MapContext.initMarkerCluster(Object object)

> 基础库 2.13.0 开始支持，低版本需做兼容处理。

> **以 Promise 风格 调用**：不支持
>
> **小程序插件**：支持

> 相关文档: map

## 功能描述

初始化点聚合的配置，未调用时采用默认配置。

## 参数

### Object object

| 属性               | 类型     | 默认值 | 必填 | 说明                                                         |
| ------------------ | -------- | ------ | ---- | ------------------------------------------------------------ |
| enableDefaultStyle | boolean  | true   | 否   | 启用默认的聚合样式                                           |
| zoomOnClick        | boolean  | true   | 否   | 点击已经聚合的标记点时是否实现聚合分离                       |
| gridSize           | number   | 60     | 否   | 聚合算法的可聚合距离，即距离小于该值的点会聚合至一起，以像素为单位 |
| success            | function |        | 否   | 接口调用成功的回调函数                                       |
| fail               | function |        | 否   | 接口调用失败的回调函数                                       |
| complete           | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |
