// pages/index2/index2.js
import {getSwiper} from '../../request/api' //导入网络请求方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"hello world",
    img:"/images/film.png",
    arr:['a','b','c'],
    list:{a:11,b:22,c:33},
    arrList: [ 
       { a: 44 },
       { a: 55 },
       { a: 66 },
      ],
   isLogin:true,
   item2:'小程序',
   num:0,
   show:false,
   id:'',
   dataId:'',
   value:'v-modal数据绑定',
  //  轮播图用
   background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
       //轮播数据
       swiperList: [
          {
              "image_src": "https://api-hmugo-web.itheima.net/pyg/banner1.png",
              "open_type": "navigate",
              "goods_id": 129,
              "navigator_url": "/pages/goods_detail/index?goods_id=129"
          },
          {
            "image_src": "https://api-hmugo-web.itheima.net/pyg/banner1.png",
            "open_type": "navigate",
            "goods_id": 129,
            "navigator_url": "/pages/goods_detail/index?goods_id=129"
         }
        ],
        // vant日期插件
        minHour: 10,
        maxHour: 20,
        minDate: new Date().getTime(),
        maxDate: new Date(2019, 10, 1).getTime(),
        currentDate: new Date().getTime(),
  },
  add(){
      this.data.num++
      console.log(24,this.data.num);
      this.setData({
        num:this.data.num
      })
  },
  go(){
      
      // wx.switchTab({
      //   url: '../test/test',
      // })
      wx.navigateTo({
        url: '../test2/test2?id=2',
      })
  },
  //通过事件,获取当前对象属性
  get(event){
    console.log('获取当前对象',event);
    let {id,dataset}=event.target
     console.log('id',id);
     this.setData({
        // id:id
        id,
        dataId:dataset.id
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
     //封装api-用async,await调用
      let res= await getSwiper()
      console.log(90,res);
      if(res.meta.status==200){
           this.setData({
               swiperList:res.message
           })
      }

      // 1.每一个都写网络请求，不好维护
      // wx.request({
      //   url: `https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata`,
      //   success:res=>{
      //       console.log('轮播数据',res);
      //       let {data}=res
      //       if(data.meta.status==200){
      //         console.log(95,data.message);
      //           // this.data.swiperList=data.message
      //           this.setData({
      //             swiperList:data.message
      //           })
      //       }
      //   }
      // })
      // 2.调用公共网络请求方法
      //  http('public/v1/home/swiperdata',{method:'get',data:{}}).then(res=>{
      //     console.log('107轮播数据',res);
      //     let {data}=res
      //     if(data.meta.status==200){
      //       console.log(95,data.message);
      //         // this.data.swiperList=data.message
      //         this.setData({
      //           swiperList:data.message
      //         })
      //     }
      //  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})