import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from '@/utils/auth' // 前端也可以主动处理过期时间(可有可无),增加双向安全性。不过一般都是由后端token来控制过期时间 。这块方法不用也可以
import md5 from 'md5'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {

    //这个项目后端要求请求头上headers上带着这些配置信息,code码,和日期戳，否则只有token不会返回数据
    const { icode, time } = getTestICode()
    config.headers.icode = icode
    config.headers.codeType = time


    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      //前端主动判断过期时间方法，不用也可以
      if (isCheckTimeout()) {
        // 登出操作
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 配置接口国际化
    config.headers['Accept-Language'] = store.getters.language
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 业务错误
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  error => {
    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

//实现code
function getTestICode() {
  const now = parseInt(Date.now() / 1000)
  // const code = now + 'LGD_Sunday-1991'
  const code = now + 'LGD_Sunday-1991-12-30'
  return {
    icode: md5(code),
    time: now
  }
}
export default service
