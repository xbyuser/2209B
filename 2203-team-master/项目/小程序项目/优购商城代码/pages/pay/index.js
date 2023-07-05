/* 
1 页面加载的时候
  1 从缓存中获取购物车数据 渲染到页面中
    这些数据  checked=true    arr.filter(item=>item.checked==true)
2 微信支付
  1 哪些人 哪些帐号 可以实现微信支付
    1 企业帐号 
    2 企业帐号的小程序后台中 必须 给开发者 添加上白名单 
      1 一个 appid 可以同时绑定多个开发者
      2 这些开发者就可以公用这个appid 和 它的开发权限  
3 支付按钮
  1 先判断缓存中有没有token
  2 没有 跳转到授权页面 进行获取token 
  3 有token,进行下面操作
  4 创建订单 获取订单编号
  5 已经完成了微信支付
  6 手动删除缓存中 已经被选中了的商品 
  7 删除后的购物车数据 填充回缓存
  8 再跳转页面 
 */
import {
    getSetting,
    chooseAddress,
    openSetting,
    showModal,
    showToast,
    requestPayment
} from "../../utils/asyncWx.js";
import {
    request
} from "../../request/http";
Page({
    data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0
    },

    onShow() {
        //0.渲染选中的数据
        let cart=wx.getStorageSync('cart')
        let address=wx.getStorageSync('address')
        cart=cart.filter(item=>item.checked==true)
        //reduce求和
        // let totalPrice=cart.reduce((prev,cur)=>{
        //       return prev+=(cur.goods_price*cur.num)
        // },0)
        let totalPrice=0
        cart.forEach(item=>{
            totalPrice+=(item.goods_price*item.num)
        })
        this.setData({
            address,
            cart,
            totalPrice
        })
    },
    // 点击 支付 
    async handleOrderPay() {
     //1.判断有没有token
     let token=wx.getStorageSync('token')
     if(!token){
            wx.navigateTo({
              url: '/pages/auth/index',
            })
        return false
     }
     //2.有token话-走创建订单接口-  创建订单,要传参-订单总价,收货地址,所有要支付的商品信息
     let arr=[ ]
    this.data.cart.forEach(item=>{
        arr.push({
            "goods_id": item.goods_id,
            "goods_number": item.num,
            "goods_price": item.goods_price
          })
     })
    
     request({url:'my/orders/create',method:'post',data:{
        "order_price": this.data.totalPrice,
        "consignee_addr": this.data.address.all,
        "goods":arr
    }}).then(res=>{
          console.log('创建成功',res);
          let {order_number}=res.message
          //3.传入订单编号，生成预支付订单
          request({url:'my/orders/req_unifiedorder',method:'post',data:{
            order_number
        }}).then(res1=>{
              console.log('预支付成功',res1);
              let {pay}=res1.message
              //4.拉起微信的支付窗口，如果有权限就弹出支付二维码，等待用户支付
              wx.requestPayment({
                // timeStamp: '',
                // nonceStr: '',
                // package: '',
                // signType: 'MD5',
                // paySign: '',
                ...pay,
                success (res2) {
                     console.log('拉起支付成功',res2);
                 },
                fail (err2) { 
                    console.log('拉起支付失败',err2);   

                }
              })
              //5.查询订单支付状态，提醒用户是否支付成功
              request({url:'my/orders/chkOrder',method:'post',data:{order_number}}).then(res3=>{
                      console.log('订单状态',res3);
                      wx.showToast({
                        title: res3.meta.msg,
                      })
                      wx.navigateTo({
                        url: '/pages/order/index',
                      })
              })
    
        })



    })
     //3.1 在第三方支付的服务器上,生成预支付订单
     //4.拉起微信的支付窗口，如果有权限就弹出支付二维码，等待用户支付
    //5.查询订单支付状态，提醒用户是否支付成功
    }

})