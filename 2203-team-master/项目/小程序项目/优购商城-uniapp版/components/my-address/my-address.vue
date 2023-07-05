<template>
	<view>
		<!-- 选择收货地址 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) ==='{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址</button>
		</view>
		<!-- 收货信息 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-lift">
					<view class="username">
						收货人:
						<text>{{address.userName}}</text>
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话:
						<text>{{address.telNumber}}</text>
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址:
				</view>
				<view class="row2-right">
					{{addstr}}
				</view>
			</view>
		</view>
		<!-- 底部边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		name: "my-address",
		data() {
			return {};
		},
		computed: {
			...mapState('user', ['address']),
			...mapGetters('user', ['addstr'])
		},
		methods: {
			...mapMutations('user', ['updateAddress']),
			
			async chooseAddress() {
				let address = {};
				address.telNumber = '13466688888'
				address.userName = '哈哈'
				this.updateAddress(address)
			},
			//获取收获地址用的是微信开放能力。这个需要公众后台申请，不好通过。所以可以用上面写死的方法
			// async chooseAddress(){
			//   const [err,succ]=await uni.chooseAddress().catch(err=>err)
			//   if(err===null&&succ.errMsg==='chooseAddress:ok'){
			//     this.updateAddress(succ)
			//   }
			//   if(err&&err.errMsg==='chooseAddress:fail auth deny'||err.errMsg==='chooseAddress:fail authorize no response'){
			//     this.reAuth()
			//   }
			// },
			// async reAuth(){ // 让用户重新授权
			//   const [err2,confirmResult]=await uni.showModal({ //弹出确认框
			//     content:'检查到你没有打开地址权限,是否去设置打开?',
			//     confirmText:'确认',
			//     cancelText:'取消'
			//   })
			//   if(err2)return
			//   if(confirmResult.cancel)return uni.$showMsg('你取消了授权') //点击了取消按钮
			//   if(confirmResult.confirm)return uni.openSetting({ //点击了确认按钮 来到手机设置地址授权处
			//     success:(settingResult)=>{
			//       if(settingResult.authSetting['scope.address'])return uni.$showMsg('授权成功,请选择收货地址')
			//       if(!settingResult.authSetting['scope.address'])return uni.$showMsg('你取消了授权')
			//     }
			//   })
			// }
		}
	}
</script>

<style lang="scss">
	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	.address-choose-box {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90px;
	}

	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-lift {
				.username {}
			}

			.row1-right {
				display: flex;
				justify-content: space-between;

				.phone {}
			}
		}

		.row2 {
			display: flex;
			// justify-content: space-between;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}

			.row2-right {}
		}
	}
</style>
