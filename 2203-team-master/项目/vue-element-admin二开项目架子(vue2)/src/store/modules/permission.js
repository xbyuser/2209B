import { constantRoutes, asyncRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: constantRoutes // 将静态路由设置为state的初始值
  },
  mutations: {
    setRoutes(state, payload) {
      state.routes = [...constantRoutes, ...payload] // 静态路由 + 动态路由 才是当前用户的能够访问的页面
      // 张三 访问 3个页面  静态路由 + 3个页面  李四
    }
  },
  actions: {
    // 筛选路由
    filterRoutes(context, menus) {
      // asyncRoutes 所有的动态路由
      // menus是当前用户所能访问的标识
      const newRoutes = [] // 存储当前用户所拥有的权限路由
      menus.forEach(key => {
        // key标识
        // 洒
        newRoutes.push(...asyncRoutes.filter(item => item.name === key))
      })
      // newRoutes 筛选出来了
      // console.log('25筛选后的路由', newRoutes);
      context.commit('setRoutes', newRoutes) // 只是用于左侧菜单显示

      return newRoutes // 给router用的
    }

  }
}
