import axios from 'axios'
import router from '@/router'
import store from '@/store/index.js'

import { Toast,Dialog } from 'vant'


const server = axios.create({
    baseURL: "http://backend-api-01.newbee.ltd/api/v1", 
    // baseURL:'/api',
    timeout: 5000
})

//头协议加token-注意这个项目的token跟正常的token不一样，它就是一个数字，不需要加Bearer协议
// axios.defaults.headers['token'] = localStorage.getItem('token')||''

// 前置拦截
server.interceptors.request.use(config => {
    
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      });
     //头协议加token-注意这个项目的token跟正常的token不一样，它就是一个数字，不需要加Bearer协议 
     config.headers['token'] = localStorage.getItem('token')||''
   
    // 断网提示
    if (!navigator.onLine) {
        Dialog.alert({
            title: '温馨提示',
            message: '亲,好像出现了网络错误...',
          }).then(() => {
            return
          })
    
    }

    return config

}, error => {
    return Promise.reject(error)
})



// 后置拦截
server.interceptors.response.use(res => {
        //响应成功
        if (res.status == 200) {
            if (res.data.resultCode == 200) {
                Toast.success(res.data.message)
               
            } else {
                Toast.fail(res.data.message);
            }
        }
        //无效token
        if (res.data.resultCode == 416) {
            Dialog.confirm({
                title: '温馨提示',
                message:
                  '亲,检测到登录状态失效,确定跳转登录...',
              })
                .then(() => {
                    router.push("/login")
                })
                .catch(() => {
                   return
                });
        }
        setTimeout(() => {
            Toast.clear()
        }, 200)
        
        return res.data
    },
    error => {
        setTimeout(() => {
            Toast.clear()
        }, 200)
        return Promise.reject(error)

    })

export default server;
