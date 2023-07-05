<template>
	<view class="my-header">
		
		<view @click="isLogin" class="header-content space-between center">
			<view class="left center">
				<image class="header-image" :src="userInfo.imageUrl || '/static/logo.png'"></image>
				<view v-if="userInfo" class="header-info column">
					<text class="nickname">{{userInfo.nickName}}</text>
					<text class="username">用户名：{{userInfo.username}}</text>
				</view>
				<view v-else class="header-info">
					<text class="nickname">请登录</text>
				</view>
			</view>
			<text class="iconfont icon-right"></text>
		</view>
		
		<!-- 地图功能演示 -->
		 <navigator url="/pages/my/location">地图功能演示</navigator>
		  <navigator url="/pages/ucharts/ucharts">移动端,小程序端图表演示-ucharts</navigator>
	</view>
</template>

<script>
	// import { mapState,mapGetters } from 'vuex'

	export default {
		data() {
			return {
               userInfo:{}
			}
		},
		onShow() {
			this.userInfo=uni.getStorageSync('userInfo')
		},
		computed: {
			// 解构状态作为计算属性
			// ...mapState(['userInfo']),
			// ...mapGetters(['hasLogin'])
			// userInfo() {
			// 	return this.$store.state.userInfo
			// }

		},

		methods: {
			// 判断是否登录
			isLogin() {
				// console.log('登录',this.hasLogin);
				if (this.userInfo) {
					console.log('已登录');
					uni.navigateTo({
						url: '/pages/my/user'
					})
				} else {
					console.log('没有登录');
					uni.navigateTo({
						url: '/pages/auth/login',
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	// 登录页面
	.my-header {
		// background-color: blue;

		.header-content {
			padding: 50rpx 39rpx;
			background-color: #FFFFFF;
			border-radius: 30rpx 30rpx 0 0;
		}

		.left {
			.header-image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 80rpx;
			}

			.header-info {
				margin-left: 30rpx;

				.nickname {
					font-size: 39rpx;
					font-weight: bold;
				}

				.username {
					font-size: 33rpx;
					color: grey;
				}
			}
		}

		.icon-right {
			font-size: 35rpx;
			color: grey;
		}
		navigator{
			color: red;
			font-size: 20px;
		}
	}
</style>
