// 针对不同端,可单独设置跨域
// // 基础URL
// // #ifndef H5
// // 非h5端没有跨域问题
// let BASE_URL = 'https://mock.mengxuegu.com/mock/5fdc6ffb5b350029c77c973a/mxg-education-app'
// // #endif

// // #ifdef H5
//  // h5端在浏览器有跨域问题，在manifest.json或vue.config.js配置代理转发
// let BASE_URL = '/api' // 'http://39.108.187.100:6001'
// // #endif


// let BASE_URL = 'https://mock.mengxuegu.com/mock/5fdc6ffb5b350029c77c973a/mxg-education-app' //模拟数据
let BASE_URL = 'http://m.mengxuegu.com/api' //线上接口

const request = (options = {}) => {
	//loading条
	// uni.showLoading({
	// 	title: '加载中'
	// });
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			timeout: 8000, // 8秒超时时间，单位ms
			success: (res) => {
				console.log('res', res.data)
				resolve(res.data)
			},
			fail: (err) => {
				// console.log('err', err)
				uni.showToast({
						title:'请求接口失败',
						duration: 1500,
						mask: false
				})
				reject(err)
			},
			// complete: (response) => {
			// 	setTimeout(function() {
			// 		uni.hideLoading();
			// 	}, 1000)
			// },
		})
	}) 
}

// 导出
export default request