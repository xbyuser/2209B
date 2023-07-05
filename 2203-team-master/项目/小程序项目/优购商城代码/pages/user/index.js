// pages/user/index.js   
//全局app.js方法调用   var app=getApp();  console.log('全局方法调用',app)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    // 被收藏的商品的数量
    collectNums:0
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userinfo=wx.getStorageSync("userinfo");
    this.setData({userinfo});
  },
    // 退出登录
    loginOut() {
      wx.showModal({
        title: '确定退出?',
        cancelColor: '#9b9b9b',
        confirmColor: '#6dd457',
        success() {
          // wx.showToast({
          //   title: '退出成功',
          //   mask: true
          // })
          
          wx.removeStorageSync('token')
          wx.removeStorageSync('userinfo')
          // 关闭所有页面，打开到应用内的某个页面-相当于刷新
          wx.reLaunch({
            url: '/pages/user/index'
          })
    
        },
        
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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