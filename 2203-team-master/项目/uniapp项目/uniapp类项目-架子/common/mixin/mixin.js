
export default{
	data(){
		return {
			page: 2,
		}
	},
	methods: {
		/**
		 * 跳转页面
		 * @param {String} url 目标页面地址
		 * @param {Object} options 参数
		 * @param {Boolean} options.login 是否检测登录  
		 */
		navTo(url, options={}){
			if(!url){
				return;
			}
			if(options.login && !this.$store.getters.hasLogin){
				url = '/pages/auth/login';
			}
			uni.navigateTo({
				url
			})
		},
		
		// 后退, 默认后退一步
		navBack(delta = 1){
			// console.log('navBack', delta)
			uni.navigateBack({
				delta
			});
		},
	},
	//分享功能-发送给朋友
	onShareAppMessage() {
		   return {
				title: '主页分享',
				// path: '/pages/index/index?name=123'  //可以传参
				path: '',//跳转路径-默认为当前路径
				imageUrl:'',//默认为当前页面截图
			}
	  },
	  //分享功能-分享到朋友圈
	  onShareTimeline() {
		   return {
				title: '震惊，这个小程序竟然。。。',
				// path: '/pages/index/index',
				// query: 'name=123'   //可以传参
				path:'/pages/index/index', //跳转路径-默认为当前路径
				query: '',
				imageUrl:'',//默认为当前页面截图
			}
		
	  }
}