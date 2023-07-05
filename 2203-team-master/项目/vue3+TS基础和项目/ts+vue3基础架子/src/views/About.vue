<template>
  <div class="home">
      <router-link to="/vue3">vue3基础语法</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
//这里defineComponent()方法，是为了适配vue里用ts的语法，有类型提示，最重要的是给予了组件正确的参数类型推断。可以去掉不影响
export default defineComponent({
  name: 'Home',
  components: {
  },
   setup() {
    let mes1=ref('测试1')

    return {
       mes1,
    }
  },
});


</script>
