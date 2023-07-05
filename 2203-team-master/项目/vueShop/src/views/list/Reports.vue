<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="max-width: 700px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
//0.安装echarts,建议不要装最新的,装4版本的，5版本的也能用，引入方法不一样，最后优化不好优化。装这个 cnpm i echarts@4.9.0 -S
// 1. 导入 echarts——找百度echarts文档类似图表 https://echarts.apache.org/examples/zh/index.html   复杂版本的echarts图表 https://www.makeapie.cn
//!!!注意此处,首页加载优化代码抽离时-已经在vue.config.js里配置过代码拆分抽离，此处按照常理生产环境可以注释掉，但是因为开发环境也要用，所以不能注释。在此处不注释，生产环境打包时会抽离掉.

import { reportlist } from "@/api/api.js";

import echarts from "echarts"; // 5版本以上的引入方式 import * as echarts from 'echarts';
// import _ from 'lodash' // 装lodash原生js方法库   cnpm i --save lodash  页面调用_.merge()

export default {
  data() {
    return {
      //默认配置项
      option: {
        title: {
          text: "Stacked Area Chart",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
    };
  },
  created() {},
  // 此时，页面上的元素，已经被渲染完毕了！
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    //请求自己数据
    let res = await reportlist();
    if (res.meta.status === 200) {
      this.$message.success(res.meta.msg);
      //方法1-正常访问单个数据进行赋值
      let { legend, series, xAxis, yAxis } = res.data;
      // ！！！注意当series的name和legend一一对应时，才可显示相应的legend
      this.option.legend = legend;
      this.option.series = series;
      this.option.xAxis[0].data = xAxis[0].data;
      this.option.yAxis = yAxis;

      //方法2 -如果后端给的数据结构一致，可以用合并对象方法  {...,...} ,Object.assign(),
      // this.option=Object.assign(this.option,res.data)

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);
    }
    //根据窗口大小改变图表大小，监听窗口大小改变事件的onresize ,让echarts执行改变大小
    //注意div宽度不要给死，不会随着改变,
    window.onresize = function () {
      myChart.resize()
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
