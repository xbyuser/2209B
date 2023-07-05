import {
  createStore
} from 'vuex'

import createPersistedState from "vuex-persistedstate";  //安装cnpm install --save vuex-persistedstate
import api from "@/http/api.js"

export default createStore({
  state: {
      userInfo: null,
      menuList: [],
      buttonList: [],
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

      setButtonList(state, data) {
          state.buttonList = data
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
          api.getMenu().then(res => {
              commit("setMenuList", res.data.menuList)
              commit("setButtonList", res.data.btnList)
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
