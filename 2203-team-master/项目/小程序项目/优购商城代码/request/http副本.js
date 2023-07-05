//封装网络请求
export  function request(params){
    
    let baseUrl="https://api-hmugo-web.itheima.net/api/public/v1/"
     //小程序里实现请求拦截-需要token的页面,加入token
    //  let header={...params.header} //因为接口外面也可能传入header，所以在这声明个对象展开下
    //  if(params.url.includes('/my/')){
    //    header["Authorization"]=wx.getStorageSync("token");
    //    // console.log('header',header);
    //  }
    wx.showLoading({
      title: '加载中',
    })
    return  new Promise((resolve,reject)=>{
      wx.request({
        ...params, //代表其它前端传入的参数展开到这里，注意不能放到url后面，会有报错。因为url会覆盖，展开后
        url: baseUrl+params.url, //仅为示例，并非真实的接口地址
        header:{
          Authorization:wx.getStorageSync('token')
        },
        success (res) {
          resolve(res.data)
        },
        fail(err){
          reject(err)
        },
        //请求完成后,loading取消
        complete(){
             wx.hideLoading({
               success: (res) => {},
             })
        }

      }) 
   })
}

