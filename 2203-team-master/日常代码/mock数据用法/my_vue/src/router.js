import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import router from "./router"

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/About.vue'),

        },
        //本页面演示mock数据用法
        {
            path: '/',
            name: 'index',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/index.vue'),
        },
    ]
})