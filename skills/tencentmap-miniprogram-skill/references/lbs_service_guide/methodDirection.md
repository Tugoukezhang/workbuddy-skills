## direction(options:Object)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提供路线规划能力。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.驾车（driving）：支持结合实时路况、少收费、不走高速等多种偏好，精准预估到达时间（ETA）；

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.步行（walking）：基于步行路线规划。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.骑行（bicycling）：基于自行车的骑行路线；

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.公交（transit）：支持公共汽车、地铁等多种公共交通工具的换乘方案计算；

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：坐标系采用gcj02坐标系

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;路线规划功能仅适用于    jssdkv1.2   请前往首页下载最新版本SDK

</br>

**options属性说明**
|属性|类型|必填|说明|
|:-|:-|:-|:-|
|**驾车，步行，骑行，公交路线规划公共参数：**||||
|mode|String|否|路线规划选择，可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行）、'transit'（公交），默认：'driving'|
|from|String|是|位置坐标，①String格式：String格式：lat<纬度>,lng<经度>（例：from: '39.984060,116.307520'）</br>②Object格式：</br>{</br>&nbsp;&nbsp;latitude: 纬度,</br>&nbsp;&nbsp;longitude: 经度</br>}</br>（例：from: {</br>&nbsp;&nbsp;latitude: 39.984060,</br>&nbsp;&nbsp;longitude: 116.307520</br>}）</br>默认是当前位置|
|to|String|是|位置坐标，</br>①String格式：lat<纬度>,lng<经度>（例：location: '39.984060,116.307520'）</br>②Object格式：</br>{</br>&nbsp;&nbsp;latitude: 纬度,</br>&nbsp;&nbsp;longitude: 经度</br>}</br>（例：to: {</br>&nbsp;&nbsp;latitude: 39.984060,</br>&nbsp;&nbsp;longitude: 116.307520</br>}）|
|sig|String|否|签名校验</br>开启WebServiceAPI签名校验的必传参数，只需要传入生成的SK字符串即可，不需要进行MD5加密操作|
|**driving其他参数：**||||
|from_poi|Number|否|起点POI ID，传入后，优先级高于from（坐标）</br>示例:from_poi:4077524088693206111|
|heading|Number|否|[from辅助参数]在起点位置时的车头方向，数值型，取值范围0至360（0度代表正北，顺时针一周360度）</br>传入车头方向，对于车辆所在道路的判断非常重要，直接影响路线计算的效果</br>示例：heading:175|
|speed|Number|否|[from辅助参数]速度，单位：米/秒，默认3。 当速度低于1.39米/秒时，heading将被忽略</br>示例：speed:5|
|accuracy|Number|否|[from辅助参数]定位精度，单位：米，取>0数值，默认5。 当定位精度>30米时heading参数将被忽略</br>示例：accuracy:30|
|road_type|Number|否|[from辅助参数] 起点道路类型，可选值：</br>0 [默认]不考虑起点道路类型</br>1 在桥上；2 在桥下；3 在主路；4 在辅路；5 在对面；6 桥下主路；7 桥下辅路|
|from_track|String|否|**起点轨迹：**</br>在真实的场景中，易受各种环境及设备精度影响，导致定位点产生误差，传入起点前段轨迹，可有效提升准确度。</br>**优先级：** 高于from参数</br>**轨迹中的每个定位点包含以下信息：**</br>1.纬度</br>2.经度</br>3.速度：GPS速度，单位 米/秒，取不到传-1</br>4.精度：GPS精度, 单位毫米，取不到传-1</br>5.运动方向： gps方向，正北为0, 顺时针夹角，[0-360)，获取不到时传-1</br>6.设备方向：正北为0, 顺时针夹角，[0-360)，取不到传-1</br>7.时间：定位获取该点的时间，Unix时间戳，取不到传0</br>**参数格式：**</br>1.轨迹中最多支持传入50个点。</br>2.每个点之间英文分号分隔，时间顺序由旧到新（第一个点最早获取，最后一个点最新得到）</br>3.每个点中的信息用英文逗号分隔，并按以下顺序传入：</br>纬度,经度,速度,精度,运动方向,设备方向,时间;第2个点;第3个点……</br>示例：</br>from_track:'40.037029,116.316633,16,500,160,-1,1529491290;40.036634,116.317170,16,500,161,-1,</br>1529491300;40.035977,116.317663,16,500,159,-1,1529491310;40.035706,116.318328,16,500,160,-1,1529491320;</br>40.035090,116.319058,16,500,160,-1,1529491330;40.034852,116.319820,16,500,160,-1,1529491340'|
|to_poi|Number|否|终点POI ID（可通过腾讯位置服务地点搜索服务得到），当目的地为较大园区、小区时，会以引导点做为终点（如出入口等），体验更优。</br>该参数优先级高于to（坐标），但是当目的地无引导点数据或POI ID失效时，仍会使用to（坐标）作为终点</br>示例：to_poi:5371594408805356897|
|waypoints|String|否|途经点，格式：lat1,lng1;lat2,lng2;… 最大支持30个</br>示例：waypoints:39.951004,116.571980|
|policy|String|否|一、策略参数（以下三选一）</br>LEAST_TIME：[默认]参考实时路况，时间最短</br>PICKUP：网约车场景 – 接乘客</br>TRIP：网约车场景 – 送乘客</br>二、单项偏好参数</br>（可与策略参数并用，可多选，逗号分隔）</br>REAL_TRAFFIC：参考实时路况</br>LEAST_FEE：少收费</br>AVOID_HIGHWAY：不走高速</br>NAV_POINT_FIRST： 该策略会通过终点坐标查找所在地点（如小区/大厦等），并使用地点出入口做为目的地，使路径更为合理</br>示例：policy:'LEAST_TIME'或者policy:'LEAST_TIME,AVOID_HIGHWAY'|
|plate_number|String|否|车牌号，填入后，路线引擎会根据车牌对限行区域进行避让，不填则不不考虑限行问题</br>示例：plate_number:京X309KX|
|**transit其他参数：**||||
|departure_time|Number|否|出发时间，默认使用当前时间，用于过滤掉非运营时段的线路</br>示例：departure_time:1509357129|
|policy|String|否|1) 排序策略，以下三选一：</br>policy=LEAST_TIME：时间短（默认）</br>policy=LEAST_TRANSFER：少换乘</br>policy=LEAST_WALKING：少步行<br/>policy=RECOMMEND：推荐策略，结合步行、换乘、耗时等多方面综合排序结果（与腾讯地图APP默认策略一致）</br>2) 额外限制条件</br>（可与排序策略配合使用，如：policy=LEAST_TRANSFER,NO_SUBWAY）：</br>NO_SUBWAY ，不坐地铁</br>ONLY_SUBWAY：只坐地铁 <br>SUBWAY_FIRST：地铁优先<br>示例：policy:'LEAST_TIME' 或者 policy:'LEAST_TIME,AVOID_HIGHWAY'|

