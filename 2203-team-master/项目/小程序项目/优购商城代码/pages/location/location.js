// pages/location/location.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0, // 使用 marker点击事件 需要填写id
        title: 'map', //标注点名
        scale: 16, //缩放范围
        mapMsg: '',
        latitude: 40.139174, //纬度
        longitude: 116.205735, //经度
        //marker属性——地图上添加markers–标注
        marker: [{
            id: 0,
            latitude: 40.139174, //纬度
            longitude: 116.205735, //经度
            iconPath: '/icons/home-o.png', //显示的图标        
            rotate: 0, // 旋转度数
            width: 20, //宽
            height: 20, //高
            title: '你在哪了', //标注点名
            alpha: 0.5, //透明度
            callout: { //自定义标记点上方的气泡窗口 点击有效  
                content: '北京首航蓝天学院', //文本
                color: '#ffffff', //文字颜色
                fontSize: 14, //文本大小
                borderRadius: 2, //边框圆角
                bgColor: '#00c16f', //背景颜色
                display: 'ALWAYS' //常显
            }
        }],
        scale: 16, //地图缩放程度
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
            //获取模糊位置演示
            wx.getFuzzyLocation({
                type: 'type',
                success: (result) => {
                    console.log('获取位置成功',result);
                    let {latitude, longitude}=result
                    this.setData({
                        latitude,
                        longitude
                    })
                },
                fail: (res) => {},
                complete: (res) => {},
            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})