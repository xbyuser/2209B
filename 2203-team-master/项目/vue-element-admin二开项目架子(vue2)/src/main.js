import Vue from 'vue'

import 'normalize.css/normalize.css' // 样式重置库

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // 全局样式

import App from './App'
import store from './store'
import router from './router'

//打印插件
// import Print from 'vue-print-nb'
// Vue.use(Print)

import '@/icons' // icon图标
import '@/permission' // 权限控制


import * as directives from '@/directives'
import * as filters from '@/filters'

//把指令，过滤器挂载到全局
Object.keys(directives).forEach(key => {
  // key: directives[key]
  Vue.directive(key, directives[key])
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//挂载全局组件
import Components from './components'
Vue.use(Components)


// 全局混入
import Mix from '@/mixin/checkPermission'
Vue.mixin(Mix)


//设置多语言
import i18n from '@/lang'
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
