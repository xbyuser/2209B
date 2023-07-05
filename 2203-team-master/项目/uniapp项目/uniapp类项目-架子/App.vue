<script>
	export default {
		// 	//初始化状态-如果登录过，保持登录状态
		// onLaunch: function() {
		// 	console.log('App Launch')
		// 	this.initLogin()
		// },
		
		// methods: {
		// 	initLogin() {
		// 		const userInfo = uni.getStorageSync('userInfo')
		// 		const accessToken = uni.getStorageSync('mxgEducationToken')
		// 		if(userInfo && accessToken) {
		// 			this.$store.commit('setState', {userInfo, accessToken})
		// 		}
		// 	}
		// },
		
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	@import url("@/common/css/common.css");
	
	
</style>
