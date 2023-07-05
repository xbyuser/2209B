import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404']
// 前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开启进度条
  // to哪里去- { path: 地址 }
  // from从哪里来
  // next 必须执行的回调函数
  // next() 放行
  // next(地址) 跳转
  // next(false) 中止跳转
  if (store.getters.token) {
    if (to.path === '/login') {
      // 去的是登录页
      next('/') // 跳到主页
    } else {
      // 判断是否已经获取过资料
      if (!store.getters.userId) {
        // 获取用户资料
        const { roles: { menus } } = await 
		store.dispatch('user/getUserInfo') // 需要获取完资料之后 再跳转
        // menus要筛选路由
        const newRoutes = await 
		store.dispatch('permission/filterRoutes', menus)
        console.log('27根据后台数据筛选出的路由表', newRoutes);
          //！！！注意 router.addRoutes方法在vue3中被去除了，可用
		  addRoute方法进行循环遍历
		  newRoutes.forEach(item=>router.addRoute(item))。如果有父组件
		  ，第一个参数是父组件名字addRoute('父组件Name名',item)
        router.addRoutes([...newRoutes, { path: '*', redirect: '/404', 
		hidden: true }]) // 添加动态路由到当前的路由实例中
        next(to.path) // 这里为什么要这么干 - addRoutes是一个异步操作 
		如果直接next() 跳不过去 所以 加一个中转
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

// 后置守卫

router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
