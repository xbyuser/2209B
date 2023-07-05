// pages/map/index.js
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
 
    onLoad: function () {
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: 'POABZ-A3H32-HBQUG-C4UUW-5ZKPV-RMFOE'
        });
    },
    nearby_search:function(){
        var _this = this;
        // 调用接口
        qqmapsdk.search({
           keyword: '医院',  //搜索关键词
           location: '40.008697,116.283993',  //设置周边搜索中心点
           success: function (res) { //搜索成功后的回调
            console.log('周边医院',res);
             var mks = []
             for (var i = 0; i < res.data.length; i++) {
               mks.push({ // 获取返回结果，放到mks数组中
                 title: res.data[i].title,
                 id: res.data[i].id,
                 latitude: res.data[i].location.lat,
                 longitude: res.data[i].location.lng,
                 iconPath: "/icons/home-o.png", //图标路径
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
            //  console.log(res);
           }
       });
     }
})