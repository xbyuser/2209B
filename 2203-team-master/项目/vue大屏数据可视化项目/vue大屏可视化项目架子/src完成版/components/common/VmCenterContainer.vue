<template>
  <div id="vmcentercontainer">
    <div class="bg1"></div>
    <div class="bg2"></div>
    <div class="bg3"></div>
    <div class="btn">
      <button @click="btnclick1" :class="{ click: ifclick1 }">累计确诊</button>
      <button @click="btnclick2" :class="{ click: ifclick2 }">现存确诊</button>
    </div>
    <div class="worldmap"></div>
  </div>
</template>

<script>
// ！！！注意问题:在我们写世界地图的时候，从eccharts复制过来的，修改成中文无法识别，导致我们的数据没办法使用，所以我们要用一个方法将英文转化中文，在我们的option中的series里面有个属性nameMap,并将commonfun中的nameMap.js引入

//世界地图获取思路:1.获取世界echarts地图配置,引入地图数据world.js  2.给地图赋值数据-因为国外数据和国内数据是两个接口，而地图是一下加载完的，所以需要一并请求下两个接口数据用Promise.all方法  3.分别得到两个数据后，还要合并处理成一个整的数据给世界地图，因为世界地图是一个整体data 4.tab切换时拿到对应数据-在合并完世界地图数据后,分别存储下累计确诊和现存确诊 5.最后加载echarts

import "@/commonfun/world.js"; //世界地图数据
import { nameMap } from "@/commonfun/nameMap.js"; //中英文转换文件nameMap.js
import { worldMapOption } from "@/commonfun/options.js";
import { getMapData, addChart } from "@/commonfun/charts.js";

export default {
  name: "vmcentercontainer",
  data() {
    return {
      confirmData: [], //累计确诊
      confirmNowData: [], //现存确诊
      worldMapOption: {},
      chart: {},
      ifclick1: true,
      ifclick2: false,
    };
  },
  methods: {
    //累计确诊
    btnclick1() {
      if (this.ifclick1) {
        return;
      } else {
        this.ifclick2 = false;
        this.ifclick1 = true;
        this.worldMapOption.series[0].data = this.confirmData;
        this.chart.setOption(this.worldMapOption);
      }
    },
    //现存确诊
    btnclick2() {
      if (this.ifclick2) {
        return;
      } else {
        this.ifclick1 = false;
        this.ifclick2 = true;
        this.worldMapOption.series[0].data = this.confirmNowData;
        this.chart.setOption(this.worldMapOption);
      }
    },
  },
  mounted() {
    let option = worldMapOption();
    // console.log(option);
    this.worldMapOption = option;
    //赋值中英文转换文件
    this.worldMapOption.series[0].nameMap = nameMap;
    let that = this;
    //请求接口获取国外数据和国内数据
    getMapData().then((res) => {
      console.log("国外数据,国内数据", res);
      //获取国内数据
      let name = res[1].name;
      let confirm = res[1].confirm;
      let nowConfirm = res[1].nowConfirm;
      //把国内数据在合到世界地图数据内
      res[0].confirmData.push({ name, value: confirm });
      res[0].nowConfirmData.push({ name, value: nowConfirm });
      //数据分别存储-用于tab切换时拿到数据
      that.confirmData = res[0].confirmData;
      that.confirmNowData = res[0].nowConfirmData;
      //把世界数据(包含国内的)合到echarts的data里
      that.worldMapOption.series[0].data = that.confirmData;
      console.log("世界确诊数据", that.confirmData);
      //加载echarts
      let worldmap = document.querySelector(".worldmap");
      that.chart = addChart(worldmap, that.worldMapOption);
    });
  },
};
</script>
<style scoped>
#vmcentercontainer {
  position: relative;
  height: 810px;
  overflow: hidden; /* 下面的图片太大,一直旋转带来了宽度撑高 */
}
.bg1 {
  height: 518px;
  width: 518px;
  background: url(../../assets/image/map.png);
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
  background: url(../../assets/image/lbx.png);
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
  background: url(../../assets/image/jt.png);
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
