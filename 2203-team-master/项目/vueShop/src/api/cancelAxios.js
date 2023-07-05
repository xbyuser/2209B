// 参考文章——axios如何取消重复请求?  https://blog.csdn.net/qq_41809113/article/details/122330451
//总体思路，怎么判断url是重复的,重复后如何取消？-1.通过es6 new Map(url,get或post请求方式,参数拼接在一起)去重，判断重复后在响应拦截器里删除那些多余的，留下最后一个 2.在通过axios里有个方法 axios.cancelToken 取消网络请求
import axios from 'axios'
// 函数返回唯一的请求key
function getRequestKey(config) {
    let {
        method,
        url,
        params,
        data
    } = config;
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join("&");
}

// 添加请求信息
let pendingRequest = new Map();

function addPendingRequest(config) {
    let requestKey = getRequestKey(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pendingRequest.has(requestKey)) {
            pendingRequest.set(requestKey, cancel);
        }
    });
}

// 取消重复请求，移除重复请求信息
function removePendingRequest(config) {
    let requestKey = getRequestKey(config);
    if (pendingRequest.has(requestKey)) {
        // 如果是重复的请求，则执行对应的cancel函数
        let cancel = pendingRequest.get(requestKey);
        cancel(requestKey);
        // 将前一次重复的请求移除
        pendingRequest.delete(requestKey);
    }
}

export {
    addPendingRequest,  // 把当前请求信息添加到pendingRequest对象中
    removePendingRequest  // 检查是否存在重复请求，若存在则取消已发的请求
}