**调用结果**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过属性success, fail, complete的回调参数来接收调用结果

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;success的回调参数可以有2个，第1个参数接收调用结果，第2个参数控制返回处理后的数据（非必须参数）,示例：success:function(res,data)

**driving返回结果**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| status | number | 是 | 状态码，正常为0 |
| message | string | 是 | 状态说明 |
| result | DrivingResult | 是 | 搜索结果 |

**DrivingResult 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| routes | DrivingRoute[] | 是 | 路线方案数组 |

**DrivingRoute 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| mode | string | 是 | 方案交通方式，固定值："DRIVING" |
| tags | string[] | 否 | 方案标签，用于表明方案特点</br>取值：EXPERIENCE(经验路线)、RECOMMEND(推荐路线)、LEAST_LIGHT(红绿灯少)、LEAST_TIME(时间最短)、LEAST_DISTANCE(距离最短) |
| distance | number | 是 | 方案总距离 |
| duration | number | 是 | 方案估算时间（含路况） |
| restriction | Restriction | 否 | 限行信息 |
| polyline | number[] | 是 | 方案路线坐标点串（该点串经过压缩，解压请参考：polyline 坐标解压） |
| waypoints | Waypoint[] | 否 | 途经点，顺序与输入waypoints一致 |
| taxi_fare | TaxiFare | 否 | 预估打车费 |
| steps | DrivingStep[] | 是 | 路线步骤 |

