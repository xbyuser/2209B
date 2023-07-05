// 专门处理权限路由的模块
import { publicRoutes, privateRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    // 路由表：初始拥有静态路由权限
    routes: publicRoutes
  },
  mutations: {
    /**
     * 增加路由
     */
    setRoutes(state, newRoutes) {
      // 永远在静态路由的基础上增加新路由
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     */
    filterRoutes(context, menus) {
      const routes = []
      // 路由权限匹配-遍历后端返回的路由表，从已有的或者叫静态路由表里过滤出路由表里需要的路由信息。因为后端返回的路径信息，只有名字，其它path,component都没有。所有需要重新组合
      console.log('25处理前,后端返的路由信息',menus);
      menus.forEach(key => {
        // 权限名 与 路由的 name 匹配
        routes.push(...privateRoutes.filter(item => item.name === key))
      })
      console.log('29处理后,路由表里要的路由信息',routes);
      // 最后添加 不匹配路由进入 404
      routes.push({
        path: '/:catchAll(.*)', // 不识别的path自动匹配404,相当于vue里的path:'*',redirect:'/404'
        redirect: '/404'
      })
      context.commit('setRoutes', routes)
      return routes
    }
  }
}
