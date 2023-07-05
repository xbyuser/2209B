<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域，:gutter间隔属性，:span="8"占多少份，总计24栅格。 clearable表单清除属性 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 表单中elment给封装了@change更改事件, 如果用原生事件带个native @keyup.enter.native -->
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @keyup.enter.native="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域-通过prop绑定数据里字段显示数据。:data="userlist" 请求成功的数据，type="index"代表索引。1.如何实现操作当前，只实现改变当前这行数据？可使用作用域插槽<template slot-scope="scope">。 scope可返回当前行数据 2.1 切换状态如何设置？给当前行v-model双向绑定增加属性mg_state覆盖掉本身原有的状态mg_state,即 v-model="scope.row.mg_state" 2.2 注意通过@change触发事件更改状态@change="userStateChanged(scope.row)",把当前行信息作为参数传出去,提交接口 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽绑定当前用户切换状态 ，scope可获取当前行信息 -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            >
            </el-button>
            <!-- 分配角色按钮-提醒组件 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页思路:本接口主要是后台分页：后台要求传入当前页数pagenum,每页条数pagesize。后台会返回总条数total,当前页数pagesize。使用分页插件实现分页样式，当条数改变时传入条数提交接口，当页数改变时传入页数提交接口  -->
      <!-- 分页插件 @size-change(条数改变时触发) 
        @current-change(页数发生改变时触发)
        :current-page(设置当前页码)
        :page-size(设置每页的数据条数)  layout是布局样式
        :total(设置总页数) -->

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @close="setRoleDialogClosed"
    >
      <div>
        <p>当前的用户：{{ userInfo.username }}</p>
        <p>当前的角色：{{ userInfo.role_name }}</p>
        <p>
          分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <!-- 下拉原理 -->
          <!-- <select v-model="selectedRoleId" @change="getSelectId">
             <option value="11">aa</option>
             <option value="22">bb</option>
          </select> -->
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 思路：请求数据，渲染table,给每个table里项 <el-table-column label="姓名" prop="绑定数据里字段"></el-table-column>
import {
  userlist,
  adduser,
  changestatus,
  deluser,
  getUserById,
  edituser,
  roleslist,
  saverole,
} from "@/api/api.js";

export default {
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb();
      }

      cb(new Error("请输入合法的邮箱"));
    };

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile =
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      if (regMobile.test(value)) {
        return cb();
      }

      cb(new Error("请输入合法的手机号"));
    };

    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      userlist: [
        //用户列表
        // {
        //     "id": 25,
        //     "username": "tige117",
        //     "mobile": "18616358651",
        //     "type": 1,
        //     "email": "tige112@163.com",
        //     "create_time": "2017-11-09T20:36:26.000Z",
        //     "mg_state": true, // 当前用户的状态
        //     "role_name": "炒鸡管理员"
        // }
      ],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: "test",
        password: "123456",
        email: "11@qq.com",
        mobile: "13466688888",
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3~10个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "用户名的长度在6~15个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {
        username: "",
        email: "",
        mobile: "",
        id: "",
      },
      // 修改表单的验证规则对象
      editFormRules: {
        email: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入用户手机", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      rolesList: [],
      // 已选中的角色Id值
      selectedRoleId: "",
      breadList: [], //动态面包屑导航
    };
  },
  created() {
    //用户列表默认加载
    this.getUserList();
  },
  methods: {
    //用户列表
    async getUserList() {
      console.log(111);
      const res = await userlist(this.queryInfo);
      // console.log('用户列表',res);
      if (res.meta.status === 200) {
        this.userlist = res.data.users;
        this.total = res.data.total;
        this.$message.success(res.meta.msg);
      }
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    //更改开关状态 -1.注意这里后台要求请求方式为put请求，也就是相当于axios的更新请求 2.注意这里点击切换时，把切换后的状态发送给后台存储。如果ajax发送失败，取反不改变当前用户数据里状态
    //接口要求：传入当前行信息-当前id,与用户状态(即在页面内数据绑定的那行的状态)
    async userStateChanged(userinfo) {
      console.log(252, userinfo); //当前用户对象
      const res = await changestatus({
        id: userinfo.id,
        status: userinfo.mg_state,
      });
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg);
      }
      //除非提交失败，不能更改状态
      else {
        userinfo.mg_state = !userinfo.mg_state;
        // this.$message.error('修改状态失败')
      }
    },
    // 添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;

        const res = await adduser(this.addForm);

        if (res.meta.status === 201) {
          this.$message.success(res.meta.msg);
          // 隐藏添加用户的对话框
          this.addDialogVisible = false;
          // 重新获取用户列表数据
          this.getUserList();
        }
      });
    },
    // 展示编辑修改用户的对话框
    async showEditDialog(row) {
      //1.打开弹窗 editDialogVisible=true  2.把当前行信息传过来，存储全局变量 /如果后台给你接口-根据id查询用户   3.按照接口文档要的参数——提交接口
      this.editDialogVisible = true;
      console.log("row", row);
      this.editForm.username = row.username;
      this.editForm.email = row.email;
      this.editForm.mobile = row.mobile;
      this.editForm.id = row.id;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;

        //走接口
        let res = await edituser({
          id: this.editForm.id,
          email: this.editForm.email,
          mobile: this.editForm.mobile,
        });
        if (res.meta.status == 200) {
          this.$message.success(res.meta.msg);
          this.editDialogVisible = false;
          //刷新新的数据
          this.getUserList();
        }
      });
    },
    // 根据Id删除对应的用户信息
    async removeUserById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }

      const res = await deluser(id);

      if (res.meta.status === 200) {
        this.$message.success("删除用户成功！");
        this.getUserList();
      }
    },
    //下拉列表原理——下拉改变时会自动触发onchange事件，拿到对应option里的value值
    // getSelectId(){
    //    console.log('下拉数据每个id',this.selectedRoleId)
    // },
    // 展示分配角色的对话框-1.弹出对话框，拿到当前行数据，请求角色列表接口 2.下拉列表绑定v-model，获取每个下拉角色id 3.分配角色-提交用户id,角色id
    async setRole(row) {
      this.userInfo = row;
      // 在展示对话框之前，获取所有角色的列表
      const res = await roleslist();
      if (res.meta.status === 200) {
        this.rolesList = res.data;

        this.setRoleDialogVisible = true;
      }
    },

    // 点击按钮，分配角色
    async saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.error("请选择要分配的角色！");
      }
      //走接口
      const res = await saverole({
        id: this.userInfo.id,
        rid: this.selectedRoleId,
      });

      if (res.meta.status === 200) {
        this.$message.success("分配角色成功！");
        this.getUserList();
        this.setRoleDialogVisible = false;
      }
    },
    // 监听分配角色对话框的关闭事件
    setRoleDialogClosed() {
      this.selectedRoleId = "";
      this.userInfo = {};
    },
  },
  //动态实现面包屑导航
  watch: {
    $route: {
      handler(newVal) {
        console.log("当前路由信息", newVal, newVal.path);
        let list = [];
        // $route.match包含从上到下的所有路由对象
        newVal.matched.forEach((item) => {
          list.push({
            path: item.path || "/",
            name: item.meta.title,
          });
        });
        this.breadList = list;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

