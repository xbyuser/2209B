<template>
   <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(v,i) in breadList" :key="i" :to="{ path: v.path }">{{ v.title }}</el-breadcrumb-item>
   </el-breadcrumb>
</template>

<script>
export default {
   name: "MyBread",
   props: ['breadList']
};
</script>

<style lang="scss" scoped>

</style>