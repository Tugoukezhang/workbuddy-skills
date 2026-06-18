## geocoder(options:Object)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提供由地址描述到所述位置坐标的转换，与逆地址解析reverseGeocoder()的过程正好相反。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：坐标系采用gcj02坐标系

</br>

**options属性说明**
|属性|类型|必填|说明|
|:-|:-|:-|:-|
|address|String|是|地址（注：地址中请包含城市名称，否则会影响解析效果），如：'北京市海淀区彩和坊路海淀西大街74号'|
|region|String|否|指定地址所属城市,如北京市</br>该参数适用于 jssdkv1.1    jssdkv1.2|
|sig|String|否|签名校验</br>开启WebServiceAPI签名校验的必传参数，只需要传入生成的SK字符串即可，不需要进行MD5加密操作</br>该参数适用于 jssdkv1.2|

**调用结果**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过属性success, fail, complete的回调参数来接收调用结果

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;success的回调参数可以有2个，第1个参数接收调用结果，第2个参数控制返回处理后的数据（非必须参数）,示例：success:function(res,data)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该属性适用于 jssdkv1.1    jssdkv1.2

**回调结果对象**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| status | number | 是 | 状态码，0为正常，310请求参数信息有误，311Key格式错误，306请求有护持信息请检查字符串，110请求来源未被授权 |
| message | string | 是 | 状态说明，即对状态码status进行说明 |
| result | GeocoderResult | 是 | 地址解析结果 |

**GeocoderResult 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| location | LatLngObject | 是 | 解析到的坐标 |
| address_components | AddressComponents | 是 | 解析后的地址部件 |
| similarity | number | 否 | 查询字符串与查询结果的文本相似度 |
| deviation | number | 是 | 误差距离，单位：米， 该值取决于输入地址的精确度；</br>如address输入：海淀区北四环西路，因为地址所述范围比较大，因此会有千米级误差；</br>而如：银科大厦这类具体的地址，返回的坐标就会相对精确；</br>该值为 -1 时，说明输入地址为过于模糊，仅能精确到市区级。|
| reliability | number | 是 | 可信度参考：值范围 1 低可信 - 10 高可信</br>我们根据用户输入地址的准确程度，在解析过程中，将解析结果的可信度(质量)，由低到高，分为1 - 10级，该值>=7时，解析结果较为准确，<7时，会存各类不可靠因素，开发者可根据自己的实际使用场景，对于解析质量的实际要求，进行参考。|

**LatLngObject 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| lat | number | 是 | 纬度 |
| lng | number | 是 | 经度 |

**AddressComponents 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| province | string | 是 | 省 |
| city | string | 是 | 市 |
| district | string | 是 | 区，可能为空字串 |
| street | string | 是 | 街道，可能为空字串 |
| street_number | string | 是 | 门牌，可能为空字串 |

**示例**

WXML 模板文件中添加组件：
``` html
<!--地图容器-->
<!--longitude及latitude为设置为调转到指定地址位置，默认不显示-->
<map id="myMap"
    markers="{{markers}}"
    style="width:100%;height:300px;"
    longitude="{{location.longitude}}"
    latitude="{{location.latitude}}"
    scale='16' 
    show-location>
</map>
<!--form表单-->
<form bindsubmit="formSubmit">
    <!--地址描述输入框,示例：北京市海淀区彩和坊路海淀西大街74号-->
    <input style="border:1px solid #000;" name="geocoder"></input>
    <!--提交表单数据-->
    <button form-type="submit">地址解析</button>
</form>
<!--地址描述经纬度展示-->
<view>地址纬度：{{location.latitude}}</view>
<view>地址经度：{{location.longitude}}</view>
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
    markers:[], // 声明markers，存储marker数据
    location:{} // 声明location, 通过解析结果获取经纬度：latitude, longitude，展示解析位置
  },

  //触发表单提交事件，调用接口
  formSubmit(e) {
    var _this = this;
    //调用地址解析接口
    qqmapsdk.geocoder({
      //获取表单传入地址
      address: e.detail.value.geocoder, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function(res) {//成功后的回调
        console.log(res);
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        //根据地址解析在地图上标记解析地址位置
        _this.setData({ // 获取返回结果，放到markers及poi中，并在地图展示
          markers: [{
            id: 0,
            title: res.title,
            latitude: latitude,
            longitude: longitude,
            iconPath: './resources/placeholder.png',//图标路径
            width: 20,
            height: 20,
            callout: { //可根据需求是否展示经纬度
              content: latitude + ',' + longitude,
              color: '#000',
              display: 'ALWAYS'
            }
          }],
          location: { //根据自己data数据设置相应的地图中心坐标变量名称
            latitude: latitude,
            longitude: longitude
          }
        });
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    })
  }
})
``` 

## 接口调用说明
geocoder(options:Object)方法调用接口服务如下：<br>
/ws/geocoder/v1    地址解析

注：微信小程序JavaScript SDK通过对腾讯位置服务WebServiceAPI接口进行封装而形成，因此和直接调用WebSerivceAPI的限制是等同的，<br>具体可参考：[腾讯位置服务WebServiceAPI配额及使用限制](https://lbs.qq.com/dev/console/quotaImprove)
