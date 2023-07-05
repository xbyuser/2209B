import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//链式导入
// createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

//单独导入
const app = createApp(App)

//全局icon图标引入，安装完也可以组件内局部引入——安装下图标库npm install @element-plus/icons-vue -D
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
