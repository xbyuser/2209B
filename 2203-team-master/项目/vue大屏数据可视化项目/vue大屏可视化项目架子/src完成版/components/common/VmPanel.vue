
<template>
  <div class="vmpanel">
    <!-- 面板内容设置 -->
    <div class="panelcontent">
      <slot name="panelcontent">
        <h2>每个小面板名字</h2>
        <!-- 面板高度-默认高度240px,每个外面调用时可单独设置 -->
        <div class="chart"></div>
      </slot>
    </div>
    <!-- 面板底部设置 -->
    <div class="panelfooter"></div>
  </div>
</template>

<script>
// 思路：1.每个小面板几乎一致，可定义成一个公共组件VmPanel 2.小面板里内容数据不一样，可用slot插槽实现(内容包括：每个面板名字,每个面板高度) 3.外面调用该插槽时，可传入不同名字，不同高度这样就保持了内容的不一致

export default {
  name: "vmpanel",
};
</script>
<style scoped>
.vmpanel {
  position: relative;
  height: 310px;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background: url("../../assets/image/line(1).png");
  padding: 0 15px 40px;
  margin-bottom: 15px;
}

.vmpanel:before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}

.vmpanel:after {
  position: absolute;
  top: 0;
  right: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}

.vmpanel .panelfooter {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}

.vmpanel .panelfooter:before {
  position: absolute;
  bottom: 0;
  left: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}

.vmpanel .panelfooter:after {
  position: absolute;
  bottom: 0;
  right: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}

.panelcontent h2 {
  height: 48px;
  line-height: 48px;
  color: white;
  font-size: 20px;
  text-align: center;
  font-weight: 400;
}

.panelcontent .chart {
  height: 240px;
  /* background-color: pink; */
}
</style>
