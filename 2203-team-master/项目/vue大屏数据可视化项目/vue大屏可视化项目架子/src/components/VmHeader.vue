<template>
	<div id="vmheader">
		<h1>新型冠状肺炎实时监测</h1>
		<div id="zptime">
			{{ setDate }}
		</div>

	</div>
</template>

<script>

export default {
	name: 'vmheader',
	data() {
		return {
			date: new Date(),
			timer: null
		}
	},
	computed: {
		//随着下面定时器不断在执行，这里不断在计算时间返回
		setDate() {
			//小于10,前面补0
			var padaDate = function (value) {
				return value < 10 ? '0' + value : value;
			}
			//调用时间
			return `当前时间: ${this.date.getFullYear()}年${padaDate(this.date.getMonth() + 1)}月${padaDate(this.date.getDate())}-${padaDate(this.date.getHours())}时${padaDate(this.date.getMinutes())}分${padaDate(this.date.getSeconds())}秒`

		}
	},
	mounted() {
		this.timer = setInterval(() => {
			// this.date = new Date().toLocaleString()  //简单方法1,利用toLocaleString()获取本地标准化时间
			this.date = new Date() //原生自己实现
			console.log('定时器在走');
		}, 1000);
	},
	//beforeDestroy销毁某个方法(离开路由后执行)。这里是销毁定时器-在页面 a 中写了一个定时器，在点击按钮进入页面 b 的时候，定时器会一直在执行，这是非常消耗性能的。
	beforeDestroy() {
		console.log('定时器销毁后');
		clearInterval(this.timer);
	},
}
</script>
<style scoped>
#vmheader {
	height: 100px;
	position: relative;
	/* 别名访问方式-绝对路径访问 */
	/* background: url(~assets/image/head_bg.png) no-repeat top center; */
	/* 静态访问方式 */
	background: url('../assets/image/head_bg.png') no-repeat top center;

	background-size: 100% 100%;
}

#vmheader h1 {
	color: white;
	font-size: 38px;
	line-height: 80px;
	text-align: center;
}

#zptime {
	line-height: 75px;
	color: rgba(255, 255, 255, 0.7);
	font-size: 20px;
	position: absolute;
	top: 0;
	right: 30px
}
</style>
