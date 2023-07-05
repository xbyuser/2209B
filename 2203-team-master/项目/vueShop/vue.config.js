module.exports = {
  //     //配置输出路径
  publicPath: './',
  //引导webpack去找我的入口文件，即不同的main.js
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
      //生产模式下打包时,把第3方插件排除在外不打包,这样可减少chunk文件的体积，提升性能。可把第3方插件放在打包后的index.html里，通过链接方式引入。不过使用externals属性要注意的是，虽然可以优化首屏加载速度，但是由于静态资源分离，也会增加http请求数量。所以如果是小项目，最好就不要用externals属性，因为小项目打包的出来的vender.js体积不大，建议项目体量较大的项目再用比较合适。

      //说一下这里的键值对配置，key名vue是包名,这个值是import from 'vue'时用的名称。value值是别名,是你在项目中用的别名
      //参考文章  https://www.jianshu.com/p/f6b3f097a56d
      config.set('externals', {
        'vue': 'Vue',
        'echarts': 'echarts',
        'element-ui': 'ELEMENT',
      })
      config.plugin('html').tap(args => {
        return args
      })
    })
    // config.when(process.env.NODE_ENV === 'development', config => {
    //   config.entry('app').clear().add('./src/main.js')
    //   config.plugin('html').tap(args => {
    //     return args
    //   })
    // })

  },
  // //开发环境-配置
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
        target: 'http://127.0.0.1', // 接口的域名 在页面调用时用 /api/
        // ws: true, // 是否启用websockets
        changeOrigin: true, //允许跨域，如果接口跨域，需要进行这个参数配置
        secure: false, //如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  // //去除生产环境的代码镜像-productionSourceMap
  productionSourceMap: false,
}