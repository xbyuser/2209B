<template>
  <div class="about">
    <h1>这是测试页面</h1>
  </div>
</template>

<script>
import { ref,reactive,computed,toRefs, onMounted } from 'vue' 
import { useRouter,useRoute } from 'vue-router'   //方法2 用路由方法

   export default {
     setup(){
          let route=useRoute()
          console.log('query路由信息',route.query)
          // console.log('params路由信息',route.params)

          return{
             
              
          }
            
      }

  } 

</script>

<style  scoped>

</style>

