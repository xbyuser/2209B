import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
    //配置持久化的插件数据
import vuexPersist from 'vuex-persist';

//创建对象配置持久化
const vuexLocal = new vuexPersist({
    //定义本地存储的方式，sessionStorage或localStorage
    storage: window.localStorage,
});

import { login } from "@/api/login.js"

export default new Vuex.Store({
    state: {

    },
    mutations: {


    },
    actions: {

    },

    getters: {

    },
    //配置插件持久化的插件值
    plugins: [vuexLocal.plugin]
})