// pages/goods_detail/index.js
//点击 加入购物车思路:
//   2 获取缓存中的购物车数据-数组格式 
//   3 判断 当前的商品是否已经存在于 购物车-判断当前商品id是否在本地缓存存在
//   4 已经存在 执行购物车数量++ 重新把购物车数组 填充回缓存中
//   5 不存在于购物车的数组中  给当前商品增加数量属性 num  ，是否选中属性checked,在渲染购物车时使用
//   6 弹出提示-提醒用户加入成功

import {request} from '../request/http'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //详情列表
    goodsObj:  {
      "goods_id": 43985,
      "cat_id": 5,
      "goods_name": "海信(Hisense)LED50MU8600UC 50英寸 4K超高清智能电视 HDR超薄曲面",
      "goods_price": 6809,
      "goods_number": 100,
      "goods_weight": 100,
      "goods_introduce": "<div class=\"lazyimg\"><div moduleid=\"R0503002_2\" modulename=\"关联推荐\"><p><img data-src=\"//image.suning.cn/uimg/sop/commodity/297472958116848970954760_x.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" src=\"//image.suning.cn/uimg/sop/commodity/297472958116848970954760_x.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\"></p></div><div moduleid=\"R0503002_3\" modulename=\"商品详情\"><p><img data-src=\"//image.suning.cn/uimg/sop/commodity/297472958116848970954760_x.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" src=\"//image.suning.cn/uimg/sop/commodity/297472958116848970954760_x.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\"></p></div><div moduleid=\"R0503002_6\" modulename=\"安装说明\"><table style=\"width: 100%; height: auto;\">\n<tbody>\n<tr>\n<td><a href=\"https://sale.suning.com/shfw/cdaz/index.html#suning\" target=\"_blank\"><img data-src=\"https://sale.suning.com/shfw/cdazpic/images/all.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" src=\"https://sale.suning.com/shfw/cdazpic/images/all.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\"></a></td>\n</tr>\n</tbody>\n</table></div></div>",
      "goods_big_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_1_800x800.jpg",
      "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_1_400x400.jpg",
      "goods_state": 2,
      "is_del": "0",
      "add_time": 1516509864,
      "upd_time": 1516509864,
      "delete_time": null,
      "hot_mumber": 0,
      "is_promote": false,
      "cat_one_id": 1,
      "cat_two_id": 3,
      "cat_three_id": 5,
      "goods_cat": "1,3,5",
      "pics": [
      {
      "pics_id": 180132,
      "goods_id": 43985,
      "pics_big": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_1_800x800.jpg",
      "pics_mid": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_1_400x400.jpg",
      "pics_sma": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_1_200x200.jpg",
      "pics_big_url": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_1_800x800.jpg",
      "pics_mid_url": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_1_400x400.jpg",
      "pics_sma_url": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_1_200x200.jpg"
      },
      {
      "pics_id": 180133,
      "goods_id": 43985,
      "pics_big": "http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_2_800x800.jpg",
      "pics_mid": "http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_2_400x400.jpg",
      "pics_sma": "http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_2_200x200.jpg",
      "pics_big_url": "http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_2_800x800.jpg",
      "pics_mid_url": "http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_2_400x400.jpg",
      "pics_sma_url": "http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_2_200x200.jpg"
      },
      {
      "pics_id": 180134,
      "goods_id": 43985,
      "pics_big": "http://image3.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_3_800x800.jpg",
      "pics_mid": "http://image3.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_3_400x400.jpg",
      "pics_sma": "http://image3.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_3_200x200.jpg",
      "pics_big_url": "http://image3.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_3_800x800.jpg",
      "pics_mid_url": "http://image3.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_3_400x400.jpg",
      "pics_sma_url": "http://image3.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_3_200x200.jpg"
      },
      {
      "pics_id": 180135,
      "goods_id": 43985,
      "pics_big": "http://image2.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_4_800x800.jpg",
      "pics_mid": "http://image2.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_4_400x400.jpg",
      "pics_sma": "http://image2.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_4_200x200.jpg",
      "pics_big_url": "http://image2.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_4_800x800.jpg",
      "pics_mid_url": "http://image2.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_4_400x400.jpg",
      "pics_sma_url": "http://image2.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_4_200x200.jpg"
      },
      {
      "pics_id": 180136,
      "goods_id": 43985,
      "pics_big": "http://image1.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_5_800x800.jpg",
      "pics_mid": "http://image1.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_5_400x400.jpg",
      "pics_sma": "http://image1.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_5_200x200.jpg",
      "pics_big_url": "http://image1.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_5_800x800.jpg",
      "pics_mid_url": "http://image1.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_5_400x400.jpg",
      "pics_sma_url": "http://image1.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_5_200x200.jpg"
      }
      ],
      "attrs": []
      },
    // 商品是否被收藏
    isCollect:false,
    // goodsCart:{}, //购物车信息,
    goodsId:''
  },
  //加入购物车-把当前商品信息存入本地
  handleCartAdd(){
      let cart= wx.getStorageSync('cart')||[]
      let index=cart.findIndex(item => item.goods_id==this.data.goodsId )
      console.log(index);
      //如果找不到，给对象增加属性-用于购物车数据渲染时用
      if(index==-1){
        this.data.goodsObj.num=1
         this.data.goodsObj.checked=true
         cart.push(this.data.goodsObj)
      }
      //除非找到,只给当前信息增加数量
      else{
        cart[index].num++
      }
      
      wx.setStorageSync('cart', cart)
      //弹窗提示
      wx.showToast({
        title: '加入成功',
        icon:'success',
        mask:true  //显示透明蒙层，防止触摸穿透
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
       console.log(15,options);
       let id=options.goods_id || 43895 //有就获取,没有就默认
       this.data.goodsId=id
       let {message:res}=await request({url:`goods/detail?goods_id=${id}`})
       console.log('商品详情数据',res);
       //存储下当前商品信息
       this.setData({
         goodsObj:res
       })
      
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