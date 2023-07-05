module.exports = {
    // 输出路径在当前目录下,静态资源路径 （默认 './' ,防止打包后出现白屏）
    publicPath: './',
    // 生产环境不生成 sourceMap
    productionSourceMap: false,
    // 开发环境配置代理跨域
    devServer: {
        open: true, // 自动启动浏览器
        host: '0.0.0.0', // localhost
        hotOnly: true, // 热更新
        overlay: {
            // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
            warnings: false,
            errors: true
        },
        // proxy: {
        //     // 配置跨域 只能用于开发环境 上线环境不起作用
        //     '/api': {
        //         target:'http://124.223.155.60:3001/api',
        //         // ws: true, // 是否代理 websockets
        //         changOrigin: true, // 开启代理 在本地创建一个虚拟服务端
        //         pathRewrite: { // 在请求接口的时候去掉/api
        //             '^/api': ''
        //         }
        //     }
        // }
    },
    // 关闭在开发环境下每次保存代码时都启用 eslint验证。
    lintOnSave: false
}
