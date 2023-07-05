<template>
  <div id="vmcentercontainer">
    <div class="bg1"></div>
    <div class="bg2"></div>
    <div class="bg3"></div>
    <div class="btn">
      <button>累计确诊</button>
      <button>现存确诊</button>
    </div>
    <div class="worldmap"></div>
  </div>
</template>

<script>
// 参考地图-https://www.makeapie.cn/echarts_content/xS1Edb0qnz.html
// https://www.makeapie.cn/echarts_content/map-world-dataRange.html

//世界地图获取思路:1.获取世界echarts地图配置,引入地图数据模板world.js 2.引入地图用数据 3.引入中英文转换

import "@/commonfun/world.js"; //世界地图模板
// import '../../../node_modules/echarts/map/js/world.js'   //导入ecahrts包里的地图文件，也可以
import { dataMap } from "@/commonfun/dataMap.js"; //地图用数据
import { nameMap } from "@/commonfun/nameMap.js"; //中英文转换文件

export default {
  name: "vmcentercontainer",
  data() {
    return {};
  },
  methods: {
    addChart(dom, option) {
      let myChart = echarts.init(dom);
      option && myChart.setOption(option);
      window.onresize = function () {
        myChart.resize();
      };
    },
    centerOne() {
      let option = {
        // 设置提示信息
        tooltip: {
          // 设置提示信息触发源
          trigger: "item",
          // 设置提示信息格式
          formatter: function (params) {
            return params.name + " : " + (params.value ? params.value : 0);
          },
        },
        // 视觉映射组件
        visualMap: {
          // 设置映射类型：piecewise分段型、continuous连续性
          type: "piecewise",
          pieces: [
            { max: 0, label: "0", color: "#eee" },
            { min: 1, max: 499, label: "1-499", color: "#fff7ba" },
            { min: 500, max: 4999, label: "500-4999", color: "#ffc24b" },
            { min: 5000, max: 9999, label: "5000-9999", color: "#ff7c20" },
            { min: 10000, max: 100000, label: "1万-10万", color: "#fe5e3b" },
            { min: 100000, max: 500000, label: "10万-50万", color: "#e2482b" },
            { min: 500000, label: "50万以上", color: "#b93e26" },
          ],
          itemHeight: 10,
          itemWidth: 10,
          inverse: true,
          bottom: "20%",
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12",
          },
        },

        // 系列列表
        series: [
          {
            // 数据名称
            name: "",
            // 设置数据
            data: dataMap,
            // 地区名称映射
            nameMap: nameMap,
            // 绘制的图表类型
            type: "map",
            // 指定地图名称
            mapType: "world",
            // 图表所绘制区域样式
            itemStyle: {
              emphasis: {
                areaColor: "#c9ffff",
                label: {
                  show: false,
                },
              },
            },
            // 设置位置：保持地图高宽比的情况下把地图放在容器的正中间
            layoutCenter: ["48%", "50%"],
            // 地图缩放
            layoutSize: "80%",
          },
        ],
      };
      return option;
    },
  },
  async mounted() {
    var chartDom1 = document.querySelector(".worldmap");
    let option1 = this.centerOne();
    this.addChart(chartDom1, option1);
  },
};
</script>

<style scoped lang="scss">
#vmcentercontainer {
  position: relative;
  height: 810px;
  overflow: hidden;
  /* 下面的图片太大,一直旋转带来了宽度撑高 */
}

.bg1 {
  height: 518px;
  width: 518px;
  background: url("../assets/image/map.png");
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
  opacity: 0.3;
}

.bg2 {
  height: 643px;
  width: 643px;
  background: url("../assets/image/lbx.png");
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
  opacity: 0.6;
  animation: rotate1 15s linear infinite;
}

.bg3 {
  height: 566px;
  width: 566px;
  background: url("../assets/image/jt.png");
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
  opacity: 0.8;
  animation: rotate2 15s linear infinite;
}

.btn {
  width: 810px;
  position: absolute;
  top: 40px;
  display: flex;
  justify-content: space-around;
}

.btn button {
  height: 60px;
  width: 200px;
  font-size: 25px;
  z-index: 10;
  border-radius: 30px;
  background-color: #62b6ff3d;
  border: none;
  color: white;
  cursor: pointer;
}

.btn .click {
  color: #ffe14d;
}

.btn button:focus {
  outline: none;
}

.worldmap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  height: 810px;
  width: 100%;
}

/* 围绕圆心旋转-从0-360度 */
@keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes rotate2 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
</style>
