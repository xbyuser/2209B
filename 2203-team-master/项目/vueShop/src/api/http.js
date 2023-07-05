import axios from 'axios'
import { MessageBox, Message } from 'element-ui' //在js文件中，需单独引入提示
import router from "@/router";

const server = axios.create({
  // baseURL: 'http://127.0.0.1:8888/api/private/v1', //本地接口 -开发环境
  // baseURL: "https://lianghj.top:8888/api/private/v1/", //线上接口 -生产环境，测试环境(node环境统一版本)
  baseURL: process.env.VUE_APP_API,  //多环境变量配置？根据不同环境应用不同接口
  timeout: 5000
})
//请求拦截-加token,loading,
server.interceptors.request.use(config => {
  //给请求头统一加token，不用每次进后台，每个页面都加了
  // console.log(13, config);
  let token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
  Promise.reject(error)
})
//响应拦截-错误状态码,无效token处理
server.interceptors.response.use(res => {
  //如何处理token过期问题？1.需要后台响应值告诉你，一般后台会自定义一个状态码40001,或者返回无效token,token过期等 2.提醒用户登录过期,返回登录页面
  console.log('响应成功数据', res);
  // let msg=res.data.meta.msg
  // let code=res.data.meta.status
  //es6 解构下
  let { data: { meta: { msg, status } } } = res
  console.log(29, msg, status);
  if (msg == "无效token") {
    console.log(32, this);
    MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录?', '提示', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      //点击重新登录后，跳转到登录页
      router.push('/login')
      //js原生 location对象里的方法，href操作url路径
      // console.log(42, location);
      // location.href = '#/login'

    }).catch(() => {
      //点击取消，不处理
    });
  }

  //对错误状态码进行精细控制
  else if (status === 400 || status === 401 || status === 403 || status === 404 || status === 500) {
    Message({
      type: 'error',
      duration: 1000,
      message: msg
    })
  }

  return res.data

}, error => {
  //接口请求，响应错误-一般都是网络问题，进行处理
  console.log('响应错误', error);
  let { message } = error;
  if (message == "Network Error") {
    message = "后端接口连接异常";
  }
  else if (message.includes("timeout")) {
    message = "系统接口请求超时";
  }

  Message({
    message: message,
    type: 'error',
    duration: 1000
  })

  Promise.reject(error)

})
export default server