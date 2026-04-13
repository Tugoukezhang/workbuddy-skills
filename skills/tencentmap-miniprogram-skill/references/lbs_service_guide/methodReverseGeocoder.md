## reverseGeocoder(options:Object)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本接口提供由坐标到坐标所在位置的文字描述的转换，输入坐标返回地理位置信息和附近poi列表。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：坐标系采用gcj02坐标系

</br>

**options属性说明**
|属性|类型|必填|说明|
|:-|:-|:-|:-|
|location|StringIObject|否|位置坐标，</br>①String格式：lat<纬度>,lng<经度>（例：location: '39.984060,116.307520'）</br>②Object格式：</br>{</br>&nbsp;&nbsp;latitude: 纬度,</br>&nbsp;&nbsp;longitude: 经度</br>}</br>（例：location: {</br>&nbsp;&nbsp;latitude: 39.984060,</br>&nbsp;&nbsp;longitude: 116.307520</br>}）</br>默认是当前位置|
|coord_type|Number|否|输入的locations的坐标类型，可选值为[1,6]之间的整数，每个数字代表的类型说明：</br>1 GPS坐标</br>2 sogou经纬度</br>3 baidu经纬度</br>4 mapbar经纬度</br>5 [默认]腾讯、google、高德坐标</br>6 sogou墨卡托|
|get_poi|Number|否|是否返回周边POI列表：</br>1.返回；0不返回(默认)|
|poi_options|String|否|用于控制Poi列表：</br>1 poi_options=address_format=short</br>返回短地址，缺省时返回长地址</br>2 poi_options=radius=5000</br>半径，取值范围 1-5000（米）</br>3 poi_options=policy=1/2/3</br>控制返回场景，</br>policy=1[默认] 以地标+主要的路+近距离poi为主，着力描述当前位置；</br>policy=2 到家场景：筛选合适收货的poi，并会细化收货地址，精确到楼栋；</br>policy=3 出行场景：过滤掉车辆不易到达的POI(如一些景区内POI)，增加道路出路口、交叉口、大区域出入口类POI，排序会根据真实API大用户的用户点击自动优化。</br>多个参数之间用分号分隔，示例：<br/>poi_options: "address_format=short;radius=300;policy=1" |
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
| result | ReverseGeocoderResult | 是 | 逆地址解析结果 |

**ReverseGeocoderResult 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| address | string | 是 | 地址描述 |
| formatted_addresses | FormattedAddresses | 否 | 位置描述 |
| address_component | AddressComponent | 是 | 地址部件，address不满足需求时可自行拼接 |
| ad_info | AdInfo | 否 | 行政区划信息 |
| address_reference | AddressReference | 否 | 坐标相对位置参考 |
| pois | ReverseGeocoderPOI[] | 否 | POI数组，对象中每个子项为一个POI对象，返回的POI数量及页数可通过请求参数poi_options设置 |

**FormattedAddresses 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| recommend | string | 否 | 经过腾讯地图优化过的描述方式，更具人性化特点 |
| rough | string | 否 | 大致位置，可用于对位置的粗略描述 |

**AddressComponent 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| nation | string | 是 | 国家 |
| province | string | 是 | 省 |
| city | string | 是 | 市 |
| district | string | 否 | 区，可能为空字串 |
| street | string | 否 | 街道，可能为空字串 |
| street_number | string | 否 | 门牌，可能为空字串 |

**AdInfo 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| adcode | string | 是 | 行政区划代码 |
| name | string | 是 | 行政区划名称 |
| location | LatLngObject | 是 | 行政区划中心点坐标 |
| nation | string | 是 | 国家 |
| province | string | 是 | 省 / 直辖市 |
| city | string | 是 | 市 / 地级区 及同级行政区划 |
| district | string | 否 | 区 / 县级市 及同级行政区划 |

**AddressReference 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| famous_area | ReferenceLocation | 否 | 知名区域，如商圈或人们普遍认为有较高知名度的区域 |
| town | ReferenceLocation | 否 | 乡镇街道 |
| landmark_l1 | ReferenceLocation | 否 | 一级地标，可识别性较强、规模较大的地点、小区等 |
| landmark_l2 | ReferenceLocation | 否 | 二级地标，较一级地标更为精确，规模更小 |
| street | ReferenceLocation | 否 | 街道 |
| street_number | ReferenceLocation | 否 | 门牌 |
| crossroad | ReferenceLocation | 否 | 交叉路口 |
| water | ReferenceLocation | 否 | 水系 |

