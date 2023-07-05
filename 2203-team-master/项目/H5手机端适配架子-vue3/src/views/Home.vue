<template>
  <!--头部 -->
    <h2>这里是演示H5项目中rem的适配，要在postcss.config.js配置rem的转换插件。以vant为例演示</h2>
    <div class="div">
      <van-button type="primary" :value="date" @click="show = true"
        >vant插件,点击调用日期</van-button
      >
      <van-calendar v-model:show="show" @confirm="onConfirm" />
    </div>
</template>


<script >
import { ref, reactive, computed, toRefs, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {getIndex,getDetail} from '@/http/api';
export default {

 setup() {
    const date = ref("");
    const show = ref(false);
    const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
    const onConfirm = (value) => {
      show.value = false;
      date.value = formatDate(value);
    };
    //首页数据
    let IndexList=async ()=>{
        let res=await getIndex()
        console.log('首页数据',res);
        let detail=await getDetail(10925)
        console.log('详情数据',detail);

    }
    IndexList()
       
    return {
      date,
      show,
      onConfirm,
    };
  },
};
</script>

<style lang="scss" scoped>
.div {
  width: 100%;
  height: 325px;
  background-color: red;
}
</style>
