import {
    createStore
} from 'vuex'

import createPersistedState from "vuex-persistedstate";  //安装cnpm install --save vuex-persistedstate
import { menusList } from "@/http/api.js"

export default createStore({
    state: {
        userInfo: null,
        menuList: [],
    },
    mutations: {
        setUserInfo(state, data) {
            state.userInfo = data
        },

        setSignOut(state) {
            state.userInfo = null
            state.menuList = []
            state.buttonList = []
        },

        setMenuList(state, data) {
            if (data.length == 0) {
                state.menuList = null
            } else {
                state.menuList = data
            }
        },
    },
    getters: {
        getMenuList(state) {
            return state.menuList
        }
    },
    actions: {
        userInfos({
            commit
        }, data) {
            commit("setUserInfo", data)
        },

        signOuts({
            commit
        }) {
            commit("setSignOut")
        },

        getLists({
            commit
        }, data) {
            //请求左侧菜单接口
            menusList().then(res => {
                commit("setMenuList", res.data)
            })
        },
    },
    modules: {},
    plugins: [
        createPersistedState({
            storage: window.localStorage,
            key: "store",
            render(state) {
                return {
                    ...state
                };
            }
        })
    ]
})
