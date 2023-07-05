<template>
	<view class="container">
		<!-- 地图参考文章-
		https://blog.csdn.net/crazy1235/article/details/55004841 微信小程序地图
	
		<给地图上标注静态位置，可把经纬度写死 -->
		<map style="width: 100%; height:1000px;" :latitude="latitude" :longitude="longitude" :markers="marker"
			:scale="scale" id="myMap" show-location="true">
		</map>

		<!-- 给地图上加图层 -->
		<cover-view class="rest" @tap="toLocation">
			<cover-image src='../../static/rest.png' class='restimg'></cover-image>
		</cover-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map', //标注点名
				scale: 16, //缩放范围
				mapMsg: '',
				latitude: 40.139174, //纬度
				longitude: 116.205735, //经度
				//marker属性——地图上添加markers–标注
				marker: [{
					id: 0,
					latitude: 40.139174, //纬度
					longitude: 116.205735, //经度
					iconPath: '/static/logo.png', //显示的图标        
					rotate: 0, // 旋转度数
					width: 20, //宽
					height: 20, //高
					title: '你在哪了', //标注点名
					alpha: 0.5, //透明度
					callout: { //自定义标记点上方的气泡窗口 点击有效  
						content: '北京首航蓝天学院', //文本
						color: '#ffffff', //文字颜色
						fontSize: 14, //文本大小
						borderRadius: 2, //边框圆角
						bgColor: '#00c16f', //背景颜色
						display: 'ALWAYS' //常显
					}
				}],
				scale: 16, //地图缩放程度
			}
		},
		onLoad() {
			//可以通过getFuzzyLocation方法获取到当前经纬度。！！注意获取地理位置信息时，都要在manifest.json配置位置授权信息。还要在公众平台申请对应权限，才能使用
			this.getLocation()

		},
		methods: {
			getLocation() {
				let that = this
				uni.getFuzzyLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置信息', res)

						that.latitude = res.latitude
						that.longitude = res.longitude
					},
					fail: function(res) {
						console.log('获取当前位置失败', res);
					}
				})

			},
			//点击获取实时位置，映射到地图上
			toLocation() {
				console.log('当前地图', wx.createMapContext('myMap'))
				wx.createMapContext('myMap').moveToLocation()
			}
		}
	}
</script>

<style lang="scss">
	.container {
		position: absolute;
		z-index: -1;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		.rest {
			width: 42px;
			height: 42px;
			border-radius: 50%;
			position: absolute;
			bottom: 40px;
			left: 30px;
			background: #fff;
			border: 1px solid #e7e7e7
		}
	}
</style>
