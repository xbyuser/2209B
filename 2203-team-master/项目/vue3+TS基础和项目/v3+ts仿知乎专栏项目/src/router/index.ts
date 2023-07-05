import { createRouter, createWebHashHistory, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      needLogin: false,
      title: '文章列表'
    },
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      needLogin: false,
      title: '用户登录'
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      needLogin: false,
      title: '用户注册'
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/column',
    name: 'column',
    meta: {
      needLogin: false,
      title: '专题列表'
    },
    component: () => import('../views/Column.vue')
  },
  {
    path: '/addArticle',
    name: 'addArticle',
    meta: {
      needLogin: true,
      title: '发布文章'
    },
    component: () => import('../views/AddArticle.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to) => {
  const token = store.state.user.token || false
  if (to.meta.needLogin) {
    if (token) {
      return true
    } else {
      return '/login'
    }
  } else {
    return true
  }
})
router.afterEach((to:RouteLocationNormalized) => {
  const el = document.querySelector<HTMLTitleElement>('title')
  if (el) {
    el.innerHTML = (to.meta.title as string)
  }
})
export default router
