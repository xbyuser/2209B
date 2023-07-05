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
import {
    getSetting,
    chooseAddress,
    openSetting,
    showModal,
    showToast
} from "../../utils/asyncWx.js"; //调用公式方法

Page({
    data: {
        cart: [
        //     {
        //     "goods_id": 55882,
        //     "cat_id": 959,
        //     "goods_name": "潮路思2016年冬季新款爆款棉拖鞋月子可爱布艺家居地板保暖 男女棉拖622",
        //     "goods_price": 14,
        //     "goods_number": 100,
        //     "goods_weight": 100,
        //     "goods_big_logo": "http://image2.suning.cn/uimg/b2c/newcatentries/0070137264-000000000170759033_2_800x800.jpg",
        //     "goods_small_logo": "http://image2.suning.cn/uimg/b2c/newcatentries/0070137264-000000000170759033_2_400x400.jpg",
        //     "goods_state": 2,
        //     "is_del": "0",
        //     "add_time": 1516656921,
        //     "upd_time": 1516656921,
        //     "delete_time": null,
        //     "hot_mumber": 0,
        //     "is_promote": false,
        //     "cat_one_id": 948,
        //     "cat_two_id": 951,
        //     "cat_three_id": 959,
        //     "goods_cat": "948,951,959",
        //     "num": 1,
        //     "checked": true
        //    }
    ],
        allChecked: false, //全选
        totalPrice: 0, //总价=单价*数量
        totalNum: 0,
        address: {} //存储收货地址
    },
           /**
     * 生命周期函数--页面切换时就执行
     */
    onShow: function () {
       //获取购物车并计算和收货地址 
      let cart= wx.getStorageSync('cart')||[]
    //    console.log(129,cart);
         //调用公用方法
        this.setCart(cart)
       //获取收货地址
       let address= wx.getStorageSync('address')
        this.setData({
            address
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //增加
    add(e) {
        // console.log(113, e);  
        let index=e.currentTarget.dataset.index
        let {cart,totalPrice,allChecked}=this.data
        cart[index].num++
         //调用公用方法
         this.setCart(cart)
    },
    //减少-点击减时，小于1时，弹出确认框，确定后删除当前行
     minus(e) {
        // console.log(113, e);  
        let index=e.currentTarget.dataset.index
        let {cart,totalPrice,allChecked}=this.data
        //1.取反
        if(cart[index].num>1){
            cart[index].num--
        }
        else{
            return false
        }
       //调用公用方法
       this.setCart(cart)

    },
    //单选-改变数据里面的checked取反，同时选中的会计算价格
    handeItemChange(e) {
        console.log(116, e);
        let index=e.currentTarget.dataset.index
        let {cart}=this.data
        //1.取反
        cart[index].checked=!cart[index].checked
        //调用公用方法
        this.setCart(cart)

    },
    //全选-全选取反，同时修改数据中每个单选的选中状态。让所有单选跟全选状态一样。
    handleItemAllCheck() {
        let {cart,totalPrice,allChecked}=this.data
        allChecked=!allChecked
        cart.forEach(item=>{
             item.checked=allChecked
        })
       this.setCart(cart)

    },
    // 购物车公用方法-+，-，单选事件都会触发计算总价，全选
    setCart(cart) {
        let totalPrice=0,allChecked=true;
        //如果所有单选都选中，就全选，除非有一个，全选就不选中。计算总价方法是全局变量
        cart.forEach(item=>{
            //已经勾选的计算总价
           if(item.checked==true){
              totalPrice+=(item.goods_price*item.num)
           }
           else{
              allChecked=false  
           }
        })
       this.setData({
          cart,
          totalPrice,
          allChecked
       })
       wx.setStorageSync('cart', cart)
    },
    //获取收获地址-这里调用了微信的开放能力。先判断是否有权限，在获取相关操作。
    // ！！！注意，因为现在这个微信的开放能力得申请权限,有的申请不下来,麻烦。在公司可以自己单独写收货的页面配合公司自己的的接口。
    // handleChooseAddress2() {
    //     let that = this
    //     //1.看用户有这个权限没
    //     wx.getSetting({
    //         success(res) {
    //             console.log('授权信息', res)
    //             console.log(174, res.authSetting['scope.address']);
    //             //2.在具体调用相关方法获取开放对应开放能力
    //             if (res.authSetting['scope.address']) {
    //                 wx.chooseAddress({
    //                     success(res1) {
    //                         console.log('收获地址', res1)
    //                         let address = {};
    //                         address.all = res1.provinceName + res1.cityName + res1.countyName + res1.detailInfo
    //                         address.telNumber = res1.telNumber
    //                         address.userName = res1.userName
    //                         wx.setStorageSync('address', address)
    //                         that.setData({
    //                             address
    //                         })
    //                     }
    //                 })
    //             }
    //         }
    //     })

    // },
    //咱们这里自己写死的收货地址
    handleChooseAddress2() {
        let address = {};
        address.all = '北京市海淀区清华大学2号楼'
        address.telNumber = '13466688888'
        address.userName = '哈哈'
        wx.setStorageSync('address', address)
        this.setData({
            address
        })
    },
    //点击结算-判断收货地址是否有值,购物车是否有值
    async handlePay() {
        // 1 判断收货地址
        const {
            address,
            totalPrice
        } = this.data;
        if (!address.userName) {
            wx.showToast({
                title: '您还没有选择收货地址',
            })
            //可以把公共常用的方法，提炼出去，用promise封装下
            // await showToast({title:"您还没有选择收货地址"});
            return;
        }
        // 2 判断用户有没有选购商品
        if (totalPrice === 0) {
            await showToast({
                title: "您还没有选购商品"
            });
            return;
        }
        // 3 跳转到 支付页面
        wx.navigateTo({
          url: '/pages/pay/index',
        })
    },
 

})