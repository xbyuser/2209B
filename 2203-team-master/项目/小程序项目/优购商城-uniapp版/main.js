import App from './App'
import store from './store/store'
import {$http} from '@escook/request-miniprogram' // 导入网络请求的包  安装包npm install @escook/request-miniprogram

uni.$http=$http  //挂载到uni上
 // 配置请求根路径
// $http.baseUrl = 'https://www.uinav.com'
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
$http.beforeRequest=function(options){ // 请求拦截器
  uni.showLoading({
    title:'数据加载中...'
  })
  if(options.url.indexOf('/my/')!==-1){ // 有权限的接口
    options.header={
      Authorization: store.state.user.token,
    }
  }
}

$http.afterRequest=function(){ // 响应拦截器
  uni.hideLoading()
}

//封装弹框提示的方法
uni.$showMsg=function(title='数据请求失败!',duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif