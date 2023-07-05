// 用 vite 创建项目，配置 postcss 需要使用 postcss.config.js，之前使用的 .postcssrc.js 已经被抛弃
// postcss-pxtorem 该插件可以自动帮你把px转换成rem 。默认值是37.5px=1rem
//!!!注意1.安装低版本插件 npm i postcss-pxtorem@5.1.1  。不要直接npm install postcss-pxtorem --save装是6.0.0版本的 写样式会直接报错 。2.又因为rem参考的是根html里的font-size字体大小，所以还需要安装下lib-flexible这个插件，动态往html里写入font-size,在main.js里导入import 'lib-flexible/flexible'
module.exports = {
  "plugins": {
    "postcss-pxtorem": {
      // Vant 官方根字体大小是 37.5px=1rem
      // rootValue:75,

      //如果是 Vant 的样式(vant是按照375px设计稿来的)， rootValue 设置为 37.5px=1rem 来转换 。
      //如果是750px设计稿，rootValue 设置为 75px=1rem 来转换
      //参考文章-https://www.jianshu.com/p/03d2126fc915   vant适配rem
      rootValue({file}) {
             return file.indexOf('vant')!==-1?37.5:75
      },
      propList: ['*'],
      selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
    }
  }
}