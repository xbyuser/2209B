<template>
  <div id="app">
    <!-- 头部组件内容 -->
    <VmHeader></VmHeader>
    <!-- 内容区 -->
    <div id="content">
      <!-- 左侧内容组件 -->
      <div class="left">
        <!-- 左1数据 -->
        <div class="vmpanel">
          <!-- 面板内容设置 -->
          <div class="panelcontent">
            <h2>新增确诊TOP10</h2>
            <!-- 面板高度-默认高度240px,每个外面调用时可单独设置 -->
            <div class="chart left1"></div>
          </div>
          <!-- 面板底部设置 -->
          <div class="panelfooter"></div>
        </div>

        <!-- 后续可提炼成组件 -->
        <!-- <VmPanel>
					<div slot='panelcontent'>
						<h2>新增确诊TOP10</h2>
						<div class="chart left2"></div>
					</div>
				</VmPanel> -->
      </div>
      <!-- 中间内容组件 -->
      <div class="center">
        <div class="center_top">aa</div>
        <!-- 中间世界地图 -->
        <VmCenterContainer></VmCenterContainer>
      </div>
      <!-- 右侧内容组件 -->
      <div class="right">
        <!-- 右1数据 -->
        <div class="vmpanel">
          <!-- 面板内容设置 -->
          <div class="panelcontent">
            <h2>新增确诊TOP10</h2>
            <!-- 面板高度-默认高度240px,每个外面调用时可单独设置 -->
            <div class="chart right1"></div>
          </div>
          <!-- 面板底部设置 -->
          <div class="panelfooter"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//在组件内引入这两个插件
import $ from "jquery";
import echarts from "echarts";

import VmHeader from "@/components/VmHeader.vue";
// import VmPanel from './common/VmPanel.vue'
import VmCenterContainer from "@/components/VmCenterContainer.vue";

