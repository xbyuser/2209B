<template>
	<view>
		<!-- 文章内容 -->
		<view class="content-main">
			<text class="title">{{detailData.title}}</text>
	         <!-- 注意此处html渲染要考虑h5和小程序两种方式 -->
			<!-- #ifdef MP -->
			<!-- nodes 是html代码字符串 -->
			<!-- <rich-text selectable="true" nodes="<h2 style='color:red'>文章内容</h2>"></rich-text> -->
			  <rich-text class="markdown-body" selectable="true" :nodes="detailData.htmlContent"></rich-text>
			<!-- #endif -->
			
			<!-- #ifndef MP -->
			<!-- <text selectable="true" v-html="`<h2 style='color:red'>文章内容</h2>`"></text> -->
			<text class="markdown-body" selectable="true" v-html="detailData.htmlContent"></text>
			<!-- #endif -->
		</view>
		
		<!-- 分享 -->
		<mxg-share ref="share" :shareData="{title: detailData.title, mainImage: detailData.imageUrl}"></mxg-share>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	
	export default {
		data() {
			return {
				id: null, //文章id
				detailData: {}, // 详情数据
			}
		},
		
		onLoad(option) {
			this.id = option.id
			
			this.getDetails()
		},
		
		onNavigationBarButtonTap(e) {
			// 点击导航栏分享按钮，针对APP端
			if(e.type === 'share') {
				this.$refs.share.showHandler()
			}
		},
		
		// 微信小程序分享
		onShareAppMessage() {
			return {
				title: this.detailData.title,
				path: this.$util.routePath()
			}
		},
		
		methods: {
			// 查询文章详情
			async getDetails() {
				const {data} = await api.getArticleById(this.id)
				console.log('详情页数据', data)
				// 将标题设置到导航标题上
				uni.setNavigationBarTitle({
					title: data.title
				})
				
				//处理图片，在h5和小程序太大了
				data.htmlContent = data.htmlContent
					.replace(/\<img/gi, '<img style="width:100%;height:auto"')
				this.detailData = data
			},
			
		}
	}
</script>

<style lang="scss">

	.tag-list {
		// 一行排列不下，换行
		flex-wrap: wrap;
		padding: 10rpx 25rpx;
		font-size: 14px;
		background-color: #ffffff;
		.tag-view {
			margin-top: 15rpx;
			margin-right: 20rpx;
		}
	}
    
	.content-main {
		padding: 25rpx;
		.title {
			font-size: 45rpx;
			line-height: 55rpx;
			font-weight: bold;
		}
		.info {
			display: flex;
			align-items: center;
			margin: 30rpx 0;
			.author {
				font-size: 30rpx;
				color: #303133;
				image {
					width: 45rpx;
					height: 45rpx;
					border-radius: 100%;
					margin-right: 10rpx;
				}
			}
			&>text {
				margin-left: 10rpx;
				font-size: 25rpx;
				color: #999;
			}
		}
	}


</style>
