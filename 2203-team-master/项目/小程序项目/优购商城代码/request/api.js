//所有接口
import {request} from './http.js'

// 首页模块接口  http({url:'',method:'',data:{}})
const getSwiper= (msg)=>{
   let data= request({url:'home/swiperdata',method:'get',data:msg})
   return data
}

const getShopLsit= (msg)=>{
   let data= request({url:'goods/search',method:'get',data:msg})
   return data
}

//登录接口
const getLogin= (msg)=>{
    let data= request({url:'users/wxlogin',method:'post',data:msg})
    return data
 }

export { getSwiper,getShopLsit,getLogin }
