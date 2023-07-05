import { request } from "../../request/http.js"
import { login } from "../../utils/asyncWx.js";

Page({
  data:{
    userInfo:''
  },
  //获取用户头像信息新方法
  getUserProfile(e){
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('getUserProfile用户信息',res);
        this.setData({
          userInfo: res.userInfo,
        })
        //存储下用户信息
        wx.setStorageSync("userinfo", res.userInfo);

        //调用获取token方法
        this.handleGetUserInfo(res)
         
        //回到上页
        wx.navigateBack({
          delta: 1
        });
       
      }
    })
  },
  // 获取用户信息
   async handleGetUserInfo(e) {
    try {
    console.log('getUserInfo用户信息',e);
    // 1 获取用户信息
    const { encryptedData, rawData, iv, signature } = e;
    // 2 获取小程序登录成功后的code
    const { code } = await login();
    const loginParams={ encryptedData, rawData, iv, signature ,code};
   //  3 发送请求 获取用户的token
    const {token}=await request({url:"/users/wxlogin",data:loginParams,method:"post"}); 
    console.log('token信息',token); //后台接口token不能用，因为咱们这个开发者账号没有在人家后台填加

    // 4 把token存入缓存中 同时跳转回上一个页面 
    // wx.setStorageSync("token", token);  //后台接口不能用了
    //写死一个token模拟下
    wx.setStorageSync("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"); 
     
  
    } catch (error) {
      console.log(error);
    }
  }
})