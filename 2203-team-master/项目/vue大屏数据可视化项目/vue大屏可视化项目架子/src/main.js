import Vue from 'vue'
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false

//全局导入方式-this.echarts
// import echarts from 'echarts';
// Vue.prototype.echarts=echarts

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
