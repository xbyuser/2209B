<template>
	<view>
		 <h2>个人中心演示</h2>
		<button class="logout-btn" @click="logout" type="default">退出登录</button>
	</view>
</template>

<script>
	// import {mapState} from 'vuex'
	import authApi from '@/api/api.js'
	export default {
		data() {
			return {
				
			}
		},
		
		onLoad() {
			this.$util.isLogin()
		},
		
		computed: {
			// ...mapState(['userInfo'])
		},
		
		methods: {
			//退出
			logout() {
				uni.showModal({
					title: '确定退出登录?',
					content: '退出后不会删除任何历史数据',
					success: async (res) => {
						if(res.confirm) {
							const {code, message} = await authApi.logout(this.$store.state.accessToken)
							if(code === 20000) {
								//退出成功
								this.$util.msg('成功退出登录')
								this.$store.commit('logout')
								setTimeout(() => {
									uni.navigateBack({
										delta:1
									})
								}, 300)
							}else {
								this.$util.msg(message)
							}
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
