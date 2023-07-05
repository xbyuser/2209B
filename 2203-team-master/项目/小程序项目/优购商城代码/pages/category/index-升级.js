// pages/category/index.js
// 思路：1.数据渲染-左侧遍历(map)出拿出数据中cat_name值进行存储，右侧根据左侧点击索引遍历相对应数据,默认渲染第1个 2.索引如何拿？给点击对象定义自定义属性,根据事件对象获取自定义属性值,去数据里找对应的下标 3.数据改变-通过this.setData({})
//对数据量大不常更新的数据进行缓存处理？-请求成功后存储数据，页面加载时读取数据,如果时间过期，重新请求数据

import {request} from '../../request/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //分类数据
    leftMenuList:[],
    // 右侧的商品数据
    rightContent: [],
    // 激活索引
    currentIndex: 0,
    
  },
  // 所有数据
  Cates: [
    {
      "cat_id": 1,
      "cat_name": "大家电",
      "cat_pid": 0,
      "cat_level": 0,
      "cat_deleted": false,
      "cat_icon": "/full/none.jpg",
      "children": [
          {
          "cat_id": 3,
          "cat_name": "电视",
          "cat_pid": 1,
          "cat_level": 1,
          "cat_deleted": false,
          "cat_icon": "/full/none.jpg",
          "children": []
          },
          {},
          {
          "cat_id": 30,
          "cat_name": "洗衣机",
          "cat_pid": 1,
          "cat_level": 1,
          "cat_deleted": false,
          "cat_icon": "/full/none.jpg",
          "children": [
          {
          "cat_id": 42,
          "cat_name": "洗衣机",
          "cat_pid": 30,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/d33bc76faf761d86692f6b79dbd5bdb007a6c060.jpg"
          },
          {
          "cat_id": 43,
          "cat_name": "滚筒洗衣机",
          "cat_pid": 30,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/4f083927b8062beb2e2a8e5fbcb956e07231e644.jpg"
          },
          {
          "cat_id": 44,
          "cat_name": "波轮洗衣机",
          "cat_pid": 30,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/2333a004401004514d43fc56bf3a08de3d6dee44.jpg"
          },
          {
          "cat_id": 45,
          "cat_name": "大容量洗衣机",
          "cat_pid": 30,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/e2459762678fe83b75b10dab705d9be2570d014c.jpg"
          },
          {
          "cat_id": 46,
          "cat_name": "迷你洗衣机",
          "cat_pid": 30,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/1fa57f855d15370a93c16c12b856fae164458c5b.jpg"
          },
          {
          "cat_id": 47,
          "cat_name": "双缸洗衣机",
          "cat_pid": 30,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/d8549a361e957132f07d7a9ebcee9bcf9adc12a1.jpg"
          },
          {
          "cat_id": 48,
          "cat_name": "干衣机",
          "cat_pid": 30,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/259207618f9cb1fda1fcb8f4ce16280bde8959de.jpg"
          },
          {
          "cat_id": 49,
          "cat_name": "洗衣机服务",
          "cat_pid": 30,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/ac69da199d085a7c59360686310697565ef8083e.jpg"
          },
          {
          "cat_id": 50,
          "cat_name": "西门子",
          "cat_pid": 30,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/b7c7741303e60a58bbc5ea6ad6679cd0c7f08ce7.jpg"
          },
          {
          "cat_id": 51,
          "cat_name": "海尔",
          "cat_pid": 30,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/d2a002e5912a0cf8e74352a9ea38e17e165ccc8d.jpg"
          },
          {
          "cat_id": 52,
          "cat_name": "小天鹅",
          "cat_pid": 30,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/3732a28271acaadbdedefb7445efae3aac1c3c81.jpg"
          }
          ]
          },
          {
          "cat_id": 53,
          "cat_name": "冰箱",
          "cat_pid": 1,
          "cat_level": 1,
          "cat_deleted": false,
          "cat_icon": "/full/none.jpg",
          "children": [
          {
          "cat_id": 57,
          "cat_name": "对开门冰箱",
          "cat_pid": 53,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/4b6bfa1646ca0beeb0acda07f77149bc1e3e7185.jpg"
          },
          {
          "cat_id": 58,
          "cat_name": "多门冰箱",
          "cat_pid": 53,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/51a4c3435e9445093fc172b65309089e6f8b2262.jpg"
          },
          {
          "cat_id": 59,
          "cat_name": "三门冰箱",
          "cat_pid": 53,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/9b4ef20a87083e32b189c49417c55d1e6d297c9a.jpg"
          },
          {
          "cat_id": 60,
          "cat_name": "十字对开门",
          "cat_pid": 53,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/941952a7134b6b1e342f25e774f2d926ce35f6a5.jpg"
          },
          {
          "cat_id": 61,
          "cat_name": "双门冰箱",
          "cat_pid": 53,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/ba282e17cf2bbbdac501aefc5be6fbd180bcd62c.jpg"
          },
          {
          "cat_id": 62,
          "cat_name": "冷柜/冰吧",
          "cat_pid": 53,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/30cc729fd6ec23960ef02786d7f9ed3e6527a349.jpg"
          },
          {
          "cat_id": 63,
          "cat_name": "商用冷柜",
          "cat_pid": 53,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/53f4290298db81aed79bd8b4cc97c019da49eb1b.jpg"
          },
          {
          "cat_id": 64,
          "cat_name": "海尔",
          "cat_pid": 53,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/d2a002e5912a0cf8e74352a9ea38e17e165ccc8d.jpg"
          },
          {
          "cat_id": 65,
          "cat_name": "西门子",
          "cat_pid": 53,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/b7c7741303e60a58bbc5ea6ad6679cd0c7f08ce7.jpg"
          },
          {
          "cat_id": 66,
          "cat_name": "容声",
          "cat_pid": 53,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/722b97ed263f975f3dc25e8ac94084c79cd44962.jpg"
          },
          {
          "cat_id": 67,
          "cat_name": "美菱",
          "cat_pid": 53,
          "cat_level": 2,
          "cat_deleted": false,
          "cat_icon": "https://api-hmugo-web.itheima.net/full/e55f3b4c84ebe797397537e2d92e4fd31482d398.jpg"
          }
      ]
      }
      ]
    },
    {
      "cat_id": 55,
      "cat_name": "热门推荐",
      "cat_pid": 0,
      "cat_level": 0,
      "cat_deleted": false,
      "cat_icon": "/full/none.jpg",
      "children": [
      {
      "cat_id": 69,
      "cat_name": "圣诞狂欢",
      "cat_pid": 55,
      "cat_level": 1,
      "cat_deleted": false,
      "cat_icon": "/full/none.jpg",
      "children": [
      {
      "cat_id": 72,
      "cat_name": "护肤套装",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/37e2413fad20445374180542fce4d06d0cb38545.jpg"
      },
      {
      "cat_id": 73,
      "cat_name": "面膜",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/7ca57e495705e7b60ac5cfc3f5c4d71d12341d72.jpg"
      },
      {
      "cat_id": 74,
      "cat_name": "巧克力",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/8d73f842d376174d88137fbe350bf59ac767477b.jpg"
      },
      {
      "cat_id": 75,
      "cat_name": "儿童玩具",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/9eec1c64ccbdd837606184ed00c2a611e5a0a2c2.jpg"
      },
      {
      "cat_id": 76,
      "cat_name": "童装童鞋",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/75fece9ce4698857628e2c42a0e752a26a50fb18.jpg"
      },
      {
      "cat_id": 77,
      "cat_name": "平板电脑",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/d2a821ebd29bad4bf687dc84cc6e092a1792c66f.jpg"
      },
      {
      "cat_id": 78,
      "cat_name": "笔记本",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/fd85e32427cfb12e312e4a1022898b3aa3321822.jpg"
      },
      {
      "cat_id": 79,
      "cat_name": "苹果手机",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/b4033ffe4dca02026431fe654aa929304defbc2e.jpg"
      },
      {
      "cat_id": 80,
      "cat_name": "小米手机",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/b0fef388cd035694eac75d7b53e4a1eebf041cf3.jpg"
      },
      {
      "cat_id": 81,
      "cat_name": "数码相机",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/8bd047f8eed61c47305dff3373890a7ef33e785f.jpg"
      },
      {
      "cat_id": 82,
      "cat_name": "耳机耳麦",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/cec82af42e24d626d82017f1698a3497038e9ebf.jpg"
      },
      {
      "cat_id": 83,
      "cat_name": "挂机空调",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/4b6f5f2964874da6851c1d96bcefaf3840c96d01.jpg"
      },
      {
      "cat_id": 84,
      "cat_name": "空气净化器",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/c28dbf9b72eeaf7150c5a2bade7dc35873db6e8e.jpg"
      },
      {
      "cat_id": 85,
      "cat_name": "洗衣机",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/5027b6e3f593d4625001644b419a24fffeb68191.jpg"
      },
      {
      "cat_id": 86,
      "cat_name": "4K超高清",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/fd99414907afb2e0382456b55ae051e51f9816f5.jpg"
      },
      {
      "cat_id": 87,
      "cat_name": "洗碗机",
      "cat_pid": 69,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/23001b342737d8952e135bdaf2eaa0a8a71c2fd5.jpg"
      }
      ]
      },
      {
      "cat_id": 1007,
      "cat_name": "冲锋衣",
      "cat_pid": 55,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/dec71b02fc79cd5c3cf2f596f5fc40f2ae90ba15.jpg"
      }
      ]
    },
  ],

  //点击tab进行切换
  handleItemTap(e){
    //事件对象参数可获取当前点击对象的信息
    console.log(e);
    const { index } = e.currentTarget.dataset;  
    let rightContent=this.Cates[index].children
    this.setData({
      rightContent 
    })
  },
  async getCates(){
    // 请求接口
     const res = await request({ url: "categories" });
     console.log('分类数据',res);
     this.Cates = res.message;
     //存储数据-性能更高
     wx.setStorageSync('cates', {time:Date.now(),data:res.message})
     
    let leftMenuList=this.Cates.map(item=>item.cat_name)
    let rightContent=this.Cates[0].children
    console.log(leftMenuList,rightContent);
    this.setData({
     // leftMenuList:leftMenuList
     leftMenuList,  //es6对象简写
     rightContent 
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //使用缓存数据条件-如果没缓存，就重新请求数据。除非缓存过期，也请求新数据，否则用老数据
    let cates=wx.getStorageSync('cates')
    if(!cates){
      this.getCates()
    }
    else{
        //过期时间超过24小时,重新请求数据
         if(Date.now()-cates.time>1000 * 60*60*24*10){
             this.getCates()
         }
         else{
            this.Cates=cates.data
            let leftMenuList=this.Cates.map(item=>item.cat_name)
            let rightContent=this.Cates[0].children
            console.log(leftMenuList,rightContent);
            this.setData({
            // leftMenuList:leftMenuList
            leftMenuList,  //es6对象简写
            rightContent 
          })
         } 
    }
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})