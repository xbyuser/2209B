import store from '@/store'
// 检查权限
export default {
  methods: {
    // 如果有权限 就返回 true 没权限返回false
    checkPermission(code) {
      if (store.state.user?.userInfo?.roles?.points) {
        return store.state.user.userInfo.roles.points.some(item => item === code)
      }
      return false
    }
  }
}
