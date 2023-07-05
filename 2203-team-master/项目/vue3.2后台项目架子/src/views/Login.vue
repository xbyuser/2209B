<template>
  <div class="app">
    <el-card class="box-card">
      <h2>
        vue3后台管理系统
        <!-- 全局图标测试 -->
        <el-icon :size="size" :color="color">
          <Avatar />
        </el-icon>
      </h2>

      <el-form :model="state.loginFrom" :rules="state.loginRules" ref="login" status-icon label-width="20px"
        class="demo-ruleForm">
        <el-form-item prop="username">

          <el-input v-model="state.loginFrom.username" :prefix-icon="Avatar" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Unlock" type="password" autocomplete="off" v-model="state.loginFrom.password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button color="#626aef" style="color: white" type="primary" @click="setLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script  setup>
import { reactive, toRefs, computed, watch, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getLogin } from "@/http/api.js";
import { useStore } from "vuex";
import { Avatar, Unlock } from "@element-plus/icons-vue"; //elemnt-plus中图标使用 ,需要安装cnpm install @element-plus/icons-vue

let router = useRouter();
let store = useStore();
const state = reactive({
  loginFrom: {
    username: "admin",
    password: "123456",
  },
  loginRules: {
    username: [
      {
        required: true,
        message: "请输入用户账户",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        min: 6,
        max: 16,
        message: "请输入账户密码 6-16位",
        trigger: "blur",
      },
    ],
  },
});

const login = ref(); //注意此处相当于获取的页面中dom对象 ref="login",
let setLogin = () => {
  login.value.validate((valid) => {
    if (valid) {
      getLogin(state.loginFrom).then((res) => {
        // console.log('登录成功',res);
        if (res.meta.status == 200) {
          store.dispatch("userInfos", res.data);
          store.dispatch("getLists");
          setTimeout(function () {
            router.push("/test");
          }, 500);
        }
      });
    } else {
      return false;
    }
  });
};

</script>

<style scoped lang='scss'>
* {
  box-sizing: border-box;
}

.app {
  .box-card {
    width: 500px;
    padding: 20px;
    height: 342px;
    position: relative;
    left: 50%;
    transform: translate(-50%, 70%);

    .el-form-item {
      padding: 5px 0px;
      text-align: right;

      .el-button {
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