**Restriction 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| status | number | 是 | 限行状态码：0(途经没有限行城市)、1(途经包含有限行的城市)、3(已避让限行)、4(无法避开限行区域) |

**Waypoint 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| title | string | 否 | 途经点路名 |
| location | LatLngObject | 否 | 途经点坐标 |

**TaxiFare 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| fare | number | 否 | 预估打车费用，单位：元 |

**DrivingStep 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| instruction | string | 是 | 阶段路线描述 |
| polyline_idx | number[] | 是 | 阶段路线坐标点串在方案路线坐标点串的位置 |
| road_name | string | 否 | 阶段路线路名 |
| dir_desc | string | 否 | 阶段路线方向 |
| distance | number | 是 | 阶段路线距离 |
| act_desc | string | 否 | 阶段路线末尾动作 |
| accessorial_desc | string | 否 | 末尾辅助动作 |

**walking返回结果**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| status | number | 是 | 状态码，正常为0 |
| message | string | 是 | 状态说明 |
| result | WalkingResult | 是 | 搜索结果 |

**WalkingResult 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| routes | WalkingRoute[] | 是 | 路线方案数组 |

**WalkingRoute 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| mode | string | 是 | 方案交通方式，固定值："WALKING" |
| distance | number | 是 | 方案整体距离（米） |
| duration | number | 是 | 方案估算时间（分钟） |
| direction | string | 是 | 方案整体方向 |
| polyline | number[] | 是 | 方案路线坐标点串 |
| steps | WalkingStep[] | 是 | 路线步骤 |

**WalkingStep 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| instruction | string | 是 | 阶段路线描述 |
| polyline_idx | number[] | 是 | 阶段路线坐标点串在方案路线坐标点串的位置 |
| road_name | string | 否 | 阶段路线路名 |
| act_desc | string | 否 | 阶段路线方向/末尾动作 |
| distance | number | 是 | 阶段路线距离 |

**bicycling返回结果**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| status | number | 是 | 状态码，正常为0 |
| message | string | 是 | 状态说明 |
| result | BicyclingResult | 是 | 搜索结果 |

**BicyclingResult 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| routes | BicyclingRoute[] | 是 | 路线方案数组 |

**BicyclingRoute 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| mode | string | 是 | 方案交通方式，固定值："BICYCLING" |
| distance | number | 是 | 方案整体距离（米） |
| duration | number | 是 | 方案估算时间（分钟） |
| direction | string | 是 | 方案整体方向 |
| polyline | number[] | 是 | 方案路线坐标点串 |
| steps | BicyclingStep[] | 是 | 路线步骤 |

**BicyclingStep 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| instruction | string | 是 | 阶段路线描述 |
| polyline_idx | number[] | 是 | 阶段路线坐标点串在方案路线坐标点串的位置 |
| road_name | string | 否 | 阶段路线路名 |
| act_desc | string | 否 | 阶段路线方向/末尾动作 |
| distance | number | 是 | 阶段路线距离 |

**transit返回结果**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| status | number | 是 | 状态码，正常为0 |
| message | string | 是 | 状态说明 |
| result | TransitResult | 是 | 搜索结果 |

**TransitResult 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| routes | TransitRoute[] | 是 | 路线方案数组 |

**TransitRoute 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| distance | number | 是 | 方案整体距离（米） |
| duration | number | 是 | 方案估算时间（分钟） |
| bounds | string | 是 | 路线bounds，用于显示地图时使用 |
| steps | TransitStep[] | 是 | 具体方案，按交通工具的换乘分段 |

**TransitStep 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| mode | string | 是 | 阶段路线交通方式：WALKING(步行)、TRANSIT(公交/地铁)、TRANSIT_FOLDER(跨城公交) |
| tag | string | 否 | 返回值仅支持INTERNAL，代表站内换乘 |
| distance | number | 是 | 阶段路线距离 |
| duration | number | 否 | 阶段路线估算时间 |
| direction | string | 否 | 阶段路线方向 |
| polyline | number[] | 否 | 阶段路线点串 |
| steps | WalkingStep[] | 否 | 步行分段（mode为WALKING时） |
| lines | TransitLine[] | 否 | 交通线路数组（mode为TRANSIT时） |
| origin | TransitLocation | 否 | 起点（mode为TRANSIT_FOLDER时） |
| destination | TransitLocation | 否 | 终点（mode为TRANSIT_FOLDER时） |

