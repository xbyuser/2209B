<template>

  <div class="dialog_container" v-show="visible">
    <div class="mask" @click="closeDialog"></div>
    <div class="dialog" style="width:50%">
      <!-- 头部放标题，关闭按钮 -->
      <div class="zh-header">
        {{ title }}
        <button class="dialog_headerbtn">
          <i class="zh-icon-close" @click="closeDialog">X</i>
        </button>
      </div>
      <!-- 中间内容不确定-放插槽 -->
      <div class="dialog_body">
           中间内容不确定-放插槽
      </div>
      <!-- 底部内容不确定-放插槽 -->
      <div class="dialog_footer">
          底部内容不确定-放插槽
      </div>
    </div>
  </div>

</template>

<script>
//封装组件：1.先写布局结构样式 2.考虑对外扩展哪些属性(弹框组件：标题,宽，高，是否显示隐藏等) 3.变成子组件形式 ,外部传这些属性 4.写方法
// 弹框组件-可配置标题,宽，高等属性
export default {
  // 组件名称
  name: "MyDialog",
  data() {
    return {
      title: '默认标题1',
      visible: true, //弹框
      width: '60%',
    };
  },
  props: {
    // title: {
    //   type: String,
    //   default: '默认标题1'
    // },
    // width:{
    //   type:String,
    //   default:'50%'
    // },
    // visible:{
    //   type:Boolean,
    //   default:true
    // },
  },
  // 组件方法
  methods: {
    //子组件不能直接修改父组件属性,通过发射事件传出去。原因是vue数据是单向数据流
    // closeMask() {

    // },
    //关闭弹框
    closeDialog() {
      this.visible = false
    }
  },
};
</script>

<style lang="scss" scoped>
.dialog_container {
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: .6;
    //css3动画属性
    animation: mask1 1s linear forwards;
  }

  .dialog {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 300px;
    background-color: white;
    animation: dialog1 .5s linear forwards;

    .dialog_headerbtn {
      position: absolute;
      top: 5px;
      right: 5px;
    }

    .dialog_footer {
      position: absolute;
      bottom: 15px;
      right: 15px;
    }
  }
}

//定义下透明度动画
@keyframes mask1 {
  from {
    opacity: 0;
  }

  to {
    opacity: .5;
  }
}

@keyframes dialog1 {
  from {
    top: 0;
  }

  to {
    top: 50%;
  }
}
</style>
