module.exports = {
  publicPath: './',
  //开发环境-配置
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
      //配置跨域-只能用于开发环境,上线环境不起作用
      '/api': {
        target: 'http://api.vikingship.xyz/api/', // 接口的域名 在页面调用时用 /api/
        // ws: true, // 是否启用websockets
        changeOrigin: true, //允许跨域，如果接口跨域，需要进行这个参数配置
        secure: false, //如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 配置eslint验证规则关闭- 也可在package.json中配置eslint相关规则 - https://blog.csdn.net/qq_31061615/article/details/107024442
  lintOnSave: false,
  //去除生产环境的代码镜像-productionSourceMap
  productionSourceMap: false,
}
