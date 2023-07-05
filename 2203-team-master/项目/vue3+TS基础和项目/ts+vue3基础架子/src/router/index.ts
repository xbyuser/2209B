import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/vue3',
    name: 'Vue3模板',
    component: () => import(/* webpackChunkName: "about" */ '../views/Vue3模板.vue')
  },
  {
    path: '/child',
    name: 'Vue3子组件',
    component: () => import(/* webpackChunkName: "about" */ '../views/Vue3组件模板.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
