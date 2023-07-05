/* 
wx原生方法上传——
1 点击 “+” 触发tap点击事件
  1 调用小程序内置的 选择图片的 wx.chooseImage
  2 获取到 图片的路径  数组
  3 把图片路径 存到 data的变量中
  4 页面就可以根据 图片数组 进行循环显示 自定义组件
2 点击图片删除
  1 获取被点击的元素的索引
  2 获取 data中的图片数组
  3 根据索引 数组中删除对应的元素
  4 把数组重新设置回data中
3 点击 “提交”
  1 获取文本域的内容 类似 输入框的获取
    1 data中定义变量 表示 输入框内容
    2 文本域 绑定 输入事件 事件触发的时候 把输入框的值 存入到变量中 
  2 对这些内容 合法性验证
  3 验证通过 用户选择的图片 上传到专门的图片的服务器 返回图片外网的链接
    1 遍历图片数组 
    2 挨个上传
    3 自己再维护图片数组 存放 图片上传后的外网的链接
  4 文本域 和 外网的图片的路径 一起提交到服务器-！！！注意，因为此处没接口,所以没有实现
  5 清空当前页面
  6 返回上一页 
 */
Page({
  data: {
    active: 0, //默认激活第1个
    //要上传的图片路径 数组
    chooseImgs: [],
    // 文本域的内容
    textVal: ""
  },
  // 点击 “+” 选择图片-把选择过的图片，存储到数组中
  handleChooseImg() {
       let that=this
        //1.调用本地相册
        wx.chooseImage({
          count: 9,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          //或者用箭头函数，这里对象的简写方式，this指向有问题
          success (res) {
            // tempFilePath图片的本地临时文件路径列表
            console.log('上传的文件流信息',res);
            const tempFilePaths = res.tempFilePaths  //本地路径
            //图片大小不要超过2M
            if (res.tempFiles[0].size > 1024 * 1024 * 2) {
              wx.showToast({
                  title: '图片请控制在2Mb以内'
              })
              return;
            } 
            that.setData({
              //把最新值跟老值合并下,防止覆盖
              chooseImgs:[...that.data.chooseImgs,...tempFilePaths] 
            })

          }
        })
  },
  // 点击 图片删除
  handleRemoveImg(e) {
      console.log('当前对象',e);
      let index=e.currentTarget.dataset.index   //target与currentTarget区别?
      // this.data.chooseImgs.splice(index,1)
      let {chooseImgs}=this.data
      chooseImgs.splice(index,1)
      this.setData({
         chooseImgs:chooseImgs
      })
  },
  // 文本域的输入的事件
  handleTextInput(e) {
  },
  // 提交按钮的点击-图片上传
  handleFormSubmit(){
    this.data.chooseImgs.forEach((item,index,arr)=>{
      wx.uploadFile({
        url: 'https://www.liulongbin.top:8888/api/private/v1/upload', //黑马后台图片上传接口
        header:{
          Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2Nzk0NDYzNjksImV4cCI6MTY3OTUzMjc2OX0.3QiSgri8iLJ275lJ3IUrbMKEiogD4oiBXG-1Wyqpe1Y'
        },
        filePath:item, //要的是字符串
        name: 'file', //后端要求的上传参数
        success (res){
          console.log('图片上传成功',res);
          //如果都上传成功了，最后提醒用户
          if(index==arr.length-1){
            wx.showToast({
              title: '图片上传成功',
            })
          }
        },
        fail (err){
          console.log('图片上传失败',err);
        },
      })   
    }) 

  }
})