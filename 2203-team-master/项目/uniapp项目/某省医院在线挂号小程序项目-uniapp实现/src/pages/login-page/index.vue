<!--
 * :Author: Andy
 * :Date: 2022-09-27 00:40:52
 * :LastEditTime: 2022-12-10 15:34:07
 * :Description:
-->
<template>
  <view class="Login-page">
    <image
      mode="aspectFill"
      src="https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/denglu-yemian.jpg"
    ></image>
    <button @click="Login">授权登陆</button>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, toRefs } from "vue";
import { RequestApi } from "@/public/request";
// 授权登陆
function Login() {
  uni.getUserProfile({
    desc: "获取个人信息",
    success: (res) => {
      let { avatarUrl, nickName } = res.userInfo;
      // 获取code
      uni.login({
        success: (code) => {
          uni.showLoading({ title: "登陆中", mask: true });
          ApiLogin(avatarUrl, nickName, code.code);
        },
        fail: (err) => {
          uni.showToast({ title: "登录失败", icon: "none", duration: 1000 });
        },
      });
    },
    fail: (err) => {
      uni.showToast({ title: "登录失败", icon: "none", duration: 1000 });
    },
  });
}

// 调用api接口登陆
async function ApiLogin(avatarUrl: string, nickName: string, code: string) {
  try {
    let obj = {
      //修改成自己微信公众平台的appid和密钥
      appid: "wx90181aae40d571d5",
      secret: "0b8e701966f372a094e30639e9744ae4",
      avatarUrl,
      nickName,
      code,
    };
    let res: any = await RequestApi.WxLogin(obj);
    // 存储用户信息到本地缓存，然后返回上一页
    uni.setStorageSync("wxuser", res.data.data);
    setTimeout(() => {
      uni.navigateBack({ delta: 1 });
      uni.hideLoading();
    }, 600);
  } catch (error) {
    uni.showToast({ title: "登录失败", icon: "none", duration: 1000 });
  }
}
</script>

<style>
.Login-page {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.Login-page image {
  width: 100%;
  height: 100%;
}
.Login-page button {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 30%;
  background-color: #2c76ef;
  color: #ffffff;
  padding: 0 100rpx;
  font-size: 35rpx;
}
</style>
