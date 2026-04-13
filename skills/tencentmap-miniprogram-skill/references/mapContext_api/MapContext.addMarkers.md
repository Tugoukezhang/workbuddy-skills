# MapContext.addMarkers(Object object)

> 基础库 2.13.0 开始支持，低版本需做兼容处理。

> **以 Promise 风格 调用**：不支持
> 
> **小程序插件**：支持
> 
> **微信 鸿蒙 OS 版**：支持

> 相关文档: map

## 功能描述

添加 marker。

## 参数

### Object object

| 属性     | 类型     | 默认值 | 必填 | 说明                                       |
| -------- | -------- | ------ | ---- | ------------------------------------------ |
| markers  | Array    |        | 是   | 同传入 map 组件的 marker 属性              |
| clear    | boolean  | false  | 否   | 是否先清空地图上所有 marker                |
| success  | function |        | 否   | 接口调用成功的回调函数                     |
| fail     | function |        | 否   | 接口调用失败的回调函数                     |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |
