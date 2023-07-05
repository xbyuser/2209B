<template>
  <view class="cart-container" v-if="cart.length!==0">
    <!-- 收货地址 -->
    <my-address></my-address>
    <!-- 商品列表 -->
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <uni-swipe-action class="cart-goods-list">
      <block v-for="(goods,index) in cart" :key="index">
        <uni-swipe-action-item> 
          <my-goods :goods="goods" showRadio showNum @radioChange="radioChangeHandler" @numChange="numberChangeHandler"></my-goods>
          <template v-slot:right>
          	<view class="delete" @click="swipeItemClickHandler(goods)"><text >删除</text></view>
          </template>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <!-- 结算区 -->
    <my-settle></my-settle>
  </view>
  <!-- 空白购物车区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
  import badge from '@/mixins/tabbar-badge.js'
  import { mapState,mapMutations } from "vuex"
  
  export default {
    mixins:[badge],
    data() {
      return {
        options:[{
          text:'删除',
          style:{
            backgroundColor:'#c00000'
          }
        }]
      };
    },
    computed:{
      ...mapState('cart',['cart'])
    },
    methods:{
      ...mapMutations('cart',['updateGoodsStart','updateGoodsCount','removeGoodsId']),
      radioChangeHandler(e){
        this.updateGoodsStart(e)
      },
      numberChangeHandler(e){
        this.updateGoodsCount(e)
      },
      swipeItemClickHandler(goods){
        this.removeGoodsId(goods.goods_id)
      }
    }
  }
</script>

<style lang="scss">
.cart-title{
  height: 40px;
  display: flex;
  align-items: center;
  padding-right: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text{
    font-size: 14px;
  }
}
.delete{
  width: 72px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #c00000;
  color: #fff;
}
.cart-goods-list{
  padding-bottom: 50px;
}
.empty-cart{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  .empty-img{
    width: 90px;
    height: 90px;
  }
  .tip-text{
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
