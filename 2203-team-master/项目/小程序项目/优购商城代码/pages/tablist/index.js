// pages/tablist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //tab的表头模拟数据
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       
  },
  //内容切换
  handleItemTap(e){
      //注意此处，e为发射过来的对象属性,里面有索引e.detail
      console.log('36发射过来的对象属性',e);
      let index=e.detail
      // let index=e.currentTarget.dataset.index
      this.data.tabs.forEach((item,i)=>{
         if(i==index){
             item.isActive=true
         }
         else{
            item.isActive=false
         }
      })
      //更新数据
      let {tabs}=this.data
      this.setData({
         tabs
      })
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