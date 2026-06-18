# MapContext.executeVisualLayerCommand(Object object)

> 基础库 2.26.0 开始支持，低版本需做兼容处理。

> **以 Promise 风格 调用**：不支持
>
> **小程序插件**：支持
>
> **微信 鸿蒙 OS 版**：支持

> 相关文档: map

## 功能描述

执行可视化图层指令，结合 `MapContext.on('visualLayerEvent')` 监听事件使用。

## 参数

### Object object

| 属性     | 类型     | 默认值 | 必填 | 说明                                       |
| -------- | -------- | ------ | ---- | ------------------------------------------ |
| layerId  | string   |        | 是   | 可视化图层id                               |
| command  | string   |        | 是   | 图层指令                                   |
| success  | function |        | 否   | 接口调用成功的回调函数                     |
| fail     | function |        | 否   | 接口调用失败的回调函数                     |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

#### object.success 回调函数

##### 参数

###### Object res

| 属性   | 类型   | 说明             |
| ------ | ------ | ---------------- |
| errMsg | string | 调用结果         |
| data   | string | SDK 返回的 JSON 数据 |
