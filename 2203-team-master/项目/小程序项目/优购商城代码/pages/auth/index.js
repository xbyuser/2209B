import { getLogin } from "../../request/api.js"
// import { login } from "../../utils/asyncWx.js";

//小程序登录思路(非静默登录):1.通过wx.getUserProfile({})获取用户头像，同时得到4个加密串   2.通过wx.login({}) 获取code码 3.传入4个加密串和code码,请求自己后台登录接口wx.request({})，获得token存储到本地 。！！！注释appid小程序应用id，appsecret小程序应用秘钥。openid微信登录用户的身份证id
Page({
  data:{
    userInfo:''
  },
  getUserProfile(e) {
      //!!!注意2022年11月后,官方公告对于来自低于2.27.1版本的小程序通过 wx.getUserProfile 接口返回用户头像昵称，将以灰色和微信用户代替。不在返回你的头像和昵称。在公司项目中用该方法登录后，在让用户自已传头像和昵称，存储到后台
      //1.通过开放能力，获取用户信息  wx.getUserProfile({}) 弹出框
      wx.getUserProfile({
        desc: '用于完善会员资料', 
        success: (res) => {
        console.log('信息',res);
            wx.setStorageSync('userinfo',res.userInfo)
            let {encryptedData,iv,rawData,signature}=res
            //2.通过wx.login({}) 获取code码
            wx.login({
                success (res1) {
                console.log('code码',res1);
                  if (res1.code) {
                    let {code}=res1
                    //发起网络请求
                    getLogin({encryptedData,iv,rawData,signature,code}).then((res2)=>{
                         console.log('登录成功',res2);
                         wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
                       //回退
                        wx.navigateBack({
                            delta:1
                        })

                    })
                    


                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                }
              })

        }
      })
    }
    })














    // wx.getUserProfile({
    //     desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //     success: (res) => {
    //      console.log('获取用户信息',res);
    //      wx.setStorageSync('userinfo', res.userInfo) //登录页面要用的头像信息
    //      let {encryptedData,iv,rawData,signature}=res //换到token时用的
          
    //      //2.通过开放能力wx.login登录，获取code验证码,5分钟有效期
    //      wx.login({
    //         success (res1) {
    //            console.log('21code验证码',res1);
    //            let {code}=res1
    //           if (res1.code) {
    //             //发起网络请求
    //             request({url:'users/wxlogin',data:{encryptedData,iv,rawData,signature,code},method:'post'}).then(res2=>{
    //                     console.log(res2,25);
    //                     // wx.setStorageSync('token', res2.message.token)  //因为账号没有权限,返回msg: "Error: invalid code
    //                     //所以给它写死一个token
    //                     wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
                       
    //                     //成功后返回上一页面
    //                     wx.navigateBack({
    //                        delta:1
    //                     })
    //             })
    //           } else {
    //               wx.showToast({
    //                 title: '授权失败',
    //               })
    //           }
    //         }
    //       })


    //     }
    //   })
    //  },
  
// })