<template>
  <div>
    <h2>我是子组件 </h2>
    <div>父传子数据{{message}}</div>
    <h3 @click="sonHander">点击我子传父</h3>
  </div>
</template>

<script>
import { reactive,computed,toRefs, onMounted } from 'vue' 
import { useRouter,useRoute } from 'vue-router'   //方法2 用路由方法

   export default {
     name:'Children',
     //props接收父传子属性
     props:{
        message:{
          type:Object
        }
     },
   
     setup(pro,ctx){

       //props用于父传过来的属性
       console.log("props值",pro.message)
       console.log('ctx是vue3的上下文对象',ctx);
       //context用于子传父，相当于之前this作用
       function sonHander(){
           ctx.emit('sonclick','子组件值11')
       }

       //最后返回
        return {
               sonHander
          }
      }

  } 

</script>

<style  scoped>

</style>

