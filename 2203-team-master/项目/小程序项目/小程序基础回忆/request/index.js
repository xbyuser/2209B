export function http(url, params) {
  let baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1/'
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      // data:{},
      // method:'post',
      ...params,
      header:{
        Authorization:wx.getStorageSync('token') 
      },
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      },
      complete(){
           console.log('请求完成了');
           wx.hideLoading()
      }
    })
  })


}