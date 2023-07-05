import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  
  // 登陆
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  //以下为测试页面
  {
    path: '/home',
    name: 'Home',
    component: Home, //测试H5页面rem适配
  },
  {
    path: '/about', //vue3基本语法演示
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue')
  },
  {
    path: '/children', //组件
    name: 'Children',
    component: () => import(/* webpackChunkName: "about" */ '../components/Children.vue')
  },
   //根目录,到登录页面
   {
    path: '/',
    redirect: '/home'
  },
  //找不到页面到404,vue3里不能用*
  // {
  //  path: '/:catchAll(.*)',
  //  redirect: '/404'
  // }
]

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes
})

export default router
