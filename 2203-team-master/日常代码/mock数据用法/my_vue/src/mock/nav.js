import Mock from "mockjs" //引入mock插件
const mock = Mock.mock //调用生成数据方法
export default mock({
    // "data": {
        "message": [{
                "name": "分类",
                "image_src": "https://api-hmugo-web.itheima.net/pyg/icon_index_nav_4@2x.png",
                "open_type": "switchTab",
                "navigator_url": "/pages/category/index"
            },
            {
                "name": "秒杀拍",
                "image_src": "https://api-hmugo-web.itheima.net/pyg/icon_index_nav_3@2x.png"
            },
            {
                "name": "超市购",
                "image_src": "https://api-hmugo-web.itheima.net/pyg/icon_index_nav_2@2x.png"
            },
            {
                "name": "母婴品",
                "image_src": "https://api-hmugo-web.itheima.net/pyg/icon_index_nav_1@2x.png"
            },
            {
                "name": "测试是否模拟数据",
                "image_src": "https://api-hmugo-web.itheima.net/pyg/icon_index_nav_1@2x.png"
            }
        ],
        "meta": {
            "msg": "获取成功",
            "status": 200
        }
    // }
})