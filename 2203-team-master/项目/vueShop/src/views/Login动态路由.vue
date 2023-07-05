<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="login_form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" suffix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
//核心思路-登录流程
// 1.静态布局 2.根据接口文档,模拟json数据 3.测试接口  4.验证规则:利用elment表单插件,判断验证规则是否通过，如果通过,获取前端用户输入信息,传入接口,发送请求 5.发送接口成功,后台验证数据后返回token，前台做下一步跳转操作，同时提醒用户是否登录成功与失败信息 6.存储token,跳转页面

import { getLogin, menusList } from "@/api/api";
import { fn } from '@/utils/routeList.js'; //生成列表结构路由方法

export default {
  data() {
    return {
      timer: "", //定时器
      ruleForm: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          //elment自带规则
          // { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
          //自定义验证规则
          {
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
            message: "请输入正确的账号格式长度4到16位字母数字下划线开头",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          //验证通过
          if (valid) {
            let res = await getLogin(this.ruleForm);
            if (res.meta.status === 200) {
              this.$message.success(res.meta.msg);
              localStorage.setItem("token", res.data.token);

              //加载动态路由
              // !!!注意-登录后路由表里在次加载一遍动态路由-解决第1次页面点击找不到路径问题,因为路由是动态生成的,登录后路由没有被在次生成，路由表里是空的。所以在路由里要在次生成一遍
              this.loadRoute()
              this.$router.push("/home"); 
              
            }
          }
          //验证不通过
          else {
            return false;
          }
        });
    },
    //重置方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //动态路由方法
    async loadRoute() {
      let res = await menusList()
      //注意严谨点，加判断条件
      if (res.meta.status === 200) {

        //存储下左侧导航
        localStorage.setItem("menusList", JSON.stringify(res.data))
        let newList = fn(res.data)
        console.log("递归后的列表路由", newList)
        newList.forEach((item) => {
          //router.addRoute('路由里name名',值) 意思是把每个列表对象插入到哪个二级子路由里
          this.$router.addRoute("Home", item)
        })
      }
    },


  },
};
</script>
<style lang="scss" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>