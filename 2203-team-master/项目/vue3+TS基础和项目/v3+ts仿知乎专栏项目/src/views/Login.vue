<!--
 * @author: sanbao
 * @Date: 2022-03-10 20:06:02
-->
<template>
  <div class="login">
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
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input
          placeholder="请输入密码"
          type="password"
          v-model="formData.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <router-link to="/register">还没有账号？立即注册&gt;&gt;</router-link>
      </el-form-item>
      <el-form-item>
        <div class="submit">
          <el-button type="primary" @click="onSubmit(ruleForm)"
            >立即登录</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { ElForm, ElMessage } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { userLogin } from "../utils/api";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const formData = reactive({
      email: "2110410005@qq.com",
      password: "liu129499",
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
    const rules = reactive({
      email: [{ required: true, validator: validateEmail, trigger: "blur" }],
      password: [
        { required: true, message: "密码不能为空", trigger: "blur" },
        { min: 6, max: 16, message: "密码长度不正确", trigger: "blur" },
      ],
    });
    type FormInstance = InstanceType<typeof ElForm>;
    const ruleForm = ref<FormInstance>();
    const router = useRouter();
    const store = useStore();
    const onSubmit = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          userLogin(formData).then((res) => {
            if (res.data.token) {
              store.commit("changeUser", res.data);
            }
            // store.commit("changeUser");
            setTimeout(() => {
              // 防止 用户信息没存上
              store.commit("changeUser", res.data);
              router.push("/");
            }, 1000);
          });
        } else {
          ElMessage({
            message: "表单数据不正确",
            type: "warning",
          });
          return false;
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
.login {
  width: 300px;
  margin: 100px auto;
}
.submit {
  text-align: center;
  width: 100%;
}
</style>
