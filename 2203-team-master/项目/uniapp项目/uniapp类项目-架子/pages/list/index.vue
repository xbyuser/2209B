<template>
	<view>
		<!--
			@init="mescrollInit" @down="downCallback"
			 @up="upCallback"为固定值,不可删改(与mescroll-mixins保持一致)
		 :down="downOption" :up="upOption" 绝大部分情况无需配置 
		 :top="顶部偏移量" :bottom="底部偏移量" :topbar="状态栏" :safearea="安全区" (常用)
		 字节跳动小程序 ref="mescrollRef" 必须配置 
		 此处支持写入原生组件 -->
		 <view >下拉刷新插件mescroll演示</view>
			<!-- 下拉刷新，上拉加载插件mescroll -->
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">             
			   <!-- 放数据内容 -->
			<navigator url="../detail/index">
				  <view  v-for="(item,index) in hotCourseList">
				  	<h2>{{index}}:{{item.title}}</h2>
				  </view>
			</navigator>
				
			</mescroll-body>
   </view>
</template>

<script>
	//下拉刷新插件-mescroll
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import api from '@/api/api.js'
	
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				hotCourseList:[],
			}
		},
		 onLoad() {
			// this.loadHotCourseData()
		},
		methods: {
				// 查询热门推荐数据
				// async loadHotCourseData() {
				// 			  const {data} = await api.getList({sort: 'hot'}, 1, 10)
				// 			  this.hotCourseList = data.records
				// 			  console.log('hotCourseList', this.hotCourseList)
				// },
			  /*上拉加载的回调*/
			  async upCallback(page) {
				let pageNum = page.num; // 当前页码, 默认从1开始
				let pageSize = page.size; // 每页显示多少条数据, 默认每页10条
				
				// 分页查询
				// 付费列表 （0收费，1免费）
				const {data} = await api.getList({isFree: 0}, page.num, page.size)
				const curList = data.records
				// console.log('data', data)
				
				// 判断是否第1页，是则将原数据清空
				if(page.num === 1) this.hotCourseList = []  
				// 追加新数据
				this.hotCourseList = this.hotCourseList.concat(curList)
				
				// 请求成功，隐藏加载状态
				this.mescroll.endBySize(curList.length, data.total)
			  }
		  		
		}
	}
</script>

<style lang="scss">

</style>
