// 引入二次封装的 axios
import server from './request'

// 登录模块
export function getLogin(msg){
    let data=server.post('/login',msg)
    return data
}
//左侧导航
export function menusList(){
    let data =  server.get('/menus')
    //在每个接口中,都是可以配置请求头的
    // let token=localStorage.getItem('token')
    // let data=server({url:'/menus',method:'get',headers:{'Authorization':token}})
    return data
}

