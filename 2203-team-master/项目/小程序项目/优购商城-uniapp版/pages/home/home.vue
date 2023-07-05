<template>
  <view>
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <swiper autoplay indicator-dots circular interval="2000">
      <swiper-item v-for="(item ,index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
         <image :src="item.image_src" mode="" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
      <view class="floor-list">
        <view class="floor-item" v-for="(item,index) in floorList" :key="index">
          <image :src="item.floor_title.image_src" mode="" class="floor-title"></image>
          <!-- 图片区域 -->
          <view class="floor-img-box">
            <!-- 左侧 -->
            <navigator class="lift-img-box" :url="item.product_list[0].url">
              <image :src="item.product_list[0].image_src" mode="widthFix" :style="{width:item.product_list[0].image_width+'rpx'}"></image>
            </navigator>
            <!-- 右侧 -->
            <view class="right-img-box">
              <navigator class="right-img-item" :url="item2.url" v-for="(item2,index2) in item.product_list" :key="index2" v-if="index2!==0">
                <image :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width+'rpx'}"></image>
              </navigator>
            </view>
          </view>
        </view>
        
      </view>
    
  </view>
</template>

<script>
  import badge from '@/mixins/tabbar-badge.js'
  export default {
    mixins:[badge],
    data() {
      return {
        swiperList:[],
        navList:[],
        floorList:[]
      };
    },
    onLoad() {
	  console.log('测试console');
      this.getSwiperList(),
      this.getNavList(),
      this.getFloorList()
    },
    methods:{
      // 获取轮播图数据
      async getSwiperList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
        if(res.meta.status!==200){
          return uni.$showMsg()
        }
        this.swiperList=res.message
        uni.$showMsg('数据请求成功!')
      },
      //  获取分类导航数据
      async getNavList(){
        const {data:res}=await uni.$http.get('/api/public/v1/home/catitems')
        if(res.meta.status!==200){
          return uni.$showMsg()
        }
        this.navList=res.message
        uni.$showMsg('数据请求成功!')
      },
      navClickHandler(item){
        if(item.name==='分类'){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      },
      // 获取楼层数据
      async getFloorList(){
        const {data:res}=await uni.$http.get('/api/public/v1/home/floordata')
        if(res.meta.status!==200){
          return uni.$showMsg()
        }
        res.message.forEach(floor=>{
          floor.product_list.forEach(prod=>{
            prod.url='/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
          })
        })
        this.floorList=res.message
        uni.$showMsg('数据请求成功!')
      },
      gotoSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
swiper{
  height: 330rpx;
  .swiper-item,image{
    width: 100%;
    height: 100%;
  }
}
.nav-list{
  display: flex;
  justify-content: space-around;
  margin: 15rpx 0;
  .nav-img{
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-title{
  display: flex;
  width: 100%;
  height: 60rpx;
}
.floor-img-box{
  display: flex;
  padding-left: 10rpx;
}
.right-img-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.search-box{
  position: sticky;
  top:0;
  z-index:999;
}
</style>
