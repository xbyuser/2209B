<template>
  <view class="search-box">
    <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchRsults.length!==0">
      <view class="sugg-item" v-for="(item,index) in searchRsults" :key="index" @click="gotoDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clear"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,index) in histories" :key="index" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:'SearchRsult',
    data() {
      return {
        timer:null,
        kw:'',
        searchRsults:[],
        historyList:[]
      };
    },
    onLoad(){
      this.historyList=JSON.parse(uni.getStorageSync('kw')||'[]')
    },
    computed:{
      histories(){
        return [...this.historyList].reverse()
      }
    },
    methods:{
      input(e){
        clearTimeout(this.timer)
        this.timer=setTimeout(()=>{
          this.kw=e
          this.getSearchResults()
        }, 500);
      },
      async getSearchResults(){
        if(this.kw.trim()===''){
          this.searchRsults=[]
          return
        }
        const {data:res}=await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
        if(res.meta.status!==200)return uni.$showMsg()
        this.searchRsults=res.message
        this.saveSearchHistory()
      },
      gotoDetail(item){
        uni.navigateTo({
          url:`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
        })
      },
      saveSearchHistory(){
        const set=new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList=Array.from(set)
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      clear(){
        uni.setStorageSync('kw','')
        this.historyList=[]
      },
      gotoGoodsList(item){
        uni.navigateTo({
          url:`/subpkg/goods_list/goods_list?query=${item}`
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-box{
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .sugg-list{
    padding: 0 5px;
    .sugg-item{
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-name{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }
  .history-box{
    padding: 0 5px;
    .history-title{
      justify-content: space-between;
      align-items: center;
      display: flex;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }
    .history-list{
      display: flex;
      flex-wrap: wrap;
      .uni-tag{
        margin-top: 5px;
        margin-right: 5px;
        padding: 0 10px;
        background-color: #ffaa00;
      }
    }
  }
</style>
