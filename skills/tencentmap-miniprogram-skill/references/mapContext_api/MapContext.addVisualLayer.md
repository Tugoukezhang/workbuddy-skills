# MapContext.addVisualLayer(Object object)

> 基础库 2.20.1 开始支持，低版本需做兼容处理。

> **以 Promise 风格 调用**：不支持
>
> **小程序插件**：支持
>
> **微信 鸿蒙 OS 版**：支持

> 相关文档: map

## 功能描述

添加可视化图层。需要刷新时，interval 可设置的最小值为 15 s。

## 参数

### Object object

| 属性     | 类型     | 默认值 | 必填 | 说明                                       |
| -------- | -------- | ------ | ---- | ------------------------------------------ |
| layerId  | String   |        | 是   | 可视化图层id                               |
| interval | Number   | 0      | 否   | 刷新周期，单位秒                           |
| zIndex   | Number   | 1      | 否   | 图层绘制顺序                               |
| opacity  | Number   | 1      | 否   | 图层透明度                                 |
| success  | function |        | 否   | 接口调用成功的回调函数                     |
| fail     | function |        | 否   | 接口调用失败的回调函数                     |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |
