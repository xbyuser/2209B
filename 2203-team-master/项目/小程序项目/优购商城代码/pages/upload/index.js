// pages/feedback/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        list: ["功能建议", "购买遇到问题", "性能问题", "其他"],
        index1: -1,
        value: '',
        imglist: [], //被选中的图片路径
        imgurl: [], //网络图片地址
        history: []
    },
    // tab切换
    ontap(e) {
        console.log(e);
        this.setData({
            index1: e.currentTarget.dataset.index
        })
    },

    handleTextInput(e) {
        this.setData({
            value: e.detail.value
        })
    },
    // 选择图片
    handleChooseImg() {
        wx.chooseImage({
            // 同时选中的图片的数量
            count: 10,
            sizeType: ['original', 'compressed'],
            // 图片的来源  相册     相机
            sourceType: ['album', 'camera'],
            success: (res) => {
                console.log(11111,res);
                let arr = this.data.imglist
                arr.push(...res.tempFilePaths)
                this.setData({
                    imglist: arr
                })
                console.log(this.data.imglist)
            }
        })
    },
    //删除图片
    delete(e) {
        console.log(e);
        let index = e.currentTarget.dataset.index;
        let arr = this.data.imglist;
        arr.splice(index, 1);
        this.setData({
            imglist: arr
        })
    },
    //提交内容-！！！注意所有图片都提交成功，在提醒用户。这里用了咱们那个后台项目上传图片接口
    add() {
        let option = this.data.list[this.data.index1]
        let value = this.data.value
        let imgs = this.data.imglist
        if (option == "" || value == "" || imgs == "") {
            wx.showToast({
                title: '请输入内容',
                icon: "error"
            })
            return
        }
        wx.showLoading({
            title: "正在上传中...",
            mask: true
        });
        wx.request({
            url: 'https://www.liulongbin.top:8888/api/private/v1/login',
            method: "post",
            data: {
                username: "admin",
                password: "123456"
            },
            success: res => {
                console.log("token", res.data.data.token);
                imgs.forEach((item, index) => {
                    wx.uploadFile({
                        url: "https://www.liulongbin.top:8888/api/private/v1/upload",
                        method: "POST",
                        header: {
                            Authorization: res.data.data.token
                        },
                        // 本地图片路径
                        filePath: item,
                        name: "file",
                        success: (res) => {
                            console.log(1111, res);
                            // 获取网络地址
                            let url = JSON.parse(res.data).data.url
                            this.data.imgurl.push(url);
                            console.log('网络图片', this.data.imgurl);
                            //！！！注意所有图片都提交成功，在提醒用户
                            if (index == imgs.length - 1) {
                                wx.hideLoading();
                                wx.showToast({
                                    title: '提交成功',
                                    duration: 1000,
                                    success: res => {
                                        let arrs = []
                                        arrs.push({
                                            option: option,
                                            value: value,
                                            imgs: imgs,
                                            imgurl: this.data.imgurl
                                        })
                                        let brr = wx.getStorageSync('imgsurl') || []
                                        arrs.forEach(item => {
                                            brr.push(item)
                                        })
                                        console.log("本地存储信息", brr);
                                        this.setData({
                                            index1: -1,
                                            value: '',
                                            imglist: [],
                                            imgurl: [],
                                        })
                                        wx.setStorageSync('imgsurl', brr)
                                        setTimeout(function () {
                                            wx.navigateBack({
                                                delta: 1,
                                            })
                                        }, 1000)
                                    }
                                })
                            }
                        }
                    })
                })
            }
        })

    },
    //预览图片
    onimg(e) {
        console.log(e);
        var src = e.currentTarget.dataset.src;//获取data-src
        var imglist = e.currentTarget.dataset.list;//获取data-list
        //图片预览
        wx.previewImage({
        current: src, // 当前显示图片的链接
        urls: imglist // 需要预览的图片列表
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
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let history = wx.getStorageSync('imgsurl')
        this.setData({
            history: history
        })
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