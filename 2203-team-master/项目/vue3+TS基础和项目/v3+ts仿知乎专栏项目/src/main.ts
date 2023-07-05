import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import './assets/css/reset.css'
import 'element-plus/dist/index.css'
import './assets/css/base.css'
import './assets/css/common.css'
const app = createApp(App)
app.use(ElementPlus)
app.use(store).use(router).mount('#app')
