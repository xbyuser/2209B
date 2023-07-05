// 引入二次封装的 axios
import server from './request'

 // 登陆
export function  setLogin(params) {
        let data = server.post('/user/login', params)
        return data
 }
 //注册
export function  setRegister(params) {
        return server.post('/user/register', params);
}
//首页
export function  getIndex() {
     let data = server.get('/index-infos')
      return data
}

//详情页
export function getDetail(id) {
        return server.get(`/goods/detail/${id}`);
}

