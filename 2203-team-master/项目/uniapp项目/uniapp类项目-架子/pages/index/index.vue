<template>
	<view>
		<!-- 轮播图组件 -->
		<swiper style="height:350rpx;color:white">
			<swiper-item class="swiper-item" v-for="(item, index) in bannerList" :key="index" >
				<image :src="'http://m.mengxuegu.com'+item.imageUrl"mode="">{{item.title}}</image>
			</swiper-item>
		</swiper>
		<!-- 第三方插件用法-uview框架 -->
		   <u-button @click="show = true">打开uview演示</u-button>
		   <u-calendar v-model="show" :mode="mode"></u-calendar>
			
   </view>
</template>

<script>
	
	import api from '@/api/api.js'
	
	export default {
		data() {
			return {
				bannerList: [],
				show: false,
				mode: 'date'
			}
		},
		 onLoad() {
			 //调用轮播
             this.loadBannerData()
		},
		methods: {
           // 查询轮播图数据
           async loadBannerData() {
           			  const { data } = await api.getAdvertList(1)
					  console.log('data', data)
           			  this.bannerList = data
           			  
           },
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
