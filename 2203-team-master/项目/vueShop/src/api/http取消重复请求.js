import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui' //在js文件中，需单独引入提示
import { addPendingRequest, removePendingRequest } from './cancelAxios.js' //取消重复请求

//思考：一.token过期问题如何处理?  1.我怎么知道过期了？后台去处理token过期问题,返回无效token或者过期状态码 2.过期了如何处置？在响应拦截器成功方法里,提醒用户, 跳转到登录页 
//二.接口出问题,服务器出问题响应失败了如何处理? 1.后端接口超时了，或者服务器找不到，通过在响应拦截器失败方法里提醒用户

const server = axios.create({
  // baseURL: 'http://127.0.0.1:8888/api/private/v1',
  // baseURL: "https://www.liulongbin.top:8888/api/private/v1/",
  baseURL: process.env.VUE_APP_API,  //配置多环境变量，解决开发和生产环境不断切换网址问题
  timeout: 5000
})
//请求拦截——可统一设置一些请求拦截,比如给请求头协议加token
var loading; //loading加载
server.interceptors.request.use(config => {
  //loading加载
  //  loading = Loading.service({
  //     lock: true,
  //     text: 'Loading',
  //     icon:'iconfont icon-loading',
  //     // spinner: 'iconfont icon-loading',
  //     background: 'rgba(0, 0, 0, 0.7)'
  // });

  //给请求头统一加token，不用每次进后台，每个页面都加了
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  // 检查是否存在重复请求，若存在则取消已发的请求
  removePendingRequest(config);
  // 把当前请求信息添加到pendingRequest对象中
  addPendingRequest(config);

  return config

}, error => {
  Promise.reject(error)
})
//响应拦截——可统一设置一些响应常见响应成功,响应错误信息提醒，比如token过期,
let flag = true //加个开关,解决token过期时刷新页面时重复提示
server.interceptors.response.use(res => {
  //  loading.close() //响应成功后关闭loading
  // console.log('响应拦截数据',res);  //返回的是promise
  //根据自己后端返回状态码，设置统一的错误提醒
  const code = res.data.meta.status || 200;
  //获取错误信息
  const msg = res.data.meta.msg
  //注意此处一般是判断状态码,因为此项目，后端没有单独定义状态码，所以判断的是返回信息
  if (msg === '无效token') {
    if (flag) {
      flag = false;
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).then(() => { //点击确定执行
        location.href = '/';
      }).catch(() => {  //点击取消执行,!!!这里要带着catch，捕捉未知错误信息
      });
    }
  }
  else if (code === 400 || code === 401 || code === 403 || code === 404 || code === 500) {
    Message.error({
      duration: 1000,
      message: msg
    })
  }
  // 从pendingRequest对象中移除请求
  removePendingRequest(res.config);

  return res.data

}, error => {
  console.log('50,error', error)
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
  // 从pendingRequest对象中移除请求
  removePendingRequest(error.config || {});
  if (axios.isCancel(error)) {
    console.log("已取消的重复请求：" + error.message);
  }

  return Promise.reject(error)
})
export default server