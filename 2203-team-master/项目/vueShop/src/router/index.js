import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'  //静态导入

// //路由懒加载
const Home = () => import(/* webpackChunkName: "Home" */ '../views/list/Home.vue')

const Welcome = () => import(/* webpackChunkName: "Welcome" */ '../views/list/Welcome.vue')
//用户模块
const Users = () => import(/* webpackChunkName: "Welcome" */ '../views/list/Users.vue')

//权限模块
const Rights = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../views/list/Rights.vue')

const Roles = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../views/list/Roles.vue')

//商品模块
const Categories = () => import(/* webpackChunkName: "Cate_Params" */ '../views/list/Categories.vue')

const Params = () => import(/* webpackChunkName: "Cate_Params" */ '../views/list/Params.vue')

//商品列表
const Goods = () => import(/* webpackChunkName: "GoodsList_Add" */ '../views/list/Goods.vue')

const GoodsAdd = () => import(/* webpackChunkName: "GoodsList_Add" */ '../views/list/GoodsAdd.vue')

//订单模块
const Orders = () => import(/* webpackChunkName: "Order_Report" */ '../views/list/Orders.vue')

const Reports = () => import(/* webpackChunkName: "Order_Report" */ '../views/list/Reports.vue')


Vue.use(VueRouter)

const routes = [
  //项目正式路由开始
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      //写死的不需要权限的路由表，一般叫静态路由。一般需要权限才能访问的,可以用js动态生成,通过router.addRoute()填加到这块，叫动态路由表
      { path: '/welcome', name: 'Welcome', component: Welcome },
      { path: '/users', name: 'Users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Categories },
      { path: '/params', component: Params },
      { path: '/goods', component: Goods },
      { path: '/goods/add', component: GoodsAdd },
      { path: '/orders', component: Orders },
      { path: '/reports', component: Reports }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  //找不到页面，可以都到登录页面
  {
    path: '*',
    redirect: '/login'
  },
  //组件封装用
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "Test" */ '@/views/Test.vue')
  },
  //按钮权限用
  {
    path: '/menu',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "Menu" */ '@/views/Menu.vue'),
  },
]
const router = new VueRouter({
  routes
})

// 白名单-意思是不需要token，就可直接进入的页面
const whiteList = ['/login', '/test']

//路由拦截-1.先看看有没有登录过token值，如果登录过放行 2.没有登录在次判断是否在登录页面
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (token) {
    next()
  }
  else {
    if (whiteList.indexOf(to.path) != -1) {
      next()
    }
    else {
      next('/login')
    }
  }
})



export default router
