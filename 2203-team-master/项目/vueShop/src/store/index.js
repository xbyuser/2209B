import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// import vuexPersist from "vuex-persist"; //持久化插件
import { getLogin } from "@/api/api.js"

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    setLogin(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },

  },
  actions: {
    //登录-异步方法提交同步，接受外部传过来的值
    setLogin({ commit }, userinfo) {
      //走接口
      return new Promise((resolve, reject) => {
        getLogin(userinfo).then(res => {
          console.log(24, res);
          if (res.meta.status === 200) {
            commit('setLogin', res.data.token)
            resolve(res);
          }

        })
      })

    },
    //退出登录
    logOut({ commit }) {
      commit("setLogin", "");
      localStorage.removeItem('token')
      location.href = '/#/login'
    }
  },
  getters: {},
  modules: {},
  // plugins: [
  //   new vuexPersist({
  //     localstorage: window.localStorage,
  //   }).plugin,
  // ],
});
