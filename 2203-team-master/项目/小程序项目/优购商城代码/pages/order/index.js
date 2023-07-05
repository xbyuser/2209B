/* 展示对应的tab页面——总体思路:从跳转页面传过来索引，到tab绑定下索引，tab切换还要请求数据。日期处理，对原数据进行在次整理
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
    active:0,
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
  onLoad(options){
        console.log(options);
        let type=options.type||1
       this.getOrderList(type)
  },
  //渲染订单数据
  async getOrderList(type){
     let {message:res}=await request({url:'my/orders/all',data:{type}})
     console.log('订单数据',res.orders);
     //对日期进行处理下-对原数据进行处理
     res.orders.map(item=>{
    //    item.newtime=new Date(item.create_time*1000).toLocaleString()
          item.newtime=formatTimeTwo(item.create_time*1000,'Y/M/D h:m:s')
     })
     console.log('处理过的数据',res.orders);

     this.setData({
         active:type-1,
         orders:res.orders
     })
  },
  //tab改变事件
  tabsChange(e){
    console.log('事件对象',e);
    let {index}=e.detail
    this.getOrderList(index+1)   
  }
})