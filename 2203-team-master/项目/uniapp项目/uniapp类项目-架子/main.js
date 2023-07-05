import Vue from 'vue'
import App from './App'

//uview插件使用
import uView from "uview-ui";
Vue.use(uView);

// 全局引入混合文件
import mixin from './common/mixin/mixin.js'
Vue.mixin(mixin)


// 工具方法 
import * as util from './common/js/util.js'
// 挂载到Vue原型上，在组件页面中，直接通过 this.$util.throttle
Vue.prototype.$util = util

// 环境配置调用-判断是生产环境，还是开发环境，走不同接口
import * as env from './config/env.js'
 // this.$env.HOST_H5
Vue.prototype.$env = env

//vuex
import store from './store'
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
