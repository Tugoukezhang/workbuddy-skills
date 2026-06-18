## getCityList(options:Object)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取全国城市列表数据。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：坐标系采用gcj02坐标系

</br>

**options属性说明**
|属性|类型|必填|说明|
|:-|:-|:-|:-|
|sig|String|否|签名校验</br>开启WebServiceAPI签名校验的必传参数，只需要传入生成的SK字符串即可，不需要进行MD5加密操作</br>该参数适用于 jssdkv1.1    jssdkv1.2|

**调用结果**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过属性success, fail, complete的回调参数来接收调用结果

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;success的回调参数可以有2个，第1个参数接收调用结果，第2个参数控制返回处理后的数据（非必须参数）,示例：success:function(res,data)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该属性适用于 jssdkv1.1    jssdkv1.2

**回调结果对象**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| status | number | 是 | 状态码，0为正常，310请求参数信息有误，311Key格式错误，306请求有护持信息请检查字符串，110请求来源未被授权 |
| message | string | 是 | 状态说明，即对状态码status进行说明 |
| result | DistrictInfo[][] | 是 | 结果数组，第0项代表一级行政区划，第1项代表二级行政区划，以此类推 |

**DistrictInfo 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| id | number | 是 | 行政区划唯一标识 |
| name | string | 否 | 简称，如"内蒙古" |
| fullname | string | 是 | 全称，如"内蒙古自治区" |
| location | LatLngObject | 是 | 中心点坐标 |
| pinyin | string[] | 否 | 行政区划拼音，每一下标为一个字的全拼，如：["nei","meng","gu"] |
| cidx | number[] | 否 | 子级行政区划在下级数组中的下标位置 |

**LatLngObject 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| lat | number | 是 | 纬度 |
| lng | number | 是 | 经度 |

**示例**

Javascript 关键代码片段：
``` javascript
// 引入SDK核心类
var QQMapWX = require('xxx/qqmap-wx.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: '开发密钥（key）' // 必填
});
 
//在Page({})中使用下列代码
//页面显示/切入前台时触发
onShow: function() {
    var _this = this;
    //调用获取城市列表接口
    qqmapsdk.getCityList({
      success: function(res) {//成功后的回调
        console.log(res);
        console.log('省份数据：', res.result[0]); //打印省份数据
        console.log('城市数据：', res.result[1]); //打印城市数据
        console.log('区县数据：', res.result[2]); //打印区县数据
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    });
}
```

## 接口调用说明

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getCityList(options:Object)方法调用接口服务如下：
- /ws/district/v1/list    行政区划:列表

注：微信小程序JavaScript SDK通过对腾讯位置服务WebServiceAPI接口进行封装而形成，因此和直接调用WebSerivceAPI的限制是等同的，<br>具体可参考：[腾讯位置服务WebServiceAPI配额及使用限制](https://lbs.qq.com/dev/console/quotaImprove)
