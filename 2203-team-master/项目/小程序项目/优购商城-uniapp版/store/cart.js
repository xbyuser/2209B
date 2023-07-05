export default  {
  namespaced:true,
  state:{
    //{goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state}
    cart:uni.getStorageSync('cart')||[]
  },
  mutations:{
    addToCart(state,goods){
      const findResult =state.cart.find(item=>item.goods_id===goods.goods_id)
      if(!findResult){
        state.cart.push(goods)
      }else{
        findResult.goods_count++
      }
      this.commit('cart/saveToStorage')
    },
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    updateGoodsStart(state,goods){
      const findResult =state.cart.find(item=>item.goods_id===goods.goods_id)
      if(findResult){
        findResult.goods_state=goods.goods_state
        this.commit('cart/saveToStorage')
      }
    },
    updateGoodsCount(state,goods){
      const findResult =state.cart.find(item=>item.goods_id===goods.goods_id)
      if(findResult){
        findResult.goods_count=goods.goods_count
        this.commit('cart/saveToStorage')
      }
    },
    removeGoodsId(state,goods_id){
      state.cart=state.cart.filter(item=>item.goods_id !== goods_id)
      this.commit('cart/saveToStorage')
    },
    updateAllGoodsState(state,newState){
      state.cart.forEach(item=>item.goods_state=newState)
      this.commit('cart/saveToStorage')
    }
  },
  actions:{
    
  },
  getters:{
    total(state){
      // let sum=0
      // state.cart.forEach(item=>sum+=item.goods_count)
      // return sum
	  // console.log('51总价',typeof state.cart);
      return state.cart.reduce((total,item)=>total+=item.goods_count,0)
    },
    checkedCount(state){
      return state.cart.filter(item =>item.goods_state).reduce((total,key)=>total+=key.goods_count,0)
    },
    checkedGoodsAmount(state){
      return state.cart.filter(item =>item.goods_state).reduce((total,key)=>total+=key.goods_count*key.goods_price,0).toFixed(2)
    }
    
  }
}