<template>
	<view class="app">
		<text class="back-btn iconfont icon-close" @click="uni.navigateBack({
			delta:1
		})"></text>
		<view class="left-top-sign">LOGIN</view>
		<view class="welcome">欢迎回来！</view>
		
		<!-- 手机验证码 -->
		<view class="input-content">
			<view class="input-item">
				<text class="tit">手机号码</text>
				<view>
					<input v-model="mobile" maxlength="11" type="number" placeholder="请输入手机号码" placeholder-style="color: #909399"/>
				</view>
			</view>
			<view class="input-item">
				<text class="tit">验证码</text>
				<view class="row">
					<input v-model="code" maxlength="6" type="number" placeholder="请输入手机验证码" placeholder-style="color: #909399"/>
					<!-- 验证码组件 -->
					<mxg-code :mobile="mobile" templateCode="MSM_1999123123"></mxg-code>
				</view>
			</view>
			<button :loading="loading" type="primary" @click="login">登录</button>
		</view>
		
		<!-- #ifndef H5 -->
		<view class="other-wrapper center column">
			<view class="line">
				<text class="tit">社交帐号登录</text>
			</view>
			<view class="row">
				<image @click="toProviderLogin('weixin')"
					class="icon" src="/static/share/weixin.png"></image>
				<!-- #ifdef APP-PLUS -->
				<image @click="toProviderLogin('qq')" class="icon" src="/static/share/qq.png"></image>
				<!-- #endif -->
			</view>
		</view>
		<!-- #endif -->
		
	</view>
</template>

<script>
	
	import api from '@/api/api.js'
	
	export default {
		
		data() {
			return {
				mobile: '13466677777', //手机号码 
				code: '123456', //验证码
				loading: false, //登录中
			}
		},
		methods: {
			//h5登录
			async login() {
				// 协议
				const {mobile, code} = this
				if(!this.$util.checkStr(mobile, 'mobile')) {
					this.$util.msg('请输入有效手机号码')
					return
				}
				if(!this.$util.checkStr(code, 'mobileCode')) {
					this.$util.msg('验证码输入错误')
					return
				}
				
				//调用接口
				this.loading = true
				uni.showLoading({title: '登录中', mask: true})
				const res = await api.login( {mobile, code} )
				this.loading = false
				uni.hideLoading()
				
				if(res.code === 20000) {
					this.loginSuccessCallBack(res.data)
				}else {
					this.$util.msg(res.message)
				}
			},
			
			// 登录成功操作 vuex 
			loginSuccessCallBack(data) {
				this.$util.msg('登录成功')
				// 状态管理保存用户信息
				// this.$store.commit('setToken', data)
				uni.setStorageSync('userInfo', data.userInfo)
				uni.setStorageSync('mxgEducationToken', data.access_token)
				
				setTimeout(() => {
					uni.switchTab({
						url:'/pages/my/index'
					})
				}, 500)
				
			},
			
			// 第3方授权登录-这里是静默登录(不需要用户头像的),通过uni.login获取code码，调用自己接口，传入code或者appid这些，后台给你真正token
			toProviderLogin(provider) {
				 uni.getProvider({
				     service: 'oauth',
				     success: function (res) {
				         console.log(108,res.provider)
				         if (~res.provider.indexOf('weixin')) {
				             uni.login({
				                 provider: 'weixin',
				                 success: function (loginRes) {
				                     console.log('微信登录',loginRes);
									 let {code}=loginRes
									 //调用自己接口
									 api.loginByProvider({code}).then(res2=>{
										   console.log('token成功',res2);
										   //登录成功
										   if(res2.code===20000){
											    uni.showToast({
											    	'title':res2.message
											    })
												
												uni.setStorageSync('mxgEducationToken',res2.data.access_token)
												uni.setStorageSync('userInfo',res2.data.userInfo)
												
												uni.switchTab({
													'url':'/pages/my/index'
												})
										   }
									 })
									 
									 
				                 }
				             });
				         }
				     }
				 });     
	
			},
			
			
		}
	}
</script>

<style lang="scss">
	.app{
		padding-top: 200rpx;
	}
	/* 关闭按钮 */
	.back-btn{
		position:absolute;
		left: 20rpx;
		top:50rpx;
		z-index: 90;
		padding: 20rpx;
		font-size: 39rpx;
		color: #606266;
	}
	
	.left-top-sign{
		font-size: 120rpx;
		color: #f8f8f8;
	}
	
	.welcome{
		position: relative;
		top: -90rpx;
		padding-left: 60rpx;
		font-size: 46rpx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}

	.input-content{
		padding: 0 60rpx;
	}
	
	.input-item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding-left: 30rpx;
		background: #f8f6fc;
		height: 120rpx;
		border-radius: 4px;
		margin-bottom: 50rpx;
		
		&:last-child{
			margin-bottom: 0;
		}
		.row{
			width: 100%;
		}
		.tit{
			height: 50rpx;
			line-height: 56rpx;
			font-size: 26rpx;
			color: #606266;
		}
		input{
			flex: 1;
			height: 60rpx;
			font-size: 30rpx;
			color: #303133;
			width: 100%;
		}	
	}
	
	button[type=primary] {
		background-color: #345dc2 !important;
	}
	
	.button-hover[type=primary] {
		background-color: #345dc2 !important;
	}
	
	/* 其他登录方式 */
	.other-wrapper{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20rpx;
		margin-top: 80rpx;
		
		.weixin {
			border: 0;
		}
		.line{
			margin-bottom: 40rpx;
			.tit{
				margin: 0 32rpx;
				font-size: 24rpx;
				color: #606266;
			}
			&:before, &:after{
				content: '';
				width: 160rpx;
				height: 0;
				border-top: 1px solid #e0e0e0;
			}
		}
		.icon{
			width: 80rpx;
			height: 80rpx;
			margin: 0 50rpx;
		}
	}
	
	.agreement{
		position: absolute;
		left: 0;
		bottom: 10rpx;
		width: 750rpx;
		height: 90rpx;
		font-size: 24rpx;
		color: #999;
		.iconfont{
			font-size: 36rpx;
			color: #ccc;
			margin-right: 8rpx;
			&.active{
				color: blue;
			}
		}
		.tit{
			color: #40a2ff;
		}
	}
</style>
