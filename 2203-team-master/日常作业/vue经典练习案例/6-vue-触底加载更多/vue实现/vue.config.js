const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      //可以放置多个服务器地址
      // '^/api': {
      //   target: "http://api.aslegou.top",
      //   pathRewrite: {
      //     '^/api': ''
      //   }
      // },
      '^/xuexiao': {
        target: "http://api.aslegou.top",
        pathRewrite: {
          '^/xuexiao': ''
        }
      }
    }
  }

})

