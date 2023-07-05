<template>
  <div>
    <h1>测试作用域插槽</h1>
    <!-- 放置内容 $slots-->
    <p v-for="(item,index) in data" :key="index">
      <template v-if="!$scopedSlots.default"> {{ item[props.label] }}</template>
      <slot v-else :data="item" age="18" />
    </p>
    <!-- 作用域插槽- 父组件在用插槽时想用子组件的数据 -->
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => ({ label: 'label' })
    }
  }
}
</script>

<style>

</style>
