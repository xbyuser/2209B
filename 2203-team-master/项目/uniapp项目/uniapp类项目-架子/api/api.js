import request from './http.js'

export default {
	
	// 查询指定位置的广告信息
	getAdvertList(position = 1) {
		return request({
			url: `/article/api/advert/show/${position}`
		})
	},
	
	// 查询分类与标签信息
	getCategoryList() {
		return request({
			url: '/article/api/category/label/list'
		})
	},
	
	// 条件分页查询课程列表 query条件对象{isFree: 0}，current当前页码，size每页显示多少条
	getList(query, current = 1, size = 10) {
		return request({
			url: '/course/api/course/search',
			method: 'POST',
			data: {...query, current, size} // {isFree: 0, current: current, size: size}
		})
	},
	// 通过文章id查询文章详情
	getArticleById(articleId){
		return request({
			url: `/article/api/article/${articleId}`,
			method: 'GET'
		})
	},
	// 手机号登录
	login(data) {
		return request({
			url: '/auth/login',
			method: 'POST',
			data
		})
	},
	//发送短信验证码
	sendSmsCode(data) {
		return request({
			url: '/system/sms/code',
			method: 'POST',
			data
		})
	},
	// 第三方授权后，进行应用内登录
	loginByProvider(data) {
		return request({
			url: '/auth/login/provider',
			method: 'POST',
			data
		})
	},
	//退出系统
	logout(accessToken) {
		return request({
			url: '/auth/logout', // /auth/logout?accessToken=${accessToken}
			method: 'GET',
			data: { accessToken }
		})
	}
}