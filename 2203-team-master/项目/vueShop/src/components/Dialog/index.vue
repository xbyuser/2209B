<template>

  <div class="dialog_container" v-show="visible">
    <div class="mask" @click="closeMask"></div>
    <div class="dialog" :style="{ width: width }">
      <!-- 头部放标题，关闭按钮 -->
      <div class="zh-header">
        {{ title }}
        <button class="dialog_headerbtn">
          <i class="zh-icon-close" @click="closeDialog">X</i>
        </button>
      </div>
      <!-- 中间内容不确定-放插槽 -->
      <div class="dialog_body">
        <slot name="body">中间内容</slot>
      </div>
      <!-- 底部内容不确定-放插槽 -->
      <div class="dialog_footer">
        <slot name="footer">底部内容</slot>
      </div>
    </div>
  </div>

</template>

<script>
//封装组件思路：1.先写布局结构样式 2.考虑对外扩展哪些属性(弹框组件：标题,宽，高，是否显示隐藏等) 3.变成子组件形式 ,外部传这些属性 4.写方法
export default {
  // 组件名称
  name: "MyDialog",
  data() {
    return {
      // title: '默认标题1',
      // visible: true, //是否显示
      // width: '50%',
    };
  },
  props: {
    title: {
      type: String,
      default: '默认标题1'
    },
    width: {
      type: String,
      default: '50%'
    },
    visible: {
      type: Boolean,
      default: true
    },
  },
  // 组件方法
  methods: {
    //注意！！！子组件不能直接修改父组件属性,通过发射事件传出去。原因是vue数据是单向数据流

    //点击模态框,关闭整个--会报错，子组件不能直接修改父组件属性。
    closeMask() {
      //  this.visible = false  //props是单向数据流不能直接改变，所以报错

      this.$emit('closeMask', !this.visible)
      //或者页面用修饰符.sync同步调用。update：是被固定的也就是vue为我们约定好的名称部分。visible是我们要同步更新修改的属性名称，与传入的属性名字对应起来
      // this.$emit('update:visible', !this.visible)


    },
    //点击X,在次确认,调用回调后，关闭整个
    closeDialog() {

      //不能在这里写,有单向数据流问题
      // this.$confirm("确认关闭？").then((_) => {
      //   console.log("点击确定后", _); //点击确定后返回confirm
      //   this.visible = false;
      // }).catch((_) => {
      //   console.log("点击取消后", _); //点击确定后返回cancel
      // });

      this.$emit('closeDialog', !this.visible)

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
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: .5;
    animation: mask1 1s linear forwards; //动画名字  时间  速度  走到头是停forwards/走到头循环 infinite
  }


  .dialog {
    position: fixed;
    left: 50%;
    top: 50%;
    height: 200px;
    transform: translate(-50%, -50%);
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

//定义自动执行动画
@keyframes mask1 {
  from {
    opacity: .8;
  }

  to {
    opacity: .2;
  }
}

@keyframes dialog1 {
  from {
    top: 45%
  }

  to {
    top: 50%;
  }
}
</style>
