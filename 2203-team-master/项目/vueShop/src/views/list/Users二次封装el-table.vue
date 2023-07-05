<template>
  <div>
    <!-- 导航组件 -->
    <my-bread :breadList="breadList"></my-bread>

    <!--表格图表展示-调用自己封装的业务组件 -->
    <my-table
      :data="userlist"
      v-model="queryInfo"
      :cols="cols"
      :total="total"
      @size="handleSizeChange"
      @current="handleCurrentChange"
    >
      <!-- vue2.6后的具名插槽  v-slot:header ,也可赋值接收属性   -->
      <template v-slot:state="{ row }">
        <el-switch @change="userStateChanged(row)" v-model="row.mg_state">
        </el-switch>
      </template>
      <template v-slot:action="{ row }">
        <!-- 编辑 -->
        <el-button size="mini" type="primary" @click="showEditDialog(row)"
          ><i class="el-icon-edit"></i
        ></el-button>
        <!-- 删除 -->
        <el-button size="mini" type="danger" @click="removeUserById(row.id)"
          ><i class="el-icon-delete"></i
        ></el-button>
        <!-- 分配角色 -->
        <el-button size="mini" type="warning" @click="setRole(row)"
          ><i class="el-icon-s-tools"></i
        ></el-button>
      </template>
    </my-table>

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

// import MyTable from "@/components/Table"; //封装table业务组件
import MyBread from "@/components/Bread"; //封装面包屑

export default {
  data() {
    return {
      //面包屑导航
      breadList: [
        {
          path: "/home",
          title: "首页",
        },
        {
          path: "/users",
          title: "用户管理",
        },
        {
          path: "/users",
          title: "用户列表",
        },
      ],
      //每个table列配置的内容
      cols: [
        {
          title: "#",
          type: "index",
        },
        {
          title: "姓名",
          name: "username",
        },
        {
          title: "邮箱",
          name: "email",
        },
        {
          title: "电话",
          name: "mobile",
        },
        {
          title: "角色",
          name: "role_name",
        },
        {
          title: "状态",
          slot: "state",
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 270,
        },
      ],
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      userlist: [],
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
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, trigger: "blur" },
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
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入用户手机", trigger: "blur" },
          { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, trigger: "blur" },
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
    };
  },
  created() {
    //用户列表默认加载
    this.getUserList();
  },
  components: {
    // MyTable,
    MyBread,
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
};
</script>

<style lang="scss" scoped>
</style>
