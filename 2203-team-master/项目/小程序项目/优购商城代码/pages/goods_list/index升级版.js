//思路:1.获取url传过来的id，请求接口渲染数据。如何获取传过的参数？ 2.下拉刷新，在次请求接口。注意数据最好清空下，刷新后只展示第1页的内容3.上拉加载新的1页,页数加1，如果大于总页数，提醒用户到底了，否则在次请求数据

// pages/goods_list/index.js
import {request} from '../../request/http'
import {getShopLsit} from '../../request/api'
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
      //   },
    ],
    //价格列表
    priceList:[]
  },
  queryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  totalPage:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(48,options); //获取传过来的分类id
    let query=options.query?options.query:'服饰'
    // let cid=options.cid?options.cid:'5'
    this.queryParams.query=query
    // 走接口
    this.getGoodsList()
  
  },
  //获取数据渲染
 async getGoodsList(){
   console.log(56,'走了');
   let res=await getShopLsit(this.queryParams)
   console.log('51',res);
   if(res.meta.status==200){
       //获取下总页数=后端返回的总条数/每页展示的条数。JS获取数据对象里的原生方法Math方法
         this.totalPage=Math.ceil(res.message.total/this.queryParams.pagesize)
         let goodsList=res.message.goods 
         this.setData({
          goodsList:[...this.data.goodsList,...goodsList], //数据要合并，要看到前面的数据
          priceList:[...this.data.goodsList,...goodsList].sort((a,b)=>a.goods_price-b.goods_price) //价格升序排列渲染
        })
   }
  },

/**
   * 页面相关事件处理函数--监听用户下拉动作
   */
onPullDownRefresh:function(){
     console.log('下拉刷新了');
     this.getGoodsList()
},

/**
 * 页面上拉触底事件的处理函数-通过触发到底部钩子函数,判断是否到最后一页了,总页数？怎么求总页数？如果不是,就加载新的一页，如果是就提醒用户到最后一页
 */
  onReachBottom: function () {
       console.log('上拉加载到底部了');
       //总页数？=后端返回的总条数/每页展示的条数 
       if(this.queryParams.pagenum<this.totalPage){
            this.queryParams.pagenum++
            this.getGoodsList()
       }
      else{
            wx.showToast({
            title: '没商品了到底了',
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