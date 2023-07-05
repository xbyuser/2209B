/*
 * @author: sanbao
 * @Date: 2022-08-30 22:50:12
 */
import axios from 'axios'
import store from '../store'
import { ElMessage } from 'element-plus'
import router from '../router'
const instance = axios.create({
  baseURL: '/api',
  timeout: 10000
})
// 请求拦截
instance.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    Authorization: "Bearer " + store.state.user.token || ''
  }
  return config
}, err => {
  Promise.reject(err)
})
// 响应拦截
instance.interceptors.response.use(res => {

  // if (res.data.msg === '非法token') {
  //   store.commit('changeUser', { nickname: '', token: '' })
  //   router.push('/login')
  // }

  if (res.data.code === 0) {
    ElMessage({
      message: res.data.msg,
      type: 'success'
    })
  } else {
    // console.log(res);

    ElMessage({
      message: res.data,
      type: 'warning'
    })
  }
  return res
}, err => {
  Promise.reject(err)
})
export default instance
