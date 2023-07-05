//思路:1.获取url传过来的id，请求接口渲染数据。如何获取传过的参数？ 2.下拉刷新，在次请求接口。注意数据最好清空下，刷新后只展示第1页的内容3.上拉加载新的1页,页数加1，如果大于总页数，提醒用户到底了，否则在次请求数据

// pages/goods_list/index.js
import {request} from '../../request/http'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    //商品列表
    goodsList:[
      // {
      //   "goods_id": 57444,
      //   "cat_id": 9,
      //   "goods_name": "创维（Skyworth）42X6 42英寸10核智能酷开网络平板液晶电视（黑色）",
      //   "goods_price": 1899,
      //   "goods_number": 100,
      //   "goods_weight": 100,
      //   "goods_big_logo": "http://image2.suning.cn/uimg/b2c/newcatentries/0070078057-000000000634917020_1_800x800.jpg",
      //   "goods_small_logo": "http://image2.suning.cn/uimg/b2c/newcatentries/0070078057-000000000634917020_1_400x400.jpg",
      //   "add_time": 1516663280,
      //   "upd_time": 1516663280,
      //   "hot_mumber": 0,
      //   "is_promote": false,
      //   "cat_one_id": 1,
      //   "cat_two_id": 3,
      //   "cat_three_id": 9
      // },
    ],
     
  },
   // 接口要的参数
   QueryParams:{
      query:'服饰', //搜索关键字
      cid:'', //分类id
      pagenum:1, //第几页
      pagesize:10 //1页几条
  },
  // 总页数
  totalPages:5,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(48,options); //获取传过来的分类id
    this.QueryParams.query=options.query||'服饰';
    // 走接口
    this.getGoodsList()

},
  //获取数据渲染-vue中get传参({url:url,params:{}})  post传参({url:url,data:{}})  
 async getGoodsList(){
      let res=await  request({url:'goods/search',data:this.QueryParams})
      console.log('商品列表',res);
        //求总页数
        //js中原生Math对象
        // console.log(Math.random(),Math.ceil(1.3),Math.floor(1.6));
      this.totalPages= Math.ceil(res.message.total/10) 

      this.setData({
           //请求最新数据，导致上一页数据看不到
          // goodsList:res.message.goods
          //解决-把当前数据，跟上次数据合并 let a=[1],b=[2]; let c=[...a,...b]
          goodsList:[...this.data.goodsList,...res.message.goods]
      })


  },

/**
   * 页面相关事件处理函数--监听用户下拉动作
   */
onPullDownRefresh:function(){
     console.log('下拉刷新了');
     this.QueryParams.pagenum=1
     this.getGoodsList()
},

/**
 * 页面上拉触底事件的处理函数-通过触发到底部钩子函数,判断是否到最后一页了,总页数？怎么求总页数？如果不是,就加载新的一页，如果是就提醒用户到最后一页
 */
  onReachBottom: function () {
       console.log('上拉加载到底部了');
       //当前页数<总页数，让当前页数++
       if(this.QueryParams.pagenum< this.totalPages ){
          this.QueryParams.pagenum++
          this.getGoodsList()
       }
       else{
            wx.showToast({
              title: '到最后一页了',
            })
       }


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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})