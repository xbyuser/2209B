import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible/flexible' //需要安装 cnpm i lib-flexible -S 该插件-帮你把font-size写入到根html里,rem又依赖于根html里的font-size 

//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';

// 引入 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


//页面引入-通过链式编程
// createApp(App).use(store).use(router).mount('#app')

//也可分开写
const app = createApp(App)
app.use(ElementPlus)
app.use(Vant)
app.use(store)
app.use(router)
app.mount('#app')

//全局图标引入-安装图标库 cnpm i @element-plus/icons-vue
import * as ElementPlusIconsVue from '@element-plus/icons-vue'   
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

