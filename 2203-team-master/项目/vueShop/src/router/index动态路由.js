import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'  //静态导入

// //路由懒加载
const Home = () => import(/* webpackChunkName: "Home" */ '../views/list/Home.vue')

const Welcome = () => import(/* webpackChunkName: "Welcome" */ '../views/list/Welcome.vue')
// //用户模块
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
      // { path: '/users', name: 'Users', component: Users },
      // { path: '/rights', component: Rights },
      // { path: '/roles', component: Roles },
      // { path: '/categories', component: Categories },
      // { path: '/params', component: Params },
      // { path: '/goods', component: Goods },
      // { path: '/goods/add', component: GoodsAdd },
      // { path: '/orders', component: Orders },
      // { path: '/reports', component: Reports }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  //测试页面
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "Test" */ '@/views/Test.vue')
  },
  //模拟按钮权限
  {
    path: '/menu',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "Menu" */ '@/views/Menu.vue'),
  },
  //找不到页面到都到login
  {
    path: '*',
    redirect: '/login'
  }
]
const router = new VueRouter({
  // mode:'history',  //history模式，打包上线时，需要服务器配合配置如果错误时挨边index.html
  routes
})

//动态路由核心-把后端树状结构转成列表结构
// export function fn(data) {
//   let arr = []
//   function deep(data) {
//       data.forEach(item => {
//           if (item.children.length) {
//               //递归开始
//               deep(item.children)
//           } else {
//               arr.push({
//                   path: "/" + item.path,
//                   name: item.authName,
//                   component: () =>
//                       import (`@/views/list/${item.path}.vue`)
//                       // component: (resolve) => require([`@/views/${item.path}.vue`], resolve)
//               })
//           }
//       })
//   }
//   deep(data)
//   return arr
// }

import { fn } from '@/utils/routeList.js' //把生成列表路由放到公共方法里
// //生成动态路由-登录后获取到路由列表，调用递归函数通过router.addRoute('路由里name名',值)生成动态路由
console.log('路由先走');
function loadRoute() {
  let token = localStorage.getItem('token')
  let menusList = JSON.parse(localStorage.getItem('menusList'))
  //注意此处是登录后,有了左侧导航数据，再进行路由表动态加载
  if (token && menusList) {
    let newList = fn(menusList)
    console.log('路由表结构', newList);
    newList.forEach(item => {
      router.addRoute("Home", item)
    })
  }
}
// !!!注意此处在次调用1次动态路由,为了防止登录后跳转其它页面,刷新页面找不到问题。第2点注意，要在路由实例化后调用执行。
loadRoute()

// 白名单-意思是不需要token，就可直接进入的页面
const whiteList = ['/login', '/test', '/menu']

//路由拦截-1.先看看有没有登录过token值，如果登录过放行 2.没有登录在次判断是否在登录页面

router.beforeEach((to, from, next) => {
  //有token或没token
  let token = localStorage.getItem('token')
  //有token放行
  if (token) {
    next()
  }
  //注意这里没token又分2种情况 1.在登录页/或者其它不不需要token页面放行 2.否则去登录页
  else {
    // if(to.path=="/login"){
    if (whiteList.indexOf(to.path) != -1) {
      next()
    }
    else {
      next('/login')
    }
  }
})


export default router

/* 
一.动态路由如何实现？
1.在后台管理系统当中，我们的路由表一般分为 静态路由和动态路由。静态路由是在前台写死的,而动态路由是通过前端写js把树状结构转成列表结构动态填加进去的。
2.动态路由具体实现,在路由表里把那些常规路由(不需要权限的路由，事先都写到路由表里)。把需要权限的路由通过router.addRoute()动态填加到对应的子路由里 。
3.动态填加的路由需要处理下，因为后端传给你的是树状结构，前端需要把树结构处理成列表结构(通过递归，不断的获取路径,名字那些信息)，填加到路由表里。 

静态路由与动态路由优缺点-1.在中大型项目，采用的都是动态路由方式,因为后台导航目录运营人员可能会新增菜单,新增菜单后，前端人员得在路由表填加上，这样导航才能点击才能对应上页面,这样比较麻烦。如果是动态路由，运营人员新增目录后，因为我是动态路由获取永远是最新的路径，一次性通过动态填加的方式加进去,后边就不用管路由的事了,只关心页面就可以了。

二.动态路由实现常见问题
 1.第一次登录进去后,点击导航找不到路由问题?原因是路由表里还没有生成路由，因为生成动态路由的条件是必须登录后才能生成，而路由是最先执行，但是登录还没运行，造成找不到路由。解决办法：可在登录的时候在请求一次动态路由

 2.登录后跳转其它页面,如果刷新，页面找不到问题？原因是路由是动态的，它是在登录后生成的，而其它页面没有在次生成动态路由,所以就找不到。解决办法：可在路由里，在生成一遍动态路由。这样不管在后台哪个页面，一刷新都会先执行。

 以上两种方法要结合到一起。
 还有一种解决办法：就是把生成动态路由的方法，放到路由守卫里，只写一次也可以,因为路由守卫每次只要有路由都会执行。

*/