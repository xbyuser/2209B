<template>
  <view class="my-settel-container">
    <label class="radio" @click="changeAllState">
      <radio color="#c00000" :checked="isFullCheck" />
      <text>全选</text>
    </label>
    <view class="amount-box">
      合计：<text class="amount">¥{{checkedGoodsAmount}}</text>
    </view>
    <view class="btn-settel" @click="settlement">
      结算({{checkedCount}})
    </view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations,mapState} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        seconds:3,
        timer:null
      };
    },
    computed:{
      ...mapGetters('cart',['checkedCount','total','checkedGoodsAmount']),
      ...mapGetters('user',['addstr']),
      ...mapState('user',['token']),
      ...mapState('cart',['cart']),
      isFullCheck(){
        return this.total===this.checkedCount
      }
    },
    methods:{
      ...mapMutations('cart',['updateAllGoodsState']),
      ...mapMutations('user',['updateRedirectInfo']),
      changeAllState(){
        this.updateAllGoodsState(!this.isFullCheck)
      },
      // 点击了结算按钮
      settlement(){
        if(!this.checkedCount)return uni.$showMsg('请选择结算的商品!')
        if(!this.addstr)return uni.$showMsg('请选择收货地址!')
        if(!this.token)return this.delayNavigate()
        // 实现微信支付
        this.payOrder()
      },
      async payOrder(){ //微信支付
        // 1. 创建订单
          // 1.1 组织订单的信息对象
          const orderInfo = {
            // 开发期间，注释掉真实的订单价格，
            // order_price: this.checkedGoodsAmount,
            // 写死订单总价为 1 分钱
            order_price: 0.01,
            consignee_addr: this.addstr,
            goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
          }
          // 1.2 发起请求创建订单
          const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
          if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
          // 1.3 得到服务器响应的“订单编号”
          const orderNumber = res.message.order_number
        // 2. 订单预支付
          // 2.1 发起请求获取订单的支付信息
          const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
          // 2.2 预付订单生成失败
          // if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
		  uni.$showMsg('预支付订单生成成功')
          // 2.3 得到订单支付相关的必要参数
          const payInfo = res2.message.pay
        // 3. 发起微信支付
           // 3.1 调用 uni.requestPayment() 发起微信支付
          const [err, succ] = await uni.requestPayment(payInfo)
           // 3.2 未完成支付
		   console.log('账号没权限',err);
          // if (err)  return uni.$showMsg('订单未支付！')
           // 3.3 完成了支付，进一步查询支付的结果
          const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
           // 3.4 检测到订单未支付
          // if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
           // 3.5 检测到订单支付完成
          uni.showToast({
            title: '支付完成！',
            icon: 'success'
          })
		  //跳转到订单中心
		  setTimeout(()=>{
			  uni.navigateTo({
			                url: '/pages/order/order',
			              })  
		  },2000)
		 
      },
      showTips(n){
        uni.showToast({
          title:`请登录后再结算,${n}秒后自动跳转到登录页!`,
          icon:'none',
          duration:2000,
          mask:true //为页面添加透明遮罩,防止点击穿透
        })
      },
      delayNavigate(){
        this.seconds=3
        this.showTips(this.seconds)
        this.timer=setInterval(()=>{
          this.seconds--
          if(this.seconds<0){
            clearInterval(this.timer)
            uni.switchTab({
              url:'/pages/my/my',
              success:()=> {
                this.updateRedirectInfo({
                  openType:'switchTab',
                  from:'/pages/cart/cart'
                })
              }
            })
            return 
          }
          this.showTips(this.seconds)
        },1000)
      }
    },
    beforeDestroy(){
      this.timer=null
      
    }
  }
</script>

<style lang="scss">
.my-settel-container{
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  display:flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  background-color: #fff;
  .radio{
    display: flex;
    align-items: center;
  }
  .amount{
    color: #c00000;
    font-weight: bold;
  }
  .btn-settel{
    background-color: #c00000;
    height: 50px;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
    min-width: 100px;
  }
}
</style>