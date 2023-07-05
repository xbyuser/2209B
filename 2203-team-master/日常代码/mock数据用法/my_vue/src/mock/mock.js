import Mock from 'mockjs'
import banner from './banner.js'
import nav from "./nav.js"
//设置mock的请求超时时间
Mock.setup({
    timeout: '1000-5000'
})
//单个数据演示
// const mock = Mock.mock('https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata', {
//     "data": {
//         "message": [{
//             "image_src": "https://api-hmugo-web.itheima.net/pyg/banner1.png",
//             "open_type": "navigate",
//             "goods_id": 129,
//             "navigator_url": "/pages/goods_detail/index?goods_id=129"
//         }, {
//             "image_src": "https://api-hmugo-web.itheima.net/pyg/banner1.png",
//             "open_type": "navigate",
//             "goods_id": 129,
//             "navigator_url": "/pages/goods_detail/index?goods_id=129"
//         }, {
//             "image_src": "https://api-hmugo-web.itheima.net/pyg/banner1.png",
//             "open_type": "navigate",
//             "goods_id": 129,
//             "navigator_url": "/pages/goods_detail/index?goods_id=129"
//         }, {
//             "image_src": "https://api-hmugo-web.itheima.net/pyg/banner1.png",
//             "open_type": "navigate",
//             "goods_id": 129,
//             "navigatocr_url": "/pages/goods_detail/index?goods_id=129"
//         }],
//         "meta": {
//             "msg": "获取成功",
//             "status": 200
//         }
//     }
// })
// export default mock



//多个数据演示

const mock = Mock.mock('https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata', banner)
const mock1 = Mock.mock('https://api-hmugo-web.itheima.net/api/public/v1/home/catitems', nav)
export {
    mock,
    mock1
}