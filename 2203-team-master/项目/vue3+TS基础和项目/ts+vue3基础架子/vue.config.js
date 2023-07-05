module.exports = {
  publicPath: './',
  //配置eslint验证规则关闭-也可在package.json中配置eslint相关规则-https://blog.csdn.net/qq_31061615/article/details/107024442
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
  },
  lintOnSave: false,
}
