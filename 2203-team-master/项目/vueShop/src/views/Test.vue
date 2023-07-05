<template>
  <div>
    <h3 @click="dialogVisible = true">点击弹窗组件测试</h3>
    <!-- 先布局-按照正常效果布局 -->
    <!-- <my-dialog title="自定义标题" width="70%" :visible.sync="dialogVisible"> -->
    <my-dialog title="自定义标题" width="50%" :visible="dialogVisible" @closeMask="closeMask" @closeDialog="handleClose">
      <!-- 普通标签具名插槽 -->
      <!-- <span slot="body">用户传入的中间内容</span> -->
      <!-- 放在模板标签里可用v-slot:名子或者#名字 -->
      <template v-slot:body>
        用户传入的中间内容1
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </my-dialog>

  </div>
</template>
<script>
//局部引用公用组件
// import MyDialog from "@/components/Dialog/index.vue";
export default {
  data() {
    return {
      //弹框默认是否显示
      dialogVisible: false,
    };
  },
  components: {
    // MyDialog,
  },
  mounted() { },
  methods: {
    closeMask(value) {
      //value是传过来的值
      this.dialogVisible = value
    },
    //关闭时回调
    handleClose(value) {
      this.$confirm("确认关闭？")
        .then((_) => {
          console.log("回调执行", value);
          this.dialogVisible = value
        })
        .catch((_) => { });
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