export default {
  name: "app",
  data() {
    return {};
  },
  methods: {
    //1.初始echarts
    addChart(dom, option) {
      let myChart = echarts.init(dom);
      option && myChart.setOption(option);
      //页面尺寸改变时,图表跟着变化。注意此处事件不能直接给到window上面
      // window.onresize = function () {
      //   myChart.resize();
      // };
      // //用事件绑定方法,不会被覆盖
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    leftOne(data) {
      let xAxis = [],
        yAxis = [];
      data.forEach((item) => {
        xAxis.push(item.nation);
        yAxis.push(item.addConfirm);
      });
      console.log(68, xAxis, yAxis);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: "13px",
          left: "3%",
          right: "4%",
          bottom: "3px",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: xAxis,
            // 修改刻度标签 相关样式
            axisLabel: {
              color: "rgba(255,255,255,.6) ",
              fontSize: 10,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            // 修改刻度标签 相关样式
            axisLabel: {
              color: "rgba(255,255,255,.6) ",
              fontSize: 10,
            },
          },
        ],
        series: [
          {
            name: "新增确认",
            type: "bar",
            barWidth: "20%",
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: "#3B80E2",
              },
            },
            data: yAxis,
          },
        ],
      };
      return option;
    },
    rightOne(data) {
      let xAxis = [],
        yAxis = [];
      data.forEach((item) => {
        xAxis.push(item.nation);
        yAxis.push(item.addConfirm);
      });
      console.log(68, xAxis, yAxis);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: "13px",
          left: "3%",
          right: "4%",
          bottom: "3px",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: xAxis,
            // 修改刻度标签 相关样式
            axisLabel: {
              color: "rgba(255,255,255,.6) ",
              fontSize: 10,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            // 修改刻度标签 相关样式
            axisLabel: {
              color: "rgba(255,255,255,.6) ",
              fontSize: 10,
            },
          },
        ],
        series: [
          {
            name: "新增确认",
            type: "bar",
            barWidth: "20%",
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: "#3B80E2",
              },
            },
            data: yAxis,
          },
        ],
      };
      return option;
    },
  },
  components: {
    VmHeader,
    // VmPanel,
    VmCenterContainer,
  },
  created() {
  },
  mounted() {
    let p = new Promise((resolve, reject) => {
      //异步请求的结果
      $.ajax({
        url: "https://view.inews.qq.com/g2/getOnsInfo?name=disease_foreign",
        dataType: "jsonp", //接收jsonp数据。！！！注意jsonp只支持get请求,而且要求后端得配合返回jsonp的数据格式-cb({数据})
        success(res) {
          // console.log("成功", res.data);
          let data = JSON.parse(res.data); //注意后端数据返的是字符串的，需要转成对象
          resolve(data);
        },
        error(err) {
          // console.log("失败", err);
          reject(err);
        },
      });
    });
    p.then((res) => {
      console.log(191, res.countryAddConfirmRankList);
      //传统方法-不好维护
      //1.准备图表
      // var xAxis = [],
      //   yAxis = [];
      // res.countryAddConfirmRankList.forEach((item) => {
      //   xAxis.push(item.nation);
      //   yAxis.push(item.addConfirm);
      // });

      // let option = {
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       type: "shadow",
      //     },
      //   },
      //   grid: {
      //     top: "15%",
      //     right: "3%",
      //     left: "15%",
      //     bottom: "22%",
      //   },
      //   xAxis: [
      //     {
      //       type: "category",
      //       data: xAxis,

      //       axisLabel: {
      //         margin: 10,
      //         color: "#e2e9ff",
      //         textStyle: {
      //           fontSize: 14,
      //         },
      //       },
      //     },
      //   ],
      //   yAxis: [
      //     {
      //       axisLabel: {
      //         formatter: "{value}",
      //         color: "#e2e9ff",
      //       },
      //       axisLine: {
      //         show: false,
      //       },
      //       splitLine: {
      //         lineStyle: {
      //           color: "rgba(255,255,255,0.12)",
      //         },
      //       },
      //     },
      //   ],
      //   series: [
      //     {
      //       type: "bar",
      //       data: yAxis,
      //       barWidth: "10px",
      //       itemStyle: {
      //         normal: {
      //           color: "#3B80E2",
      //           barBorderRadius: [30, 30, 30, 30],
      //           shadowColor: "rgba(0,160,221,1)",
      //           shadowBlur: 4,
      //         },
      //       },
      //     },
      //   ],
      // };
      //2.echarts初始化
      // var chartDom = document.querySelector(".left1");
      // var myChart = echarts.init(chartDom);
      // option && myChart.setOption(option);
      // window.onresize = function () {
      //   myChart.resize();
      // };

      //封装下公用方法
      //左1图表
      var leftDom1 = document.querySelector(".left1");
      let left1 = this.leftOne(res.countryAddConfirmRankList);
      this.addChart(leftDom1, left1);

      //右1图表
      var rightDom1 = document.querySelector(".right1");
      let right1 = this.rightOne(res.countryAddConfirmRankList);
      this.addChart(rightDom1, right1);
    });
  },
};
</script>
<style lang="scss">
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  overflow-y: scroll;
}

body {
  overflow: hidden;
  // font-size: 30px;
}

li {
  list-style: none;
}

/* 内容区样式 */
#app {
  height: 100vh;
  /* width: calc(100vw - 17px); 表示整个浏览器窗口高度减去10px的大小 */
  /* 别名访问方式，需在vue.config.js配置别名 */
  /* background: url(assets/image/bg.jpg) top center;  */
  /* 静态访问方式 */
  background: url("./assets/image/bg.jpg") top center;
}

#content {
  display: flex;

  .left {
    flex: 3;
    height: 310px;
    /* background-color: red; */
  }

  .vmpanel {
    border: 1px solid rgba(25, 186, 139, 0.17);
    background: url("./assets/image/line(1).png");

    .panelcontent h2 {
      height: 48px;
      line-height: 48px;
      color: white;
      font-size: 30px;
      text-align: center;
      font-weight: 400;
    }

    .panelcontent .chart {
      height: 220px;
    }
  }

  .center {
    flex: 5;

    // background-color: blue;
    .center_top {
      height: 160px;
      background-color: #fff;
    }
  }

  .right {
    flex: 3;
    // height: 310px;
    // background-color: red;
  }
}
</style>
