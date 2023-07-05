<template>
  <div class="register">
    <el-form
      ref="ruleForm"
      label-position="top"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="邮箱地址" label-width="80px" prop="email">
        <el-input
          placeholder="请输入邮箱地址"
          v-model="formData.email"
        ></el-input>
      </el-form-item>
      <el-form-item label="昵称" label-width="80px" prop="nickname">
        <el-input
          placeholder="请输入昵称"
          v-model="formData.nickname"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input
          placeholder="请输入密码"
          type="password"
          v-model="formData.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="重复密码" label-width="80px" prop="repeatPassword">
        <el-input
          placeholder="请再次输入密码"
          type="password"
          v-model="formData.repeatPassword"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <router-link to="/login">已有账号？立即登录&gt;&gt;</router-link>
      </el-form-item>
      <el-form-item>
        <div class="submit">
          <el-button type="primary" @click="onSubmit(ruleForm)"
            >立即注册</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" >
import { ElForm } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { userRegister } from "../utils/api";
export default defineComponent({
  setup() {
    const formData = reactive({
      email: "2970735579@qq.com",
      password: "liu129499",
      nickname: "adwds",
      repeatPassword: "liu129499",
    });

    // 邮箱的验证方法
    const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const validateEmail = (
      rule: any,
      value: string | number,
      callback: any
    ) => {
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else if (!emailReg.test(formData.email)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    // 重复密码验证
    const validateRepeatPassword = (
      rule: any,
      value: string,
      callback: any
    ) => {
      if (value === "") {
        callback(new Error("重复密码不能为空"));
      } else if (formData.repeatPassword !== formData.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    const rules = reactive({
      email: [{ required: true, validator: validateEmail, trigger: "blur" }],
      password: [
        { required: true, message: "密码不能为空", trigger: "blur" },
        { min: 6, max: 16, message: "密码长度不正确", trigger: "blur" },
      ],
      nickname: [
        {
          required: true,
          min: 3,
          max: 8,
          message: "昵称为3到8个字符",
          trigger: "blur",
        },
      ],
      repeatPassword: [
        { required: true, validator: validateRepeatPassword, trigger: "blur" },
      ],
    });
    type FormInstance = InstanceType<typeof ElForm>;
    const ruleForm = ref<FormInstance>();
    const router = useRouter();
    const onSubmit = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          // 接口参数
          const formDat1 = reactive({
            email: formData.email,
            password: formData.password,
            nickName: formData.nickname,
          });
          console.log(formDat1);
          userRegister(formDat1).then((res) => {
            console.log(res);
            if (res.msg === "请求成功") {
              router.push("/login"); // 注册成功后跳转进入登录页面
            }
          });
        }
      });
    };
    return {
      formData,
      rules,
      onSubmit,
      ruleForm,
    };
  },
});
</script>
<style lang="scss" scoped>
.register {
  width: 300px;
  margin: 100px auto;
}
.submit {
  text-align: center;
  width: 100%;
}
</style>
