  import {mapGetters} from 'vuex'
  
  
  export default{
    computed:{
      ...mapGetters('cart',['total'])
    },
    onShow(){
      this.setBadge()
    },
    watch:{
      total(newValue){
        this.setBadge()
      }
    },
    methods: {
      setBadge() {
        uni.setTabBarBadge({
          index:2,
          text:this.total+''
        })
      }
    }
  }
  