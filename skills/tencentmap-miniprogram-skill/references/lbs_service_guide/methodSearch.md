## search(options:Object)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地点搜索，搜索周边poi，比如："酒店" "餐饮" "娱乐" "学校" 等等

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：坐标系采用gcj02坐标系

</br>

**options属性说明**
|属性|类型|必填|说明|
|:-|:-|:-|:-|
|keyword|String|是|POI搜索关键字</br>（默认周边搜索，若需要使用指定地区名称和矩形搜索，请使用region和rectangle参数，不能同时使用）|
|location|StringIObject|否|位置坐标，</br>①String格式：lat<纬度>,lng<经度>（例：location: '39.984060,116.307520'）</br>②Object格式：</br>{</br>&nbsp;&nbsp;latitude: 纬度,</br>&nbsp;&nbsp;longitude: 经度</br>}</br>（例：location: {</br>&nbsp;&nbsp;latitude: 39.984060,</br>&nbsp;&nbsp;longitude: 116.307520</br>}）</br>默认是当前位置|
|address_format|String|否|短地址，缺省时返回长地址，可选值：'short'|
|page_size|Number|否|每页条目数，最大限制为20条，默认值10|
|page_index|Number|否|第x页，默认第1页|
|region|String|否|指定地区名称，不自动扩大范围，如北京市,（使用该功能，若涉及到行政区划，建议将auto_extend设置为0）</br>当用户使用泛关键词搜索时（如酒店、超市），这类搜索多为了查找附近， 使用location参数，搜索结果以location坐标为中心，返回就近地点，体验更优(默认为用户当前位置坐标)</br>不与rectangle同时使用|
|rectangle|String|否|矩形区域范围，不与region同时使用</br>格式：lat,lng<左下/西南>, lat,lng<右上/东北>(示例：rectangle:'40.984061,116.307520,39.984060,116.507520')</br>该参数适用于 jssdkv1.1    jssdkv1.2|
|auto_extend|String|否|取值1：[默认]自动扩大范围；</br>取值0：不扩大。 仅适用于默认周边搜索以及制定地区名称搜索。</br>该参数适用于 jssdkv1.1    jssdkv1.2|
|filter|String|否|最多支持五个分类</br>**搜索指定分类**</br>category=公交站</br>**搜索多个分类**</br>category=大学,中学</br>**排除指定分类**</br>category<>商务楼宇</br>（注意参数值要进行url编码）</br>该参数适用于 jssdkv1.1    jssdkv1.2|
|sig|String|否|签名校验</br>开启WebServiceAPI签名校验的必传参数，只需要传入生成的SK字符串即可，不需要进行MD5加密操作</br>该参数适用于  jssdkv1.2|

**调用结果**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过属性success, fail, complete的回调参数来接收接口调用结果

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;success的回调参数可以有2个，第1个参数接收调用结果，第2个参数控制返回处理后的数据（非必须参数）,示例：success:function(res,data)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该属性适用于 jssdkv1.1    jssdkv1.2

**回调结果对象**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| status | number | 是 | 状态码，0为正常，310请求参数信息有误，311Key格式错误，306请求有护持信息请检查字符串，110请求来源未被授权 |
| message | string | 是 | 状态说明，即对状态码status进行说明 |
| count | number | 是 | 本次搜索结果总数 |
| data | POIObject[] | 是 | 搜索结果POI数组，每项为一个POI对象 |

**POIObject 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| id | string | 是 | POI唯一标识 |
| title | string | 是 | POI名称 |
| address | string | 是 | 地址 |
| tel | string | 是 | 电话 |
| category | string | 是 | POI分类 |
| type | number | 是 | POI类型，值说明：0:普通POI / 1:公交车站 / 2:地铁站 / 3:公交线路 / 4:行政区划 |
| location | LocationObject | 是 | 坐标 |
| ad_info | AdInfoObject | 是 | 行政区划信息，目前仅提供adcode |
| boundary | array | 否 | 轮廓，坐标数组，面积较大的POI会有，如住宅小区 |
| pano | PanoObject | 否 | 该POI的街景最佳查看场景及视角信息 |

**LocationObject 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| lat | number | 是 | 纬度 |
| lng | number | 是 | 经度 |

**AdInfoObject 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| adcode | string | 是 | 行政区划代码 |

**PanoObject 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| id | string | 是 | 街景场景ID，若有pano信息，则id一定存在 |
| heading | number | 否 | 最佳偏航角（与正北方向夹角，街景相关知识请 点击查看） |
| pitch | number | 否 | 俯仰角 |
| zoom | number | 否 | 缩放级别 |

**示例**

WXML 模板文件中添加map组件，并绑定markers数据：
``` html
<!--地图容器-->
<map id="myMap"
   markers="{{markers}}"
   style="width:100%;height:300px;"
   longitude="116.313972"
   latitude="39.980014" 
   scale='16'>
</map>
<!--绑定点击事件-->
<button bindtap="nearby_search">搜索周边KFC</button>
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
    markers:[] // 声明markers，存储marker数据
  },

  // 事件触发，调用接口
  nearby_search:function(){
    var _this = this;
    // 调用接口
    qqmapsdk.search({
      keyword: 'kfc',  //搜索关键词
      location: '39.980014,116.313972',  //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "/resources/my_marker.png", //图标路径
            width: 20,
            height: 20
          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          markers: mks
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res){
        console.log(res);
      }
    });
  }  
})
```

## 接口调用说明

search(options:Object)方法调用接口服务如下：<br>
 /ws/place/v1/search    地点搜索

注：微信小程序JavaScript SDK通过对腾讯位置服务WebServiceAPI接口进行封装而形成，因此和直接调用WebSerivceAPI的限制是等同的，<br>具体可参考：[腾讯位置服务WebServiceAPI配额及使用限制](https://lbs.qq.com/dev/console/quotaImprove)
