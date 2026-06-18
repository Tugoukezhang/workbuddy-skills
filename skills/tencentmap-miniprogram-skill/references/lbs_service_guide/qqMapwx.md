微信小程序JavaScript SDK开发指南核心类
## QQMapWX

        小程序JavaScriptSDK核心类
https://lbs.qq.com/dev/console/key/manage
| 构造函数                        | 说明                          |
| --------------------------- | --------------------------- |
| new QQMapWX(options:Object) | 参数： key ： 必填，开发密钥(key)，申请地址 https://lbs.qq.com/dev/console/key/manage|


| 方法 | 返回值  | 说明                                        |
| -- | ---- | ----------------------------------------- |
|  search(options:Object)  | none | 地点搜索，搜索周边poi，比如：“酒店” “餐饮” “娱乐” “学校” 等等    |
|  getSuggestion(options:Object)  | none | 用于获取输入关键字的补完与提示，帮助用户快速输入                  |
|  reverseGeocoder(options:Object)  | none | 提供由坐标到坐标所在位置的文字描述的转换。输入坐标返回地理位置信息和附近poi列表 |
|  geocoder(options:Object)  | none | 提供由地址描述到所述位置坐标的转换，与逆地址解析的过程正好相反           |
|  direction(options:Object)  | none | 提供驾车，步行，骑行，公交的路线规划能力                      |
|  getCityList()  | none | 获取全国城市列表数据                                |
|  getDistrictByCityId(options:Object)  | none | 通过城市ID返回城市下的区县                            |
|  calculateDistance(options:Object)  | none | 计算一个点到多点的步行、驾车距离                          |

**方法options参数通用属性**

        options中可以指定success, fail, complete来接收接口调用结果，调用结果状态码见下一个表《调用结果状态码》，具体结果数据见方法详细描述页面《返回值》说明。

| 属性       | 类型       | 必填 | 说明                       |
| -------- | -------- | -- | ------------------------ |
| success  | Function | 否  | 接口调用成功的回调函数              |
| fail     | Function | 否  | 接口调用失败的回调函数              |
| complete | Function | 否  | 接口调用结束的回调函数（调用成功、失败都会执行） |

**调用结果状态码**
1000
| status | message       |
| ------ | ------------- |
| 0      | 正常            |
| 310    | 请求参数信息有误      |
| 311    | key格式错误       |
| 306    | 请求有护持信息请检查字符串 |
| 110    | 请求来源未被授权      |
|        | 小程序内部抛出的错误    |

**示例**

```
`// 引入SDK核心类var QQMapWX = require('xxx/qqmap-wx.js');

// 实例化API核心类var demo = new QQMapWX({
    key: '开发密钥（key）'// 必填
});

// 调用接口
demo.search({
    keyword: '酒店',
    success: function(res) {
        console.log(res.status, res.message);
    },
    fail: function(res) {
        console.log(res.status, res.message);
    },
    complete: function(res) {
        console.log(res.status, res.message);
    }
});
`
```