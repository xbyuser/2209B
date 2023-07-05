export default {
  namespaced:true,
  state:{
    address:JSON.parse(uni.getStorageSync('address')||'{}'),
    token:uni.getStorageSync('token')||'',
    userInfo:JSON.parse(uni.getStorageSync('userInfo')||'{}'),
    redirectInfo:null
  },
  mutations:{
    updateAddress(state,address){
      state.address=address
      this.commit('user/saveAddressToStorage')
    },
    saveAddressToStorage(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    updateUserInfo(state,userInfo){
      state.userInfo=userInfo
      this.commit('user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state){
      uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
    },
    updateToken(state,token){
      state.token=token
      this.commit('user/saveTokenToStorage')
    },
    saveTokenToStorage(state){
      uni.setStorageSync('token',state.token)
    },
    updateRedirectInfo(state,info){
      state.redirectInfo=info
    }
  },
  getters:{
    addstr(state){
      // if(!state.address.provinceName)return ''
      // return `${state.address.provinceName}${state.address.cityName}${state.address.countyName}${state.address.detailInfo}`
	  
	  //因为获取收货地址，需要申请权限。所以这里写死了
	   return '北京市海淀区清华大学2号楼'
    }
  }
}