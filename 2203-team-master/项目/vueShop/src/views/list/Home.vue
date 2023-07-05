<template>
  <div>
    <el-container>
      <el-header>
        <div>
          <img src="@/assets/logo.png" alt="">
          <span>电商后台管理系统</span>
        </div>
        <el-button @click="loginOut">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>

          <!-- 左侧权限列表 -->
          <!-- el-menu原理   <router-link to="path路径">名字</router-link> -->
          <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened
            :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath" class="aa">
            <!-- 一级菜单 -->
            <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{ item.authName }}</span>
              </template>

              <!-- 二级菜单 <router-link to="/路径" ></router-link>-->
              <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
                @click="defaultActive('/' + subItem.path)">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>

        </el-aside>
        <el-main>
          <!-- home页面里有子路由 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>

import { menusList } from "@/api/api.js"

export default {
  data() {
    return {
      activePath: '', //默认激活路由
      menuList: [ //接口没出来前,先按文档模拟数据
        // {
        //   id: 125,
        //   authName: '用户管理',
        //   path: 'users',
        //   children: [
        //     {
        //       id: 110,
        //       authName: '用户列表',
        //       path: 'users',
        //       children: [],
        //       order: null,
        //     },
        //   ],
        //   order: 1,
        // }
      ],
      iconsObj: {
        '125': 'el-icon-user-solid',
        '103': 'el-icon-s-tools',
        '101': 'el-icon-s-goods',
        '102': 'el-icon-s-order',
        '145': 'el-icon-s-marketing'
      },
      // 是否折叠
      isCollapse: false,
    }
  },
  created() {
    //左侧菜单
    this.leftMenu()
    //加载默认激活项
    this.activePath = localStorage.getItem('path')

  },
  methods: {
    //左侧菜单
    async leftMenu() {
      const res = await menusList()
      // console.log('左侧菜单',res);
      if (res.meta.status === 200) {
        this.menuList = res.data
      }
    },
    //退出功能
    loginOut() {
      localStorage.clear()
      this.$router.push('/login')
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    //默认激活项
    defaultActive(path) {
      this.activePath = ''
      localStorage.setItem('path', path)
    },
  },
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

  >div {
    display: flex;
    align-items: center;

    img {
      height: 60px;
    }

    span {
      margin-left: 15px;
    }
  }
}

.el-container {
  height: 100vh;
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