**TransitLine 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| vehicle | string | 是 | 交通工具：BUS(公交车)、SUBWAY(地铁)、RAIL(铁路) |
| id | string | 是 | 线路ID |
| title | string | 是 | 线路名称 |
| station_count | number | 是 | 途径/经过站数 |
| price | number | 否 | 票价 |
| destination | TransitStation | 否 | 终点站/目的地 |
| start_time | string | 否 | 首班车时间 |
| end_time | string | 否 | 末班车时间 |
| distance | number | 是 | 距离 |
| duration | number | 是 | 估算时间 |
| polyline | number[] | 是 | 阶段路线坐标点串 |
| geton | TransitStop | 是 | 上车站 |
| getoff | TransitStop | 是 | 下车站 |
| stations | TransitStop[] | 是 | 途经站数组 |

**TransitStop 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| id | string | 是 | 站点ID |
| title | string | 是 | 站点名称 |
| location | LatLngObject | 是 | 站点坐标 |
| exit | TransitExit | 否 | 地铁出口信息 |

**TransitExit 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| id | string | 是 | 出口ID |
| title | string | 是 | 出口名称 |

**TransitStation 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| id | string | 是 | 站点ID |
| title | string | 是 | 站点名称 |

**TransitLocation 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| location | LatLngObject | 是 | 坐标 |

**LatLngObject 对象属性**

| 属性 | 类型 | 必填 | 说明 |
| :- | :- | :- | :- |
| lat | number | 是 | 纬度 |
| lng | number | 是 | 经度 |

</br>

(**a.公交同城路线说明：**)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;路线根据交通工具的不同划分路段，如下图：

