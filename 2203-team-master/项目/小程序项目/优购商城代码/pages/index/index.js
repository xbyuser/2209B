// index.js
import { request } from '../../request/http.js'

// 获取应用实例
Page({
  data: {
    //轮播数据
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    //轮播数据
    swiperList: [
      {
        "image_src": "https://api-hmugo-web.itheima.net/pyg/banner1.png",
        "open_type": "navigate",
        "goods_id": 129,
        "navigator_url": "/pages/goods_detail/index?goods_id=129"
      },
      {
        "image_src": "https://api-hmugo-web.itheima.net/pyg/banner1.png",
        "open_type": "navigate",
        "goods_id": 129,
        "navigator_url": "/pages/goods_detail/index?goods_id=129"
      }
    ],
    //分类数据
    cateList: [
      {
        "name": "分类",
        "image_src": "https://api-hmugo-web.itheima.net/pyg/icon_index_nav_4@2x.png",
        "open_type": "switchTab",
        "navigator_url": "/pages/category/index"
      }
    ],
    //楼层数据
    floorList: [
      // {
      //     "floor_title": {
      //         "name": "时尚女装",
      //         "image_src": "https://api-hmugo-web.itheima.net/pyg/pic_floor01_title.png"
      //     },
      //     "product_list": [
      //         {
      //             "name": "优质服饰",
      //             "image_src": "https://api-hmugo-web.itheima.net/pyg/pic_floor01_1@2x.png",
      //             "image_width": "232",
      //             "open_type": "navigate",
      //             "navigator_url": "/pages/goods_list/index?query=服饰"
      //         },
      //         {
      //             "name": "春季热门",
      //             "image_src": "https://api-hmugo-web.itheima.net/pyg/pic_floor01_2@2x.png",
      //             "image_width": "233",
      //             "open_type": "navigate",
      //             "navigator_url": "/pages/goods_list/index?query=热"
      //         },
      //         {
      //             "name": "爆款清仓",
      //             "image_src": "https://api-hmugo-web.itheima.net/pyg/pic_floor01_3@2x.png",
      //             "image_width": "233",
      //             "open_type": "navigate",
      //             "navigator_url": "/pages/goods_list/index?query=爆款"
      //         },
      //         {
      //             "name": "倒春寒",
      //             "image_src": "https://api-hmugo-web.itheima.net/pyg/pic_floor01_4@2x.png",
      //             "image_width": "233",
      //             "open_type": "navigate",
      //             "navigator_url": "/pages/goods_list/index?query=春季"
      //         },
      //         {
      //             "name": "怦然心动",
      //             "image_src": "https://api-hmugo-web.itheima.net/pyg/pic_floor01_5@2x.png",
      //             "image_width": "233",
      //             "open_type": "navigate",
      //             "navigator_url": "/pages/goods_list/index?query=心动"
      //         }
      //     ]
      // },

    ],
    url: '',//跳转链接
  },
  onLoad() {
    this.getSwiperList()
    this.getFloorList()
  },
  //轮播数据-请求封装
  getSwiperList() {
    request({ url: 'home/swiperdata' }).then(res => {
      console.log('轮播数据', res);
      this.setData({
        swiperList: res.message
      })
    })
  },
  //楼层数据-请求封装
  getFloorList() {
    request({ url: 'home/floordata' }).then(res => {
      console.log('楼层数据', res);
      this.setData({
        floorList: res.message
      })
    })


  },
  //截取字符串两边,中间拼接,最终通过方法跳转
  getUrl(e) {
    let url = e.currentTarget.dataset.url //获取当前点击对象的事件信息
    console.log('原始url', url);
    url = url.substring(0, 17) + '/index' + url.substring(17)
    console.log('处理后url', url);
    wx.navigateTo({
      url: url
    })

  },


})
