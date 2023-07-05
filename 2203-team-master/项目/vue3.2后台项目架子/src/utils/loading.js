// 全局 loading 效果:合并多次 loading 避免重复
// 当调用一次 showLoading ,则次数+1,当次数为0时,则显示 loading
// 当调用一次 hideLoading ,则次数-1,当次数为0时,则结束 loading

import {
    ElLoading
} from 'element-plus'

// 定义一个请求次数的变量，用来记录当前页面总共请求的次数
let loadingRequestCount = 0
// 初始化loading
let loadingInstance

// 开启 loading 的函数,并且记录请求次数 ++
const showLoading = (target) => {
    if (loadingRequestCount == 0) {
        loadingInstance = ElLoading.service({
            target,
            text: "正在加载中...",
            background: "rgba(0,0,0,.1)"
        })
    }
    loadingRequestCount++
}

// 隐藏loading的函数,并且记录请求次数 --
const hideLoading = () => {

    if (loadingRequestCount > 0) {
        loadingRequestCount--
    }

    if (loadingRequestCount == 0) {
        loadingInstance.close()
    }
}

export {
    showLoading,
    hideLoading
}
