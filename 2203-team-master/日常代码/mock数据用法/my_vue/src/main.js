import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import mock from '@/mock/mock'   //接口数据通了之后，mock数据就可以注释了

// console.log('mock数据', mock);
Vue.config.productionTip = false


//配置elementUI的环境
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI); //引入内容


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')