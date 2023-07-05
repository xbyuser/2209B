
<template>
  <el-container>
    <el-header>
      <el-row justify="space-between" align="middle">
        <el-col :span="4">
          <span @click="$router.push('/')">仿知乎专栏</span>
        </el-col>
        <el-col :span="4">
          <div v-if="!userName">
            <router-link to="/login" custom v-slot="{ navigate }">
              <el-button type="primary" @click="navigate" plain>登录</el-button>
            </router-link>
            <router-link to="/register" custom v-slot="{ navigate }">
              <el-button type="primary" @click="navigate" plain>注册</el-button>
            </router-link>
          </div>
          <el-dropdown v-else>
            <el-button type="primary">
              {{ userName
              }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  @click="
                    $router.push(`/column?author=${$store.state.user.column}`)
                  "
                >
                  我的文章
                </el-dropdown-item>
                <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
// import { userLoginOut } from "./utils/api";
import { useRouter } from "vue-router";
const store = useStore();
const userName = computed(() => store.state.user.nickName);
// console.log(userName);

const router = useRouter();
const loginOut = async () => {
  // const result = await userLoginOut();
  // if (result.success) {
  //   store.commit("changeUser", "");
  //   router.push("/");
  // }
  store.commit("changeUser", "");
  router.push("/");
};
</script>
