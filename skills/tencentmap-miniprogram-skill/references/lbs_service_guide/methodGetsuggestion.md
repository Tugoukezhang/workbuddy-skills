## getSuggestion(options:Object)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用于获取输入关键字的补完与提示，帮助用户快速输入

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：坐标系采用gcj02坐标系

</br>

**options属性说明**
|属性|类型|必填|说明|
|:-|:-|:-|:-|
|keyword|String|是|用户输入的关键词（希望获取后续提示的关键词）|
|region|String|否|设置城市名，限制关键词所示的地域范围，如，仅获取"广州市"范围内的提示内容,默认值全国|
|region_fix|Number|否|取值： 0：[默认]当前城市无结果时，自动扩大范围到全国匹配 1：固定在当前城市|
|policy|Number|否|检索策略，目前支持：</br>policy=0：默认，常规策略</br>policy=1：本策略主要用于收货地址、上门服务地址的填写，</br>提高了小区类、商务楼宇、大学等分类的排序，过滤行政区、</br>道路等分类（如海淀大街、朝阳区等），排序策略引入真实用户对输入提示的点击热度，</br>使之更为符合此类应用场景，体验更为舒适|
| location|String|否| 定位坐标，传入后，若用户搜索关键词为类别词（如酒店、餐馆时），与此坐标距离近的地点将靠前显示，格式： location=lat,lng （示例：location：39.11457,116.55332）|
|get_subpois|Number|否|是否返回子地点，如大厦停车场、出入口等取值：</br>0 [默认]不返回</br>1 返回</br>该参数适用于 jssdkv1.1    jssdkv1.2|
|filter|String|否|最多支持五个分类</br>**搜索指定分类**</br>category=公交站</br>**搜索多个分类**</br>category=大学,中学</br>（注意参数值要进行url编码）</br>该参数适用于 jssdkv1.1    jssdkv1.2|
|address_format|String|否|短地址，缺省时返回长地址，可选值：'short'</br>该参数适用于 jssdkv1.1    jssdkv1.2|
|page_size|Number|否|每页条目数，最大限制为20条，默认值10</br>该参数适用于 jssdkv1.1    jssdkv1.2|
|page_index|Number|否|第x页，默认第1页</br>该参数适用于 jssdkv1.1    jssdkv1.2|
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
| count | number | 是 | 本次搜索结果总数 |
| data | SuggestionObject[] | 是 | 搜索结果POI数组，每项为一个POI对象 |

**SuggestionObject 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| id | string | 是 | POI唯一标识 |
| title | string | 是 | POI名称 |
| address | string | 是 | 地址 |
| province | string | 是 | 省 |
| city | string | 是 | 市 |
| adcode | string | 是 | 行政区划代码 |
| type | number | 是 | POI类型，值说明：0:普通POI / 1:公交车站 / 2:地铁站 / 3:公交线路 / 4:行政区划 |
| location | LocationObject | 是 | 坐标 |

**LocationObject 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| lat | number | 是 | 纬度 |
| lng | number | 是 | 经度 |

**示例**

WXML 模板文件中添加组件：
``` html
<!--绑定输入事件-->
<input style="border:1px solid black;" bindinput="getsuggest" value="{{keyword}}"></input>
<!--关键词输入提示列表渲染-->
<view wx:if="{{showSuggestion}}">
   <view wx:for="{{suggestion}}" wx:key="index">
      <!--绑定回填事件-->
      <view bindtap="onSelect">
        <!--根据需求渲染相应数据-->
        <!--渲染地址title-->
        <view style="text-align:center;" bindtap="backfill" id="{{index}}">{{item.title}}</view>
        <!--渲染详细地址-->
        <view style="font-size:12px;color:#666;text-align:center;">{{item.addr}}</view>
      </view>
   </view>
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
    keyword: '',
    showSuggestion: false,
    suggestion:[] // 声明suggestion，用于存储提示结果
  },
  //数据回填方法
  backfill: function (e) {
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggestion.length;i++){
      if(i == id){
        this.setData({
          keyword: this.data.suggestion[i].title
        });
      }  
    }
  },
  onSelect: function () {
     this.setData({
         showSuggestion: false,
     })
  },
  //触发关键词输入提示事件
  getsuggest: function(e) {
    var _this = this;
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function(res) {//搜索成功后的回调
        console.log(res);
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug,
          showSuggestion: true,
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
getSuggestion(options:Object)方法调用接口服务如下：<br>
/ws/place/v1/suggestion    关键词输入提示

注：微信小程序JavaScript SDK通过对腾讯位置服务WebServiceAPI接口进行封装而形成，因此和直接调用WebSerivceAPI的限制是等同的，<br>具体可参考：[腾讯位置服务WebServiceAPI配额及使用限制](https://lbs.qq.com/dev/console/quotaImprove)
