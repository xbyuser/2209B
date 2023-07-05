<template>
  <div>
    <!-- 面包屑导航区域 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb> -->

    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="(item, index) in breadList"
        :key="index"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="rolelist" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 渲染角色数据 1.先分成1行2列 2.第2列里又分成了1行2列-->
            <tr v-for="(item, index) in scope.row.children" :key="index">
              <td>
                <el-tag closable @close="removeRightById(scope.row, item.id)">{{
                  item.authName
                }}</el-tag>
              </td>
              <td>
                <tr v-for="(item1, index1) in item.children" :key="index1">
                  <td>
                    <el-tag
                      closable
                      @close="removeRightById(scope.row, item1.id)"
                      type="success"
                      >{{ item1.authName }}
                    </el-tag>
                  </td>
                  <td v-for="(item2, index2) in item1.children" :key="index2">
                    <el-tag
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                      type="warning"
                      >{{ item2.authName }}
                    </el-tag>
                  </td>
                </tr>
              </td>
            </tr>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column label="索引" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delete"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
              >分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限的对话框 -->
    <!-- el-tree树形组件-
    show-checkbox:显示复选框
    node-key:设置选中节点对应的值
    default-expand-all:是否默认展开所有节点
    :default-checked-keys 设置默认选中项的数组
    ref:设置引用 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
    >
      <!-- 树形控件 -->
      <el-tree
        :data="rightslist"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        :props="treeProps"
        ref="tree"
      >
      </el-tree>

      <el-button @click="setRightDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="allotRights">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
// 点击分配权限思路：
//1.弹框显示,布局调用el-tree组件, :props="treeProps" 绑定数据里的字 :default-checked-keys="defKeys" 默认选中   2.获取所有权限的数据  const res= await this.$http.get('rights/tree') ,渲染绑定

//3.默认选中如何实现？通过递归的形式，获取当前角色下所有最后一次出现children中的id，并保存到 默认defKeys 选中数组中 。递归会不断的遍历当前角色下childen是不是有值，如果没有，就拿当前层级下的id

//4.提交更新权限-点击为角色分配权限-注意这里调用element两个方法来记录你选中了那些：1个是全选中方法getCheckedKeys()，1个是半选中方法getHalfCheckedKeys,在把它们合并成数组[105,116,117,150,101,104]。注意接口提交的时候要的是字符串

import {
  roleslist,
  addrole,
  editrole,
  delrole,
  delroleById,
  allrights,
  updaterole,
} from "@/api/api.js";
import { handleTree, Tree } from "@/utils/ruoyi.js"; //导入工具方法
export default {
  data() {
    return {
      // 所有角色列表数据
      rolelist: [],
      // 控制分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      // 所有权限的数据-接口地址没出来前，根据文档模拟数据
      rightslist: [
        {
          id: 101,
          authName: "商品管理",
          path: "goods",
          pid: 0,
          children: [
            {
              id: 104,
              authName: "商品列表",
              path: "goods",
              pid: 101,
              children: [
                {
                  id: 105,
                  authName: "添加商品",
                  path: "goods",
                  pid: "104,101",
                },
              ],
            },
          ],
        },
      ],
      // 树形控件的属性绑定对象
      treeProps: {
        label: "authName",
        children: "children",
      },
      // 默认选中的节点Id值数组
      // defKeys: [105,116,117,150,151,152,153], //测试商品列表所有默认选中
      defKeys: [],
      // 当前即将分配权限的角色id
      roleId: "",
      //模拟数据
      breadList: [
        { path: "/home", name: "首页" },
        { path: "/roles", name: "角色列表" },
      ],
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    // 获取所有角色的列表
    async getRolesList() {
      const res = await roleslist("roles");
      console.log("角色列表成功", res);
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg);
        this.rolelist = res.data;
      }
    },
    // 根据Id删除对应的权限-传入当前对象roleid和权限id,删除完后台返回更新的数据在赋值给当前对象里children
    async removeRightById(role, rightId) {
      console.log(136, role, rightId);
      //1.请求接口
      let res = await delroleById({ roleId: role.id, rightId: rightId });
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
        role.children = res.data; //删除后,在次请求角色数据会刷新，让后台给你响应1个删除成功的内容直接赋值当前行，数据就不会刷新了
      }
    },

    // 展示分配权限的对话框-role是当前行角色下所有权限信息
    async showSetRightDialog(role) {
      console.log("当前角色信息", role);
      this.roleId = role.id; //存储下角色id,更新时使用
      this.setRightDialogVisible = true; //打开窗口
      this.defKeys = []; //打开时把上次的选中清空下，防止累加重复

      //1.后端如果给的是列表结构数据
      let res = await allrights("list");
      console.log("218列表结构数据", res);
      //自己写树结构方法 Tree(数据源,最大的根节点父id值)
      // let listArr = Tree(res.data, 0)
      //若依提供树结构方法 handleTree(数据源,'id字段','父id字段','孩子节点字段')
      let listArr = handleTree(res.data, "id", "pid", "children");
      console.log("223树结构", listArr);

      //2.后端给的直接是树结构数据
      // let res = await allrights("tree");
      // let treeArr = res.data;
      // console.log("树结构所有权限", treeArr);

      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg);
        this.rightslist = listArr;
        console.log("当前角色下所有权限", role);

        //2.默认选中-通过递归拿到当前角色下最后一次出现children中权限id,推入到默认选中数组。
        //如何拿最后1个children？让循环走到底，看最后一个children是不是存在，如果没有,就拿当前id推入数组中。又因为数据不确定有几层，所以用递归来实现
        let arr = [];
        function fn(role) {
          if (!role.children) {
            return arr.push(role.id);
          }
          role.children.forEach((item) => fn(item));
        }
        fn(role);
        console.log("默认选择权限", arr);
        this.defKeys = arr;
      }
    },
    //3.更新角色
    async allotRights() {
      //拿那些全选中的和半选中tree属性
      let all = this.$refs.tree.getCheckedKeys(); //全选中id
      let half = this.$refs.tree.getHalfCheckedKeys(); //半选中id

      // console.log('全选中,半选中id',all,half);
      //字符串格式的角色权限——合并数组转字符串
      let str = [...all, ...half].join(",");

      //走接口-更新角色-需要角色id,字符串格式的角色权限
      let res = await updaterole({ id: this.roleId, rids: str });
      //  console.log('189更新成功',res);
      if (res.meta.status === 200) {
        this.setRightDialogVisible = false;
        this.getRolesList();
      }
    },
  },
  //注意！！！watch是对象
  watch: {
    //监听当前路由变化
    $route: {
      handler(newVal) {
        console.log("当前路由信息", newVal);
        // $route.match包含从上到下的所有路由对象
        newVal.matched.forEach((item) => {
          this.breadList.push({ path: item.path, name: item.meta.title });
        });
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}

.el-button--mini {
  padding: 7px 12px;
}
</style>

