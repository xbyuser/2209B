import {http} from './index' //导入网络请求方法
export function getSwiper(){
    return http('home/swiperdata')
}