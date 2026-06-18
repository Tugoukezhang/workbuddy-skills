# wx.stopLocationUpdate

## 功能说明

关闭监听实时位置变化，前后台都停止消息接收。

## 支持版本

- **基础库**：2.8.0 开始支持，低版本需做兼容处理。
- **小程序插件**：支持，需要小程序基础库版本不低于 2.8.0。
- **微信鸿蒙 OS 版**：支持。
- **调用方式**：支持 Promise 风格调用。

## 参数

### Object object

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| success | function | - | 否 | 接口调用成功的回调函数 |
| fail | function | - | 否 | 接口调用失败的回调函数 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

## 返回值

该文档页未明确列出具体的返回数据结构。根据"支持 Promise 风格调用"的说明，若不传入 `success`、`fail` 或 `complete` 回调，该接口将返回一个 Promise 对象。

## 示例代码

该文档页未提供具体的代码示例。通常使用方式如下（参考通用 API 调用模式）：

```javascript
// 回调方式
wx.stopLocationUpdate({
  success: (res) => {
    console.log('停止位置更新成功', res)
  },
  fail: (err) => {
    console.error('停止位置更新失败', err)
  }
})

// Promise 方式
wx.stopLocationUpdate().then(() => {
  console.log('停止位置更新成功')
}).catch((err) => {
  console.error('停止位置更新失败', err)
})
```
