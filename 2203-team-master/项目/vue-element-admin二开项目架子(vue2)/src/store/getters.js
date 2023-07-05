const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 快捷访问
  token: state => state.user.token, // 向外界提供快捷的访问方式
  name: state => state.user.userInfo.username,
  userId: state => state.user.userInfo.userId,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  companyId: state => state.user.userInfo.companyId, // 建立对于user模块的companyId的快捷访问
  routes: state => state.permission.routes,
  companyName: state => state.user.userInfo.companyName,
  departmentName: state => state.user.userInfo.departmentName
}
export default getters
