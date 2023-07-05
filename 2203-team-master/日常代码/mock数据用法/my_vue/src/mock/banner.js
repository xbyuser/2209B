import Mock from "mockjs" //引入mock插件
const mock = Mock.mock //调用生成数据方法
export default mock({
    // "data": {
        "message": [{
            "image_src": "https://api-hmugo-web.itheima.net/pyg/banner1.png",
            "open_type": "navigate",
            "goods_id": 129,
            "navigator_url": "/pages/goods_detail/index?goods_id=129"
        }, {
            "image_src": "https://api-hmugo-web.itheima.net/pyg/banner1.png",
            "open_type": "navigate",
            "goods_id": 129,
            "navigator_url": "/pages/goods_detail/index?goods_id=129"
        }, {
            "image_src": "https://api-hmugo-web.itheima.net/pyg/banner1.png",
            "open_type": "navigate",
            "goods_id": 129,
            "navigator_url": "/pages/goods_detail/index?goods_id=129"
        }, {
            "image_src": "https://api-hmugo-web.itheima.net/pyg/banner1.png",
            "open_type": "navigate",
            "goods_id": 129,
            "navigatocr_url": "/pages/goods_detail/index?goods_id=129"
        }],
        "meta": {
            "msg": "获取成功",
            "status": 200
        }
    // }
})