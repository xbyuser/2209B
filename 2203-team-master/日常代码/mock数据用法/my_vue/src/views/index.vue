<template>
  <div v-if="dataList.length>0">
     <h2>mock请求数据演示</h2>
     <li v-for="(item,index) in dataList" :key="index">
       {{item.name}}
     </li>
  </div>
</template>

<script>
import {list} from "@/api/login.js";
export default {
  data() {
    return {
      //简单数据可以直接通过文档，拿过来数据渲染
      // dataList:[
      //   {
      //       "image_src": "https://api-hmugo-web.itheima.net/pyg/banner1.png",
      //       "open_type": "navigate",
      //       "goods_id": 129,
      //       "navigator_url": "/pages/goods_detail/index?goods_id=129"
      //   }
      // ]
      //如果项目页面比较多，建议采用mock数据来
      dataList:[]
    };
  },
  mounted() {
    this.navs();//列表数据
  },
  methods: {

   //列表数据-接口路径请求被mock拦截-相当于走了mock数据
    async navs() {
      let res = await list();
      console.log('列表数据',res);
      if(res.meta.status==200){
          this.dataList=res.message
      }
    },
  },
};
</script>

<style scoped></style>
