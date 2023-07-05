<template>
  <div>
    <h3>
      !!!模拟按钮权限,由于这个项目后端没有返回按钮权限列表,直接使用模拟数据来设置按钮权限了
    </h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="住址" width="180">
        <template slot-scope="scope">
          <p>{{ scope.row.address }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini" type="primary" v-hasMenu="'creat'"
            >新增</el-button
          >
          <el-button size="mini" type="success" v-hasMenu="'edit'"
            >修改</el-button
          >
          <el-button size="mini" type="danger" v-hasMenu="'del'"
            >删除</el-button
          >
          <!-- <el-button size="mini" type="primary">新增</el-button>
          <el-button size="mini" type="success">修改</el-button>
          <el-button size="mini" type="danger">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
      

<script>
export default {
  //自定义指令局部引入  directives: { hasMenu:{bind(el,binding){},inserted(){}} },  全局指令 Vue.directives('名字',{bind(el,binding){},inserted(el, bindings) })
  data() {
    return {
      tableData: [
        {
          name: "王小虎1",
          address: "上海市",
        },
        {
          name: "王小虎2",
          address: "北京市",
        },
      ],
    };
  },
  created() {
    //模拟登录后端返回的按钮权限列表-正常的话应该走接口后台根据不同登录用户返回不同按钮权限
    let arr = ["creat", "edit"]; //del
    //注意这里为什么要使用本地存储，而不用全局data里定义数据？在自定义指令bind里拿不到this实例
    localStorage.setItem("permission", JSON.stringify(arr));
  },
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
  //局部自定义指令
  // directives: {
  //   //给指令起个名字
  //   hasMenu: {
  //     //bind执行时机页面没有挂载dom时，就执行,比data早，比created晚。所以this拿不到vue实例，也就是this不能用
  //     bind(el, binding) {
  //       //el是当前绑定所在的dom对象,binding是v-hasMenu绑定的对象值
  //       // console.log(el,binding.value)
  //       let arr = JSON.parse(localStorage.getItem("permission"));
  //       let bl = arr.includes(binding.value);
  //       if (!bl) {
  //         el.style.display = "none";
  //         //因为dom元素获取不到,所以变成异步后在获取
  //         // setTimeout(() => {
  //         //   //找到父对象把自己移除掉
  //         //   el.parentNode.removeChild(el);
  //         // }, 0);
  //         // console.log(67,el.parentNode); //在外面获取不到dom父对象
  //       }
  //     },
  //     // inserted相当于dom挂载后执行的,能直接获取到dom对象
  //     inserted(el, bindings) {
  //       console.log(67, el.parentNode); //可获取当前父对象
  //     },
  //   },
  // },
};
</script>

<style scoped lang='scss' >
</style>
