<template>
  <div id="app">
    <VmHeader></VmHeader>
    <div id="content">
      <VmLeft
        class="left"
        :option1="option1"
        :option3="option3"
        :option5="option5"
      ></VmLeft>
      <VmCenter
        class="center"
        :centerTop="centerTop"
        :foreignData="foreignData"
      >
      </VmCenter>
      <VmRight
        class="right"
        :option2="option2"
        :option4="option4"
        :option6="option6"
      ></VmRight>
    </div>
  </div>
</template>

<script>
import VmHeader from "@/components/VmHeader.vue";
import VmLeft from "@/components/VmLeft.vue";
import VmCenter from "@/components/VmCenter.vue";
import VmRight from "@/components/VmRight.vue";

import { getForeinData } from "@/commonfun/charts.js";

export default {
  name: "app",
  data() {
    return {
      option1: {},
      option2: {},
      option3: {},
      option4: {},
      option5: {},
      option6: {},
      centerTop: {},
      foreignData: {},
    };
  },
  methods: {},
  components: {
    VmHeader,
    VmLeft,
    VmCenter,
    VmRight,
  },
  mounted() {
    getForeinData().then((res) => {
      //左侧3个数据
      console.log(res.option1, res.option3, res.option5);
      //右侧3个数据
      console.log(res.option2, res.option4, res.option6);

      this.option1 = res.option1;
      this.option2 = res.option2;
      this.option3 = res.option3;
      this.option4 = res.option4;
      this.option5 = res.option5;
      this.option6 = res.option6;
      this.centerTop = res.centerTop;
      this.foreignData = res.foreignData;
    });
  },
};
</script>
<style>
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
}

@font-face {
  font-family: electronicFont;
  src: url(assets/font/DS-DIGIT.TTF);
}

li {
  list-style: none;
}
#app {
  /* height: 100vh; */
  width: calc(100vw - 17px); /*表示整个浏览器窗口高度减去10px的大小*/

  /* 别名访问方式-绝对路径，需在vue.config.js配置别名 */
  /* background: url(assets/image/bg.jpg) top center;  */
  /* 静态访问方式-相对路径访问 */
  background: url("./assets/image/bg.jpg") top center;
}
#content {
  padding: 10px 10px 0;
  display: flex;
}
#content .left {
  flex: 3;
}
#content .center {
  flex: 5;
}
#content .right {
  flex: 3;
}
</style>
