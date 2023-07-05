import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 会和 请求的url 拼接到一起   /api/sys/login
  timeout: 10000 // 超时时间
})
service.interceptors.request.use((config) => {
  // 统一注入token
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config // config是请求的一些配置参数 url data 默认配置
}, (error) => {
  return Promise.reject(error) // 只要reject就会进入catch
}) // 请求拦截器

service.interceptors.response.use((response) => {
  // response数据 默认加了一层data
  const { message, success, data } = response.data
  if (success) {
    return data
  } else {
    // 此时意味着失败了
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, (error) => {
  // 判断失败是不是10002(业务状态吗) /401 http状态吗
  if (error.response.data.code === 10002) {
    // 此时说明token超时了
    store.dispatch('user/logout')
    // 跳回到登录页
    router.push('/login')
  }
  Message.error(error.message)
  return Promise.reject(error) // 直接返回promise的错误 改变当前的状态 为失败
}) // 响应拦截器

export default service
