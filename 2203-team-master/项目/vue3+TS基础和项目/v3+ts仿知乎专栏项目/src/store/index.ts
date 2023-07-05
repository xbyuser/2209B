/*
 * @author: sanbao
 * @Date: 2022-03-10 20:06:00
 */
import { createStore } from 'vuex'
import persist from 'vuex-persistedstate'
import { getuserlist } from '../utils/api'
// interface UserConfig {
//   token: string,
//   nickname: string
// }
interface UserConfig {
  nickName: string
  token: string
  column: string
  email: string
  _id: string
}

export default createStore({
  state: {
    user: <UserConfig>{
      token: '',
      nickName: '',
      _id: "",
      column: ""
    }
  },
  mutations: {
    async changeUser(state, user: UserConfig) {
      try {
        // console.log(user);

        state.user.token = user.token
        // console.log(state.user);
        // 如果登陆成功 有token  请求用户信息

        if (user.token) {
          const response = await getuserlist()
          // console.log(response.data);
          // 上传文章要   email  _id
          const { nickName, column, _id } = response.data
          state.user.nickName = nickName
          state.user.column = column
          state.user._id = _id
        } else {
          console.log(1);
          state.user.nickName = ''
          state.user.column = ''
          state.user._id = ''
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  actions: {
  },
  plugins: [persist()]
})
