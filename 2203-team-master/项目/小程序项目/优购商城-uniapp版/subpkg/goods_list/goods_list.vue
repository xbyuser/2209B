<template>
  <view class="goods-list">
    <view v-for="(goods,index) in goodsList" :key="index" @click="gotoDetail(goods)">
      <MyGoods :goods="goods"/>
    </view>
  </view>
</template>

<script>
  import MyGoods from "@/components/my-goods/my-goods.vue"
  export default {
    name:"GoodsList",
    components:{MyGoods},
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10,
        },
         // 商品列表的数据
        goodsList: [],
        // 总数量，用来实现分页
        total: 0,
         // 是否正在请求数据
        isloading: false
      };
    },
    onLoad(options){
      this.queryObj.query=options.query||''
      this.queryObj.cid=options.cid||''
      this.getGoodsList()
    },
    methods:{
      async getGoodsList(callback){
        this.isloading=true
        const {data:res}=await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        this.isloading=false
        if(res.meta.status!==200) return uni.$showMsg()
        this.goodsList=[...this.goodsList,...res.message.goods]
        this.total=res.message.total
        callback&&callback()
      },
      gotoDetail(goods){
        uni.navigateTo({
          url:`/subpkg/goods_detail/goods_detail?goods_id=${goods.goods_id}`
        })
      }
    },
    onReachBottom(){
      if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total) return uni.$showMsg('数据加载完毕!')
      if(this.isloading) return 
      this.queryObj.pagenum+=1
      this.getGoodsList()
    },
    onPullDownRefresh(){
      this.queryObj.pagenum=1
      this.queryObj.pagesize=10
      this.total=0
      this.isloading=false
      this.goodsList=[]
      this.getGoodsList(()=>{
        uni.stopPullDownRefresh()
      })
    },
    
  }
</script>

<style lang="scss">
</style>