![](http://p.qpic.cn/lbsconsole/0/21e6dc6e9175de59444e7d760e458da5/0 =630x103)

</br>

**响应结果示例**
``` javascript
 {
    "status":0,                                     //状态码，正常为0
    "message":"query ok",                           //状态说明
    "result":                                       //搜索结果
    {
        "routes":[                                  //路线方案
            //方案1*******************************************
            {
                "distance": 20123,                  //方案整体距离（米）
                "duration": 75,                     //方案估算时间（分钟）
                "duration_1m":75,
                "bounds": "40.014309000000004,116.285706,40.15301,116.318099",  //路线bounds，用于显示地图时使用
                "steps": [                          //具体方案，按交通工具的换乘分段
                    {
                        "mode": "WALKING",          //阶段路线交通方式（WALKING）
                        "tag": "INTERNAL",    //返回值仅支持INTERNAL，代表站内换乘
                        "distance": 760,            //阶段路线距离
                        "duration": 11,             //阶段路线估算时间
                        "direction": "东",          //阶段路线方向
                        "polyline": [40.014634, 116.312869, -135, 160, -90, 100, -40, 80,... ...], //阶段路线点串
                        "steps":                    //分段
                        [{
                            "instruction": "步行454米,左转进入中关村北大街",  //阶段路线描述
                            "polyline_idx": [0, 31],//在polyline位置
                            "road_name": "",        //路名
                            "dir_desc": "东南",     //方向
                            "distance": 454,        //距离
                            "act_desc": "左转"      //末尾动作
                        }]
                    },
                    {
                        "mode": "TRANSIT",
                        "lines": [                  //lines指同一段路，三种出行方式
                            {
                                "vehicle": "BUS",   //交通工具：公交车（BUS）
                                "id": "7225403257131337003",
                                "title": "717",     //公交名
                                "station_count": 7, //途径站数
                                "price": 2,         //票价
                                "destination":{
                                    "id":"5047847604295657152",
                                    "title":"地铁西二旗站"     //终点站
                                },
                                "start_time":"05:30",         //首班车时间
                                "end_time":"22:00",           //末班车时间
                                "distance": 4560,             //距离
                                "duration": 26,               //估算时间
                                "polyline": [40.016124, 116.317759, 423, -241, 321, -214, 410, -323, 378, ... ...],
                                "geton": {                    //上车站
                                    "id": "10640224892745223512",
                                    "title": "圆明园东门",     //上车站名
                                    "location": {             //上车站坐标
                                        "lat": 40.016124,     //纬度
                                        "lng": 116.317759     //经度
                                    }
                                },
                                "getoff": {                   //下车站
                                    "id": "5047847604295657152",
                                    "title": "地铁西二旗站",  //下车站名
                                    "location": {             //下车站坐标
                                        "lat": 40.053226,     //纬度
                                        "lng": 116.304718     //经度
                                    }
                                },
                                "stations": [                        //途经站
                                    {
                                        "id": "17005795237013591570",
                                        "title": "北京体育大学",      //途经站名
                                        "location": {                //途经站坐标
                                            "lat": 40.021902,        //纬度
                                            "lng": 116.314189        //经度
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
``` 

</br>

(**b.跨城说明：**)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;路线跨城支持城市间的铁路路线规划，如图（A城火车站）b - c（B城火车站） 路线规划方案； 市内路线（如图a - b或c - d）需要使用mode = TRANSIT_FOLDER节点进行二次查询得到。

![](http://p.qpic.cn/lbsconsole/0/02b1adaee24fdc95329a5f6cfc014a17/0 =613x100)

</br>

**响应结果示例**
``` javascript
{
    "status":0,                                                         //状态码，正常为0
    "message":"query ok",                                               //状态说明
    "result":                                                           //搜索结果
    {
        "routes":[                                                      //路线方案
            {
                "distance": 1337851,                                    //方案整体距离（米）
                "duration":288,                                         //方案估算时间（分钟）
                "bounds": "31.194238,116.378922,39.871814,121.320876",  //路线bounds，用于显示地图时使用
                "steps": [                                              //具体方案，按交通工具的换乘分段
                    {
                        "mode": "TRANSIT_FOLDER",                       //TRANSIT_FOLDER跨城公交
                        "distance": 4,                                  //阶段路线距离
                        "direction": "北",                              //阶段路线方向
                        "origin":{                                      //起点
                            "location":{                                //起点坐标
                                "lat":"39.864989",                    //纬度
                                "lng":"116.379009"                    //经度
                            }
                        },
                        "destination":{                                 //终点
                            "location":{                                //终点坐标
                                "lat":"39.865021",                    //纬度
                                "lng":"116.379019"                    //经度
                            }
                        }
                    },
                    {
                        "mode": "TRANSIT",
                        "lines": [
                            {
                                "vehicle": "RAIL",                      //交通工具：铁路（RAIL）
                                "id": "13995286317411406868",
                                "station_count": 2,                     //经过站数
                                "destination":{                         //目的地
                                    "id":"13136947784159182883",
                                    "title":"上海虹桥"
                                },
                                "distance": 1318000,                    //距离
                                "duration": 288,                        //估算时间
                                "polyline": [39.865021, 116.379019, 58, -97, 1676, 3233, 5059, 37384, -1061, ... ...],
                                "geton": {                              //本段上车站
                                    "id": "17252417566629421518",
                                    "title": "北京南",                   //上车站名
                                    "location": {                       //上车站坐标
                                        "lat": 39.865021,               //纬度
                                        "lng": 116.379019               //经度
                                    }
                                },
                                "getoff": {                             //本段下车站
                                    "id": "13136947784159182883",
                                    "title": "上海虹桥",                 //下车站名
                                    "location": {                       //下车站坐标
                                        "lat": 31.194238,               //纬度
                                        "lng": 121.320876               //经度
                                    }
                                },
                                "stations": [                           //途经站
                                    {
                                        "id": "17403057985479983304",
                                        "title": "德州东站",             //途经站名
                                        "location": {                   //途经站坐标
                                            "lat": 37.409700,           //纬度
                                            "lng": 116.462110           //经度
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}                  
```

</br>

## polyline 坐标解压
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;导航路线点串coors（注：coors为polyline的坐标串）使用前向差分进行压缩，使用时解压方法如下：

> var coors=[127.496637,50.243916,-345,-1828,19867,-26154];</br>
for (var i = 2; i < coors.length ; i++)</br>
{coors[i] = coors[i-2] + coors[i]/1000000}</br>

</br>

## 注意事项
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;起点、终点、途经点若不在道路上，会自动吸附到附近的道路上：

![](http://p.qpic.cn/lbsconsole/0/ff17d94176bb0d2b7160ef2e53c65bbe/0 =645x287)

</br>

&nbsp;&nbsp;&nbsp;&nbsp;**示例（以驾车路线规划为例）**

WXML 模板文件中添加组件：
``` html
<!--地图容器-->
  <map
    id="myMap"
    style="width: 100%; height: 300px;"
    longitude="{{longitude}}" 
    latitude="{{latitude}}"
    scale='16'
    polyline="{{polyline}}"
    show-location
  >
  </map>
  <form bindsubmit="formSubmit">
      <!--输入起点和目的地经纬度坐标，格式为string格式-->
      <!--起点输入框,同终点，不填默认当前位置-->
      <label>起点坐标：<input style="border:1px solid #000;" name="start"></input></label>
      <!--终点输入框,例：39.984060,116.307520-->
      <label>终点坐标：<input style="border:1px solid #000;" name="dest"></input></label> 
      <!--提交表单数据-->
      <button form-type="submit">路线规划</button>
  </form>
``` 

Javascript 关键代码片段(驾车、步行、骑行路线规划)：
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
    polyline:[], // 声明polyline，存储路线数据
    // 展示地图当前位置
    latitude: 39.908764,
    longitude: 116.397524
  },

  //触发表单提交事件，调用接口
  formSubmit(e) {
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行）
      //from参数不填默认当前地址
      from: e.detail.value.start,
      to: e.detail.value.dest, 
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        console.log(pl)
        //设置polyline属性，将路线显示出来
        _this.setData({
          latitude:pl[0].latitude,
          longitude:pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }]
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
})
``` 

Javascript 关键代码片段(公交路线规划，取第一条路线为示例)：
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
    polyline:[], // 声明polyline，存储路线数据
    latitude: 39.908764,
    longitude: 116.397524
  },
  //触发表单提交事件，调用接口
  formSubmit(e) {
    var _this = this;
    qqmapsdk.direction({
      mode: 'transit',//'transit'(公交路线规划)
      from: e.detail.value.start,
      to: e.detail.value.dest, 
      success: function (res) {
        console.log(res);
        var ret = res.result.routes[0];
        var count = ret.steps.length;
        var pl = [];
        var coors = [];
        //获取各个步骤的polyline
        for(var i = 0; i < count; i++) {
          if (ret.steps[i].mode == 'WALKING' && ret.steps[i].polyline) {
            coors.push(ret.steps[i].polyline);
          }
          if (ret.steps[i].mode == 'TRANSIT' && ret.steps[i].lines[0].polyline) {
            coors.push(ret.steps[i].lines[0].polyline);
          }
        }       
        //坐标解压
        var kr = 1000000;
        for (var i = 0 ; i < coors.length; i++){
          for (var j = 2; j < coors[i].length; j++) {
            coors[i][j] = Number(coors[i][j - 2]) + Number(coors[i][j]) / kr;
          }
        }
        //定义新数组，将coors中的数组合并为一个数组
        var coorsArr = [];
        for (var i = 0 ; i < coors.length; i ++){
          coorsArr = coorsArr.concat(coors[i]);
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coorsArr.length; i += 2) {
          pl.push({ latitude: coorsArr[i], longitude: coorsArr[i + 1] })
        }
        _this.setData({
          latitude:pl[0].latitude,
          longitude:pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }]
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
})
``` 

</br>

## 接口调用说明
&nbsp;&nbsp;&nbsp;&nbsp;路线规划调用接口服务如下：
- /ws/direction/v1/driving    路线规划:驾车
- /ws/direction/v1/walking    路线规划:步行
- /ws/direction/v1/transit    路线规划:公交
- /ws/direction/v1/bicycling    路线规划:自行车

注：微信小程序JavaScript SDK通过对腾讯位置服务WebServiceAPI接口进行封装而形成，因此和直接调用WebSerivceAPI的限制是等同的，<br>具体可参考：[腾讯位置服务WebServiceAPI配额及使用限制](https://lbs.qq.com/dev/console/quotaImprove)
