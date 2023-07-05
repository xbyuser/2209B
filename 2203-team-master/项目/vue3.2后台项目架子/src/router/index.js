import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'

const routes = [
  
  // 登陆
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  //以下为测试页面
  {
    path: '/about', 
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue')
  },
  {
    path: '/test',//vue3基本语法演示
    name: 'Test',
    component: () => import(/* webpackChunkName: "Test" */ '../views/Test.vue')
  },
   //根目录,到登录页面
   {
    path: '/',
    redirect: '/login'
  },
  //找不到页面到404,！！注意vue3里不能用*
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