**ReferenceLocation 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| title | string | 否 | 名称/标题 |
| location | LatLngObject | 否 | 坐标 |
| _distance | number | 否 | 此参考位置到输入坐标的直线距离 |
| _dir_desc | string | 否 | 此参考位置到输入坐标的方位关系，如：北、南、内 |

**ReverseGeocoderPOI 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| id | string | 否 | POI唯一标识 |
| title | string | 否 | poi名称 |
| address | string | 否 | 地址 |
| category | string | 否 | POI分类 |
| location | LatLngObject | 否 | 提示所述位置坐标 |
| _distance | number | 否 | 该POI到逆地址解析传入的坐标的直线距离 |

**LatLngObject 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| lat | number | 是 | 纬度 |
| lng | number | 是 | 经度 |

**示例**

WXML 模板文件中添加组件：

``` html
<!--地图容器-->
<!--longitude及latitude为设置为调转到指定坐标位置，默认不显示-->
<map id="myMap"
    markers="{{markers}}"
    style="width:100%;height:300px;"
    longitude="{{longitude}}"
    latitude="{{latitude}}" 
    scale='16' 
    show-location>
</map>
<!--form表单-->
<form bindsubmit="formSubmit">
    <!--地址输入框,例：39.984060,116.307520-->
    <input style="border:1px solid #000;" name="reverseGeo"></input>
    <!--提交表单按钮-->
    <button form-type="submit">逆地址解析</button>
</form>
<view>当前位置为：{{address}}</view>
```

Javascript 关键代码片段：
``` javascript
// 引入SDK核心类
var QQMapWX = require('xxx/qqmap-wx.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: '开发密钥（key）' // 必填
});  
 
Page({
  data: {
    markers:[], // 声明markers，存储marker数据
    // 地图展示位置
    latitude: 39.984060,
    longitude: 116.307520,
    address: ""
  },

  // 触发表单提交事件，调用接口
  formSubmit(e) {
    var _this = this;
    qqmapsdk.reverseGeocoder({
      //位置坐标，默认获取当前位置，非必须参数
      /**
       * 
       //Object格式
        location: {
          latitude: 39.984060,
          longitude: 116.307520
        },
      */
      /**
       *
       //String格式
        location: '39.984060,116.307520',
      */
      location: e.detail.value.reverseGeo || '', //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
      //get_poi: 1, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
      success: function(res) {//成功后的回调
        console.log(res);
        var res = res.result;
        var mks = [];
        /**
         *  当get_poi为1时，检索当前位置或者location周边poi数据并在地图显示，可根据需求是否使用
         *
            for (var i = 0; i < res.pois.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
                title: res.pois[i].title,
                id: res.pois[i].id,
                latitude: res.pois[i].location.lat,
                longitude: res.pois[i].location.lng,
                iconPath: './resources/placeholder.png', //图标路径
                width: 20,
                height: 20
            })
            }
        *
        **/
        //当get_poi为0时或者为不填默认值时，检索目标位置，按需使用
        mks.push({ // 获取返回结果，放到mks数组中
          title: res.address,
          id: 0,
          latitude: res.location.lat,
          longitude: res.location.lng,
          iconPath: './resources/placeholder.png',//图标路径
          width: 20,
          height: 20,
          callout: { //在markers上展示地址名称，根据需求是否需要
            content: res.address,
            color: '#000',
            display: 'ALWAYS'
          }
        });
        _this.setData({ 
          //设置markers属性和地图位置poi，将结果在地图展示
          markers: mks,
          // 修改地图展示位置
          latitude: res.location.lat,
          longitude: res.location.lng,
          // 当前地址
          address: res.address
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
reverseGeocoder(options:Object)方法调用接口服务如下：<br>
/ws/geocoder/v1    逆地址解析（位置描述）

注：微信小程序JavaScript SDK通过对腾讯位置服务WebServiceAPI接口进行封装而形成，因此和直接调用WebSerivceAPI的限制是等同的，<br>具体可参考：[腾讯位置服务WebServiceAPI配额及使用限制](https://lbs.qq.com/dev/console/quotaImprove)
