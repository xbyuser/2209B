
//购物车实现思路
//一. onShow页面显示时就执行
//   0 回到了商品详情页面 第一次添加商品的时候 手动添加了属性
//     1 num=1;
//     2 checked=true;
//   1 获取缓存中的购物车数组
//   2 把购物车数据 填充到data中

//二. 全选的实现 数据的展示
//   1 onShow 获取缓存中的购物车数组
//   2 根据购物车中的商品数据 所有的商品都被选中 checked=true  全选就被选中

// 三. 总价格和总数量
//   1 都需要商品被选中 我们才拿它来计算
//   2 获取购物车数组
//   3 遍历
//   4 判断商品是否被选中
//   5 总价格 += 商品的单价 * 商品的数量
//   5 总数量 +=商品的数量
//   6 把计算后的价格和数量 设置回data中即可

// 四. 商品的选中
//   1 绑定change事件
//   2 获取到被修改的商品对象
//   3 商品对象的选中状态 取反
//   4 重新填充回data中和缓存中
//   5 重新计算全选。总价格 总数量。。。

//五. 全选和反选
//   1 全选复选框绑定事件 change
//   2 获取 data中的全选变量 allChecked
//   3 直接取反 allChecked=!allChecked
//   4 遍历购物车数组 让里面 商品 选中状态跟随  allChecked 改变而改变
//   5 把购物车数组 和 allChecked 重新设置回data 把购物车重新设置回 缓存中 

// 六. 商品数量的编辑
//   1 "+" "-" 按钮 绑定不同事件，怎么 区分哪个商品,可绑定自定义属性-当前索引值
//   2 拿到索引值，操作购物车数组，进行++，--
//   3 当 用户 点击 "-"，购物车的数量 =1 时
//     弹窗提示(showModal) 询问用户 是否要删除
//     1 确定 直接执行删除
//     2 取消  什么都不做 
//   4 直接修改商品对象的数量 num
//   5 把cart数组 重新设置回 缓存中 和data中 this.setCart

// 七. 获取用户的收货地址
//   1 绑定点击事件
//   2 调用小程序内置 api  获取用户的收货地址  wx.chooseAddress

//   2 获取 用户 对小程序 所授予 获取地址的  权限 状态 scope
//     1 假设 用户 点击获取收货地址的提示框 确定  authSetting scope.address 
//       scope 值 true 直接调用 获取收货地址
//     2 假设 用户 从来没有调用过 收货地址的api 
//       scope undefined 直接调用 获取收货地址
//     3 假设 用户 点击获取收货地址的提示框 取消   
//       scope 值 false 
//       1 诱导用户 自己 打开 授权设置页面(wx.openSetting) 当用户重新给与 获取地址权限的时候 
//       2 获取收货地址
//     4 把获取到的收货地址 存入到 本地存储中 
import { getSetting, chooseAddress, openSetting, showModal ,showToast} from "../../utils/asyncWx.js";  //调用公式方法

Page({
  data: {
    cart:[],
    allChecked: false,//全选
    totalPrice: 0, //总价
    totalNum: 0,
    address:{} //存储收货地址
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onshow执行');
    // 1 获取缓存中的购物车数据-页面显示时，数据就要更新,状态就要改变
    let cart = wx.getStorageSync("cart") || [];
    this.setCart(cart);

    //2.获取下收货地址-进入页面就显示
    let address= wx.getStorageSync('address', address)
     this.setData({address})
  },
  //增加
  add(e){
        console.log(e);
        let index=e.currentTarget.dataset.index
        let {cart}=this.data
        cart[index].num++
        this.setCart(cart)
  },
   //减少
   minus(e){
    console.log(e);
    let index=e.currentTarget.dataset.index
    let {cart}=this.data
    if(cart[index].num>1){
        cart[index].num--
      }
      else{
          return false
      }
    this.setCart(cart)

},
  //单选-改变时，选中的会计算价格
  handeItemChange(e){
    let index=e.currentTarget.dataset.index
    let {cart}=this.data
    cart[index].checked=!cart[index].checked
    
    this.setCart(cart)
    
  },
    //全选-取反，同时修改数据中每个单选的选中状态
  handleItemAllCheck() {
     let {cart,allChecked}=this.data
     allChecked=!allChecked
     cart.forEach(item=>{
         item.checked=allChecked
     }) 
     this.setCart(cart)
  },
   // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
   setCart(cart) {
      //价格计算
       let totalPrice=0,totalNum=0,allChecked=true
      //单选关联全选-当判断单选时，也要设置全选的状态
      cart.forEach(item=>{
        if(item.checked==true){
         totalPrice+=item.num*item.goods_price  
         totalNum+=item.num
        }
        else{
          allChecked=false
        }
      })
      if(cart.length==0){
        allChecked=false
      }
      this.setData({
        cart,totalPrice,allChecked,totalNum
      })
      wx.setStorageSync('cart', cart)
  
    },
    //获取收获地址-这里调用了微信的开放能力。先判断是否有权限，在获取相关操作
  async  handleChooseAddress(){
    //有未预估到的错误时，可加try catch捕获下错误
    try {
      let res=await getSetting()
      console.log('开放能力',res);
      //如果微信对你开放了此能力,在调用收货地址
      if(res.authSetting["scope.address"]==true){
         let address=await chooseAddress()
         console.log('收获地址',address);
         address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
         wx.setStorageSync('address', address)
      }
    } catch (error) {
       console.log(error);
    }
      
    },
  //点击结算-判断收货地址是否有值,购物车是否有值
 async handlePay(){
     // 1 判断收货地址
    const {address,totalNum}=this.data;
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"});
      return;
    }
    // 2 判断用户有没有选购商品
    if(totalNum===0){
      await showToast({title:"您还没有选购商品"});
      return ;
    }
    // 3 跳转到 支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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