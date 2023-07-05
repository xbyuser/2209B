import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

//全局引入elment-ui-挂载到全局vue方法上，就可以用this这些方法了
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入axios-挂载到原型上-页面调用this.$http.get/post等，这种不方便维护，可统一对axios封装
// import axios from "axios"
// Vue.prototype.$http = axios;
// // 配置请求的基地址
// axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
// // interceptors 拦截器， 在请求的时候拦截下来，如果没有token不能请求数据
// axios.interceptors.request.use(config => {
//     // console.log(config)
//     config.headers.Authorization = sessionStorage.getItem('token')
//     // 在最后必须 return config
//     return config
// })


//全局过滤器——自己写日期格式化方法(!!!注意后端返回的时间戳是以秒计算时间的，前端是以毫秒计算时间的)
// Vue.filter('formatDate1', function (val) {
//   //注意对方给你的是毫秒还是秒，如果是毫秒需要转秒（*1000）
//   let date = new Date(val * 1000); 
//   let y = date.getFullYear();
//   let MM = date.getMonth() + 1;
//   MM = MM < 10 ? ('0' + MM) : MM;
//   let d = date.getDate();
//   d = d < 10 ? ('0' + d) : d;
//   let h = date.getHours();
//   h = h < 10 ? ('0' + h) : h;
//   let m = date.getMinutes();
//   m = m < 10 ? ('0' + m) : m;
//   let s = date.getSeconds();
//   s = s < 10 ? ('0' + s) : s;
//   return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
// })


//全局过滤器——调用全局公用方法-日期格式化方法
import { formatDate, formatTime } from "@/utils/index.js"
import { parseTime } from "@/utils/ruoyi.js"

Vue.filter('formatDate1', function (date) {
  // formatDate(日期) 时间戳1651745663 不同格式日期'2022/05/05' ,'2022,01,01'
  // return formatDate(date*1000);
  return formatTime(date * 1000, '{y}-{m}-{d} 星期{a}');
  // return parseTime(date*1000,'{y}-{m}-{d} 星期{a}');

})

// 导入富文本编辑器 cnpm i vue-quill-editor -S
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

//全局引用自己封装组件-放在Vue.use(组件)
import dialog from '@/components/Dialog/index.js'
Vue.use(dialog)
import Table from '@/components/Table/index.js'
Vue.use(Table)



//防止路由多次点击出错
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
