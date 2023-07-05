<template>
  <div>
    <h3>测试页面</h3>
    <!-- 面板高度-->
    <div class="chart"></div>

  </div>


</template>


<script>

//在组件内引入这两个插件
import $ from "jquery";
import echarts from "echarts";


export default {
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {
    this.test()
  },
  methods: {
    test() {
        
    },
  }
}
</script>
<style lang="scss" scoped>
.chart {
  width: 800px;
  height: 800px;
}
</style>