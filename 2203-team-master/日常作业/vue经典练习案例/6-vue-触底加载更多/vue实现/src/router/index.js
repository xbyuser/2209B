import Vue from 'vue'
import VueRouter from 'vue-router'
// import List from "@/views/List"
// import Detail from "@/views/Detail"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/list'
  },

  {
    path: '/List',
    name: 'List',
    component: () => import('../views/List.vue')
  },
  {
    path: '/Detail',
    name: "Detail",
    component: () => import("../views/Detail.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
