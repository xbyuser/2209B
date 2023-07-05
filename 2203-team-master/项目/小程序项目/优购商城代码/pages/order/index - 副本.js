/* 展示对应的tab页面——从跳转页面传过来索引，到tab绑定下激活
1 页面被打开的时候 onShow 
  0 onShow 不同于onLoad 无法在形参上接收 options参数 
  0.5 判断缓存中有没有token 
    1 没有 直接跳转到授权页面
    2 有 直接往下进行 
  1 获取url上的参数type
  2 根据type来决定页面标题的数组元素 哪个被激活选中 
  2 根据type 去发送请求获取订单数据
  3 渲染页面
2 点击不同的标题 重新发送请求来获取和渲染数据 
 */

import { request } from "../../request/http.js";
import { formatTimeTwo } from "../../utils/asyncWx.js"; //日期处理方法

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:1,
    orders: [],
    tabs: [
      {
        id: 0,
        value: "全部",
      },
      {
        id: 1,
        value: "待付款"
      },
      {
        id: 2,
        value: "待收货"
      },
      {
        id: 3,
        value: "退款/退货"
      }
    ]
  },
  //用getCurrentPages()获取当前页面信息[路由信息也能拿到]，也可以实现页面传值
  // onShow(options) {
  //   const token = wx.getStorageSync("token");
  //   if (!token) {
  //     wx.navigateTo({
  //       url: '/pages/auth/index'
  //     });
  //     return;
  //   }

  //   // 1 获取当前的小程序的页面栈-数组 长度最大是10页面 
  //   let pages = getCurrentPages();
  //   console.log('当前页面信息',pages);
  //   // 2 数组中 索引最大的页面就是当前页面
  //   let currentPage = pages[pages.length - 1];
  //   // 3 获取url上的type参数
  //   const { type } = currentPage.options;
  //   // 4 激活选中页面标题 当 type=1 index=0 
  //   this.setData({
  //     active:type-1
  //   })
  //   this.getOrders(type);
  // },

  //通过onload参数,实现页面传值
  onLoad(options){
    //判断token
     const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    console.log('页面加载时信息',options);
     // 4 激活选中页面标题 当 type=1 index=0 
     let type=Number(options.type)
     this.setData({
       active:type-1
     })
    
     this.getOrders(type);
  },
  // 获取订单列表
  async getOrders(type) {

    const {message:res} = await request({ url: "my/orders/all", data: { type } });
     console.log('订单列表',res);
    //日期处理方法1——调用日期本地转换方法,给原始数据，增加日期处理属性
    this.setData({
      orders: res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
     
    //日期处理方法2
    //  this.setData({
    //   orders: res.orders.map(v=>({...v,create_time_cn:(formatTimeTwo(v.create_time*1000,'Y/M/D h:m:s'))}))
    // })
  },
 //tab切换时调用——索引是从0开始的
  tabsChange(e) {
    // 1 获取被点击的标题索引
    console.log('获取索引',e);
    const { index } = e.detail;
    // 2 重新发送请求 type=1 index=0
    this.getOrders(index+1);
  }
})