>(产品通知)<br>
由于 /ws/distance/v1 接口已逐步下线，后续不再进行维护，建议您通过WebService API接口的[距离矩阵](https://lbs.qq.com/service/webService/webServiceGuide/webServiceMatrix)实现相关需求，接入方法请参考[微信小程序中使用服务API](https://lbs.qq.com/service/webService/webServiceGuide/miniprogram)


## calculateDistance(options:Object)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计算一个点到多点的步行、驾车距离。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：坐标系采用gcj02坐标系

</br>

**options属性说明**
|属性|类型|必填|说明|
|:-|:-|:-|:-|
|mode|String|否|可选值：'driving'（驾车）、'walking'（步行），默认：'walking'</br>新增直线距离计算，'straight'（直线）直线距离计算适用于 jssdkv1.1    jssdkv1.2|
|from|StringIObject|是|位置坐标，</br>①String格式：lat<纬度>,lng<经度>（例：from: '39.984060,116.307520'）</br>②Object格式：</br>{</br>&nbsp;&nbsp;latitude: 纬度,</br>&nbsp;&nbsp;longitude: 经度</br>}</br>（例：from: { </br>latitude: 39.984060,</br>longitude: 116.307520</br>}）</br>默认是当前位置|
|to|StringIObject|是|终点坐标，</br>①String格式：lat,lng;lat,lng... （经度与纬度用英文逗号分隔，坐标间用英文分号分隔）</br>（例：to: '39.984060,116.307520;39.984060,116.507520'）</br>②Object格式1：</br>[{</br>&nbsp;&nbsp;latitude: 纬度,</br>&nbsp;&nbsp;longitude: 经度</br>}, ...]</br>(例：to:[{</br>&nbsp;&nbsp;latitude:39.984060,</br>&nbsp;&nbsp;longitude:116.307520</br>},...])</br>③Objec格式2：</br>此格式主要对应search返回的数据结构格式，方便开发这批量转换</br>[{</br>location: {</br>&nbsp;&nbsp;lat: 纬度,</br>&nbsp;&nbsp;lng: 经度</br>}</br>}, ...]</br>(例：to:[{</br>location:{</br>&nbsp;&nbsp;lat:39.984060,</br>&nbsp;&nbsp;lng:116.307520</br>}</br>},...])|
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
| result | CalculateDistanceResult | 是 | 计算结果 |

**CalculateDistanceResult 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| elements | DistanceElement[] | 是 | 结果数组 |

**DistanceElement 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| from | LatLngObject | 是 | 起点坐标 |
| to | LatLngObject | 是 | 终点坐标 |
| distance | number | 是 | 起点到终点的距离，单位：米，如果radius半径过小或者无法搜索到，则返回-1 |
| duration | number | 是 | 表示从起点到终点的结合路况的时间，秒为单位。注：步行方式不计算耗时，该值始终为0 |

**LatLngObject 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| lat | number | 是 | 纬度 |
| lng | number | 是 | 经度 |

**示例**

WXML 模板文件中添加map组件，并绑定markers数据：
``` html
<!--form表单-->
<form bindsubmit="formSubmit">
    <!--输入起点和终点经纬度坐标，格式为string格式-->
    <label>起点坐标:
    <input style="border:1px solid #000;" name="start"></input>
    </label>
    <!--多个终点位置示例：39.984060,116.307520;39.984060,116.507520-->
    <label>终点坐标:
    <input style="border:1px solid #000;" name="dest"></input>
    </label>
    <!--提交表单数据-->
    <button form-type="submit">计算距离</button>
</form>
<!--渲染起点经纬度到终点经纬度距离，单位为米-->
<view wx:for="{{distance}}" wx:key="index">
    <view>起点到终点{{index+1}}的步行距离为{{item}}米</view>
</view>
```

Javascript 关键代码片段：
``` javascript
// 引入SDK核心类
var QQMapWX = require('xxx/qqmap-wx.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: '开发密钥（key）' // 必填
});
 
//在Page({})中使用下列代码
Page({
  data: {
    distance: [],
  },
  //事件触发，调用接口
  formSubmit(e){
    var _this = this;
    //调用距离计算接口
    qqmapsdk.calculateDistance({
        //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
        //from参数不填默认当前地址
        //获取表单提交的经纬度并设置from和to参数（示例为string格式）
        from: e.detail.value.start || '', //若起点有数据则采用起点坐标，若为空默认当前地址
        to: e.detail.value.dest, //终点坐标
        success: function(res) {//成功后的回调
          console.log(res);
          var res = res.result;
          var dis = [];
          for (var i = 0; i < res.elements.length; i++) {
            dis.push(res.elements[i].distance); //将返回数据存入dis数组，
          }
          _this.setData({ //设置并更新distance数据
            distance: dis
          });
        },
        fail: function(error) {
          console.error(error);
        },
        complete: function(res) {
          console.log(res);
        }
    });
  }
})
```

## 接口调用说明

&nbsp;&nbsp;&nbsp;&nbsp;calculateDistance(options:Object)方法调用接口服务如下：

- /ws/distance/v1    距离计算:步行
- /ws/distance/v1    距离计算:驾车

注：微信小程序JavaScript SDK通过对腾讯位置服务WebServiceAPI接口进行封装而形成，因此和直接调用WebSerivceAPI的限制是等同的，<br>具体可参考：[腾讯位置服务WebServiceAPI配额及使用限制](https://lbs.qq.com/dev/console/quotaImprove)
