<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <!-- open-type="getUserInfo" @getuserinfo="getUserInfo" -->
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <view class="tips-text">
      登录后尽享更多权益!
    </view>
  </view>
</template>

<script>
  import {mapMutations,mapState} from 'vuex';
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    methods:{
      ...mapMutations('user',['updateUserInfo','updateToken','updateRedirectInfo']),
      getUserProfile(e) {
          // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
          // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
          wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
             if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
             this.updateUserInfo(res.userInfo)
             this.getToken(res)
            }
          })
        },
      async getToken(info){
        const [err,res]=await uni.login().catch(err=>err) //获取code
        if(err||res.errMsg!=='login:ok')return uni.$showMsg('登录失败!')
        // 准备参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        console.log('登录信息',loginResult);
		
		//因为咱们的开发者账号没有权限，所以接口不会返回token。可以写死一个接口文档里的token
        // this.updateToken(loginResult.message.token)
		this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
		
		uni.$showMsg('登录成功!')
		this.navigateBack()
      },
      navigateBack(){
        if(this.redirectInfo&&this.redirectInfo.openType==='switchTab'){
          uni.switchTab({
            url:this.redirectInfo.from,
            complete:()=>{
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    },
    computed:{
      ...mapState('user',['redirectInfo'])
    }
  }
</script>

<style lang="scss">
.login-container{
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow:hidden;
  &:after{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateY(50%);
    content: '';
    display: block;
    width: 100%;
    height: 40px;
    background-color: #fff;
    border-radius: 100%;
  }
  .btn-login{
    width: 90%;
    background-color: #c00000;
    border-radius: 100px;
    margin: 15px 0;
  }
  .tips-text{
    font-size: 12px;
    color: gray;
  }
}
</style>