import axios from 'axios'
import router from '@/router'
import store from '@/store/index.js'

import {
    ElMessage,
    ElMessageBox
} from 'element-plus'

// 引入二次封装的 ElLoading
import {
    showLoading,
    hideLoading
} from '@/utils/loading'

const server = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,  //根据不同环境应用不同接口
    //  baseURL:"https://lianghj.top:8888/api/private/v1/", //线上接口
    timeout: 5000
})


// 前置拦截
server.interceptors.request.use(config => {
    // 开启 loading 效果
    showLoading()
    // 断网提示
    if (!navigator.onLine) {
        ElMessageBox.alert(
            '亲,好像出现了网络错误...',
            '温馨提示', {
            confirmButtonText: '好的',
            type: 'warning'
        }
        )
    }

    // 判断是否存在token,如果存在将每个页面的请求头 header 添加 token
    if (store.state.userInfo != null) {
        //注意如果后端token没有Bearer，可以自己拼接 'Bearer ' +token,要加空格
        config.headers.Authorization = store.state.userInfo.token
    }

    return config

}, error => {
    return Promise.reject(error)
})

// 定义常见错误状态码，用于响应失败后提醒用户
const errorHandler = (status, msg) => {
    switch (status) {
        case 400:
            ElMessage.error("亲,请求语法有问题，服务器无法识别");
            break;
        case 401:
            ElMessage.error("亲,客户端未授权该请求。缺乏有效的身份认证凭证");
            break;
        case 403:
            ElMessage.error("亲,服务器拒绝响应。权限不足");
            break;
        case 404:
            ElMessage.error("亲,URL无效或者URL有效但是没有资源");
            break;
        case 500:
            ElMessage.error(msg.message);
            break;
        default:
            ElMessage.error(msg);
            break;
    }
}

// 后置拦截
server.interceptors.response.use(res => {
    // console.log('响应成功',res);
    if (res.status == 200) {
        if (res.data.meta.status == 200) {

            ElMessage.success('亲,' + res.data.meta.msg)

        } else {
            ElMessage.error(res.data.meta.msg)
        }
    }
    //无效token-根据自己公司后台会单独定义无效状态码，不是固定值
    if (res.data.code == 40001) {
        ElMessageBox.confirm('亲,检测到登录状态失效...', '温馨提示', {
            confirmButtonText: '立即登录',
            cancelButtonText: '取消',
            type: "warning"
        })
            .then(() => {
                router.push("/login")
                ElMessage({
                    type: 'success',
                    message: '已跳转'
                });
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '已取消'
                });
            })
    }
    // 响应拦截进来隐藏loading效果,此处采用延时处理是合并
    // loading 请求效果,避免多次请求loading关闭又开启
    setTimeout(() => {
        hideLoading()
    }, 200)

    return res.data
},
    error => {
        // console.log('响应错误',error);
        const {
            response
        } = error;
        // 反馈异常状态
        errorHandler(response.status, response.data);
        setTimeout(() => {
            hideLoading()
        }, 200)
        return Promise.reject(error)

    })

export default server;
