import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'
const state = {
  token: getToken(), // 初始值应该默认从本地缓存去获取
  userInfo: {} // 这里不给null 给一个空对象
}

const mutations = {
  // 设置token
  setToken(state, payload) {
    // 设置token
    state.token = payload // 此时认为payload就是传过来的token
    // 应该同步修改本地缓存的数据-调用cookie了，没有用本地存储
    setToken(payload)
    // localStorage.setItem('token', payload)
  },

  // 删除token
  removeToken(state) {
    state.token = null // 清除Vuex中的token
    removeToken() // 删除本地缓存的token
  },
  // 设置用户状态
  updateUserInfo(state, payload) {
    state.userInfo = payload
  },
  // 清空用户状态
  removeUserInfo(state) {
    state.userInfo = {}
  }

}

const actions = {
  // 登录action - 第二个参数传进来的是 手机号和密码
  async login(context, data) {
    const result = await login(data) // 得到result
    // 此时表示登录成功
    context.commit('setToken', result) // 设置token到vuex
  },
  async getUserInfo(context) {
    const result = await getUserInfo() // result就是用户资料 userId
    const baseInfo = await getUserDetailById(result.userId)
    context.commit('updateUserInfo', { ...result, ...baseInfo }) // 更新到状态中
    return result // 伏笔 后面的操作会用到该result
  },
  // 登出操作
  logout({ commit }) {
    commit('removeToken')
    commit('removeUserInfo')
    resetRouter()
    // 退出的时候 routes数据在permission
    commit('permission/setRoutes', [], { root: true }) // root为true表示提交根的mutaions
    // Vuex 子模块如何调用另外一个子模块的mutations
    // root: true  commit就不再是子模块的commit了 而是父模块的commit
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
