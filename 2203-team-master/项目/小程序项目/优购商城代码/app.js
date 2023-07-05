// app.js
App({
  // 小程序应用生命周期
  onLaunch: function(options) {
    // 监听小程序初始化。小程序初始化完成时（全局只触发一次）
      console.log('全局方法');
  },
  onShow: function(options) {
    // 监听小程序显示。小程序启动，或从后台进入前台显示时
  },
  onHide: function() {
    // 监听小程序隐藏。小程序从前台进入后台时。
  },
  onError: function(msg) {
    console.log(msg) // 错误监听函数。小程序发生脚本错误，或者 api 调用失败时触发，会带上错误信息
  },
  onPageNotFound: function(res) {
    // 页面不存在监听函数。小程序要打开的页面不存在时触发，会带上页面信息回调该函数
  },
  globalData: '全局数据',
  
})
