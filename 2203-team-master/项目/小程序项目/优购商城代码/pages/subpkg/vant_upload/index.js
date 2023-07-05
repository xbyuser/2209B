/* 
图片上传流程-1.后台提供上传接口，前端进行上传，通过file文件form-data文件流形式给后台。上传成功后台返回临时路径与正式地址。前端做删除，预览，提交时都要用到
 */
Page({
  data: {
    // 被选中的图片路径 数组
    fileList: [],
  },
  // 文件上传完毕后会触发
  afterRead(e) {
    console.log('上传的文件流',e);
    const { file } = e.detail;
     let {fileList} =this.data
     fileList.push(file)
      this.setData({
        fileList:fileList
      })
 
  },
  //文件删除操作
  delete(e) {
    console.log('当前点击对象',e);
    const {index} = e.detail
    const { fileList } = this.data
    fileList.splice(index, 1)
    this.setData({
      fileList
    })
  },
  //提交方法-最终提交时-把上传的图片列表和其它数据一起提交给接口
  handleFormSubmit(){
    let that = this;
    this.data.fileList.forEach((item,index,arr)=>{
      wx.uploadFile({
        url: 'https://lianghj.top:8888/api/private/v1/upload', //黑马后台图片上传接口
        header:{
          Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2Njk1MzAxMzksImV4cCI6MTY2OTYxNjUzOX0.9phik7tLzcAIr8loxHgjOZV9PZvfpcXrWqMdL0flXlY'
        },
        filePath:item.url,  //要的是字符串
        name: 'file',
        success: (res) => {
          console.log('上传成功数据',res);
          let code=JSON.parse(res.data)
          console.log(44,code);
          if(code.meta.status==200){
            if(index==arr.length-1){
                wx.showToast({
                  title: '上传成功'
                });
               }
          }
          else{
            wx.showToast({
                title: code.meta.msg,
              });
          }
        
        },
        fail: (fail) => {
          console.log('上传失败数据',fail);
        },
      })
     
    })
   
  }
})