<template>
	<view class="">
		<view class="tab">
			<view v-for="item,i in tabs" :key='item.id' @click="changeTab(item.id)"
				:class="active==item.id?'active':''">
				{{item.value}}
			</view>
		</view>

		<view class="order-box" v-for="ele,index in orders" :key="order_id">
			<view class="order num">
				<text>订单编号</text>
				<text>{{ele.order_number}}</text>
			</view>
			<view class="order price">
				<text>订单价格</text>
				<text>￥{{ele.total_price}}</text>
			</view>
			<view class="order time">
				<text>订单日期</text>
				<text>{{ele.newtime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				active: 0,
				orders: [],
				tabs: [{
						id: 0,
						value: "全部",
					},
					{
						id: 1,
						value: "待付款"
					},
					{
						id: 2,
						value: "待收货"
					},
					{
						id: 3,
						value: "退款/退货"
					}
				]
			}
		},
		methods: {
			changeTab(id) {
				this.active = id
				this.getOrderList(id + 1)
			},
			// 渲染订单列表
			getOrderList(type) {
				
			uni.$http.get('/api/public/v1/my/orders/all',type).then(res => {
					console.log("订单数据",res);
					if (res.data.meta.status == 200) {
						res.data.message.orders.map(item => {
							item.newtime=new Date(item.create_time*1000).toLocaleString()
						})
						console.log('处理过的数据', res.data.message.orders);

						this.active = type - 1
						this.orders = res.data.message.orders
					}
				})
			}
		},
		onLoad(options) {
			console.log(options);
			let type = options.type || 1
			this.getOrderList(type)
		},
	}
</script>

<style lang="scss">
	.tab {
		width: 100%;
		height: 65rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 30rpx;

		.active {
			border-bottom: 2px solid #d00;
		}
	}

	.order-box {
		border-bottom: 1px solid #ccc;
		font-size: 34rpx;

		.order {
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
		}
	}
</style>