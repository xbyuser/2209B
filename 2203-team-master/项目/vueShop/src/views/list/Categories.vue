<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>

      <!-- 分类列表 !!!注意row-key绑定自己数据id,row-key="cat_id" 它是控制展示子级数据的 -->
      <el-table :data="catelist" style="width: 100%" border row-key="cat_id">
        <el-table-column label="索引" type="index"> </el-table-column>
        <el-table-column prop="cat_name" label="分类名称" />
        <el-table-column prop="cat_deleted" label="是否有效">
          <template slot-scope="scope">
            <i
              class="el-icon-success"
              v-if="!scope.row.cat_deleted"
              style="color: lightGreen"
            ></i>
            <i class="el-icon-error" v-else style="color: red"></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level == 0">一级</el-tag>
            <el-tag v-if="scope.row.cat_level == 1" type="success">二级</el-tag>
            <el-tag v-if="scope.row.cat_level == 2" type="warning">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editCate(scope.row)"
              >修改
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delCate(scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="querInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <!-- 添加分类的表单 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类：">
          <!-- options 用来指定数据源 -->
          <!-- props 用来指定配置对象 -->
          <!-- <el-cascader expand-trigger="hover" :options="parentCateList" :props="cascaderProps" v-model="selectedKeys" @change="parentCateChanged" clearable change-on-select>
          </el-cascader> -->
          <!-- 思路 -1.options数据字段是否跟咱的数据字段一样 。:props="cascaderProps"绑定自己数据源 2.提交接口-要名称，选择的id,选择几级       -->
          <el-cascader
            :options="parentCateList"
            :props="cascaderProps"
            clearable
            v-model="selectedKeys"
            @change="parentCateChanged"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { catelist, addcate, editcate, delcate } from "@/api/api.js";

export default {
  data() {
    return {
      // 查询条件
      querInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      // 商品分类的数据列表，默认为空
      catelist: [
        {
          cat_id: 1,
          cat_name: "大家电",
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_id: 3,
              cat_name: "电视",
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 6,
                  cat_name: "曲面电视",
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false,
                },
                {
                  cat_id: 7,
                  cat_name: "海信",
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false,
                },
              ],
            },
          ],
        },
      ],
      // 总数据条数
      total: 0,
      // 控制添加分类对话框的显示与隐藏
      addCateDialogVisible: false,
      // 添加分类的表单数据对象
      addCateForm: {
        // 将要添加的分类的名称
        cat_name: "",
        // 父级分类的Id
        cat_pid: 0,
        // 分类的等级，默认要添加的是1级分类
        cat_level: 0,
      },
      // 添加分类表单的验证规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      // 父级分类的列表
      parentCateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: "cat_id", //绑定自己数据
        label: "cat_name",
        children: "children",
        checkStrictly: true, //显示单选框按钮，单级也可选
        expandTrigger: "hover", //划上显示数据
      },
      // 选中的父级分类的Id数组
      selectedKeys: [],
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取商品分类数据
    async getCateList() {
      this.querInfo.type = 3;
      const res = await catelist({
        params: this.querInfo,
      });

      if (res.meta.status === 200) {
        this.$message.success("获取分类列表成功");
        // 把数据列表，赋值给 catelist
        this.catelist = res.data.result;
        // 为总数据条数赋值
        this.total = res.data.total;
      }
    },
    // 监听 pagesize 改变
    handleSizeChange(newSize) {
      this.querInfo.pagesize = newSize;
      this.getCateList();
    },
    // 监听 pagenum 改变
    handleCurrentChange(newPage) {
      this.querInfo.pagenum = newPage;
      this.getCateList();
    },
    // 点击按钮，展示添加分类的对话框
    async showAddCateDialog() {
      //清除下级联绑定的数据,调用分类数据列表，注意只要2级
      this.addCateDialogVisible = true;
      //级联菜单接口
      this.querInfo.type = 2;
      let res = await catelist({ params: this.querInfo });
      console.log("级联数据", res);
      if (res.meta.status === 200) {
        this.$message.success("获取分类中下列列表成功");
        this.parentCateList = res.data.result;
      }
    },
    // @change选择项发生变化触发这个函数——条件-不能提交到第3层
    parentCateChanged() {
      console.log("级联改变数组", this.selectedKeys);
      let arr = this.selectedKeys;
      this.addCateForm.cat_pid = arr[arr.length - 1]; //拿父id
      this.addCateForm.cat_level = arr.length; //拿级别
    },
    // 添加新的分类——提交接口1.父类id，第几级别如何获取，？1.拿数组的最后1个值this.selectedKeys.length-1 2.第几级-数组的长度this.selectedKeys.length
    addCate() {
      this.$refs.addCateFormRef.validate(async (valid) => {
        if (!valid) return;
        const res = await addcate(this.addCateForm);

        if (res.meta.status === 201) {
          this.$message.success("添加分类成功！");
          this.getCateList();
          this.addCateDialogVisible = false;
        }
      });
    },
    //修改
    editCate(row) {},
    //删除
    delCate(row) {},
    // 监听对话框的关闭事件，重置表单数据
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields();
      this.selectedKeys = [];
      this.addCateForm.cat_level = 0;
      this.addCateForm.cat_pid = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.treeTable {
  margin-top: 15px;
}

.el-cascader {
  width: 100%;
}
.el-button--mini {
  padding: 6px 6px;
}
</style>
