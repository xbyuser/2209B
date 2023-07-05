//webpack配置
module.exports = {
	//打包输出路径
	publicPath: './',
	//第三方插件占用体积比较大的，要进行代码拆分抽离 ！！！注意index.html里要用cdn方式引入相关链接
	chainWebpack: config => {
		////注意此处,前面键名要跟项目中引用的名字对应上
		// config.externals({
		// 	"echarts": "echarts",
		// 	"$": "jquery",
		// })
		////出现打包报告配置   npm run build --report  
		// 			config
		//             .plugin('webpack-bundle-analyzer')
		//             .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
	},
	//目录访问,可配置别名访问方式,脚手架4.几的，在项目中，css样式如果用@引入的话会报错，可在此配置路径
	// configureWebpack: {
	// 	resolve: {
	// 		alias: {
	// 			'assets': '@/assets',
	// 			'common': '@/common',
	// 			'components': '@/components',
	// 			'network': '@/network',
	// 			'views': '@/views',
	// 			'commonfun': '@/commonfun'
	// 		}
	// 	}
	// },

	//使用vw/vh布局进行适配-安装插件(px-vh/vw) cnpm install postcss-px-to-viewport --save-dev
	css: {
		loaderOptions: {
			postcss: {
				plugins: [
					require("postcss-px-to-viewport")({
						unitToConvert: "px",//转换哪些尺寸单位
						viewportWidth: 1920,//设计图宽度-代表1920px=100vw 也就是100%
						unitPrecision: 3,//指定`px`转换为视窗单位值的小数位数
						propList: [
							"*"
						],
						viewportUnit: "vw",
						fontViewportUnit: "vw",
						selectorBlackList: ['#app'], // 指定不需要转换的类
						minPixelValue: 1, //小于或等于`1px`时不转换为视窗单位
						mediaQuery: false, //是否允许媒体查询中转换px
						replace: true,
						exclude: /(\/|\\)(node_modules)(\/|\\)/
					})
				]
			}
		}
	},

	//去除生产环境的SourceMap代码镜像-productionSourceMap
	productionSourceMap: false,
	//开发环境-配置代理跨域
	devServer: {
		open: true, // 自动启动浏览器
		host: '0.0.0.0', // localhost
		port: 6060, // 端口号
		hotOnly: true, // 热更新
		overlay: {
			//  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
			warnings: false,
			errors: true
		},
		proxy: {
			//配置跨域-只能用于开发环境,上线环境不起作用。！！！注意target一定要配置，否则会有报错
			'/api': {
				// target: 'http://localhost:6060',
				target: 'https://view.inews.qq.com/g2/getOnsInfo',  // 接口的域名 在页面调用时用 /api
				// ws: true, // 是否启用websockets
				changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
}
