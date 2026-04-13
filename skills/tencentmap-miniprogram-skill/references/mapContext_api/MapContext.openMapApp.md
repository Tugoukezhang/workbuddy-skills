# MapContext.openMapApp(Object object)

> 基础库 2.14.0 开始支持，低版本需做兼容处理。

> **以 Promise 风格 调用**：不支持
>
> **小程序插件**：支持
>
> **微信 鸿蒙 OS 版**：支持

> 相关文档: map

## 功能描述

拉起地图APP选择导航。

## 参数

### Object object

| 属性              | 类型     | 默认值 | 必填 | 说明                      |
| ----------------- | -------- | ------ | ---- | ------------------------- |
| longitude         | Number   |        | 是   | 目的地经度                |
| latitude          | Number   |        | 是   | 目的地纬度                |
| destination       | String   |        | 是   | 目的地名称                |
| preferApplication | String   |        | 否   | 指定推荐使用的地图 App    |
| poiId             | Object   |        | 否   | 传递给地图App的poi参数    |
| success           | function |        | 否   | 接口调用成功的回调函数    |
| fail              | function |        | 否   | 接口调用失败的回调函数    |
| complete          | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

#### preferApplication 合法值

| 值      | 说明     |
| ------- | -------- |
| baidu   | 百度地图 |
| google  | 谷歌地图 |
| amap    | 高德地图 |
| tencent | 腾讯地图 |
| petal   | 花瓣地图 |
| apple   | 苹果地图 |

#### poiId 结构

| 结构属性 | 类型   | 默认值 | 必填 | 说明     |
| -------- | ------ | ------ | ---- | -------- |
| baidu    | String |        | 否   | 百度地图 |
| google   | String |        | 否   | 谷歌地图 |
| amap     | String |        | 否   | 高德地图 |
| tencent  | String |        | 否   | 腾讯地图 |
| petal    | String |        | 否   | 花瓣地图 |
| apple    | String |        | 否   | 苹果地图 |
