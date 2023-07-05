Component({
	properties: {
		// 控制是否禁用
		disabled: {
			type: Boolean,
			value: false,
		},
		// 值
		value: {
			type: String,
			value: ""
		},
		// 默认内容
		placeholder: {
			type: String,
			value: '请输入内容',
		},
		// 搜索框宽度
		searchWidth: {
			type: Number,
			value: 0
		},
		// 跳转链接
		toUrl: {
			type: String,
			url: ""
		},
		// 搜索框边距
		navMargin: {
			type: Number,
			value: 20
		},
		// 导航栏颜色
		navbackcolor: {
			type: String,
			value: "#eb4450"
		},
		// 搜索框的背景颜色
		inpbackcolor: {
			type: String,
			value: "white"
		},
		// 与胶囊的距离
		inpMarginView: {
			type: Number,
			value: 10
		}

	},
	data: {
		// 状态栏高度
		statusBarHeight: 0,
		// 搜索框上边距
		searchMarginTop: 0,
		// 搜索框高度
		searchHeight: 0,
		// 最外层盒子高度
		navHeight: 0
	},
	methods: {
		toGo() {
			if (this.data.toUrl == "") {

				return false
			}
			wx.navigateTo({
				url: this.data.toUrl,
			})
		},
		enterValue(e) {
			this.setData({
				value: e.detail.value
			})
			this.handchange()
		},
		inputValue(e) {
			this.setData({
				value: e.detail.value
			})
			this.handchange()
		},
		handchange() {
			// 父组件中使用bind:success调用
			this.triggerEvent('success', {
				value: this.data.value
			})
		},
		blurValue() {
			this.setData({
				value: ""
			})
		}
	},
	//生命周期组件在视图层布局完成后执行-跟mouted差不多
	ready: function () {
		// 1.获取菜单按钮（右上角胶囊按钮）的布局位置信息
		const {
			top,
			width,
			height,
			right
		} = wx.getMenuButtonBoundingClientRect()

		//2. 获取系统信息-设置自定义导航栏的
		wx.getSystemInfo({
			success: (res) => {
				// 获取状态栏高度
				const {
					statusBarHeight
				} = res

				// 获取胶囊按钮边距
				const margin = top - statusBarHeight

				this.setData({
					// 设置状态栏高度
					statusBarHeight: statusBarHeight,

					// 设置最外层盒子高度
					navHeight: (height + statusBarHeight + (margin * 2)),

					// 搜索框上边距 = 状态栏 + 胶囊按钮边距
					searchMarginTop: statusBarHeight + margin,

					// 搜索框宽度 = 胶囊按钮右边坐标 - 胶囊按钮宽度 = 按钮左边可使用宽度，再减去两边间距 再减去与胶囊的距离
					searchWidth: right - width - this.data.navMargin - this.data.inpMarginView,

					// 搜索框高度
					searchHeight: height
				})
			},
		})
	},
})