<template>
  <view class="goods-item">
    <!-- 左侧 -->
    <view class="goods-item-left">
      <radio value="" :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"/>
      <image :src="goods.goods_small_logo||defaultPic" mode="" class="goods-pic"></image>
    </view>
    <!-- 右侧 -->
    <view class="goods-item-right">
      <view class="goods-name">
        {{goods.goods_name}}
      </view>
      <view class="goods-info-box">
        <view class="goods-price">
          ¥{{goods.goods_price|tofixed}}
        </view>
        <uni-number-box v-if="showNum" :value="goods.goods_count" @change="numChangeHandler" :min="1"/>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
      goods:{
        type:Object,
        default:()=>{}
      },
      showRadio:{
        type:Boolean,
        default:false
      },
      showNum:{
        type:Boolean,
        default:false
      },
    },
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        numberValue:1
      };
    },
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    },
    methods:{
      radioClickHandler(){
        this.$emit('radioChange',{
          goods_id:this.goods.goods_id,
          goods_state:!this.goods.goods_state
        })
      },
      numChangeHandler(value){
      this.$emit('numChange',{
         goods_id:this.goods.goods_id,
         goods_count:+value
      })
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
  // width: 750rpx;
  // box-sizing: border-box;
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0  ;
  .goods-item-left{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 5px;
    .goods-pic{
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name{
      font-size: 13px;
    }
    .goods-info-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-price{
        color: #c00000;
        font-size: 16px;
      }
    }
  }
}
</style>