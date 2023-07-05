<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 警告区域 -->
      <el-alert
        show-icon
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        :closable="false"
      ></el-alert>

      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            expand-trigger="hover"
            :options="cateListData"
            :props="cateProps"
            v-model="selectedCateKeys"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>

      <!-- tab 页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleChange">
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加参数的按钮 -->
          <el-button
            type="primary"
            size="mini"
            :disabled="selectedCateKeys.length != 3 ? true : false"
            @click="addDialogVisible = true"
            >添加参数
          </el-button>
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  :key="tag"
                  v-for="tag in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row, tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="showEditDialog(scope.row.attr_id)"
                  >编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeParams(scope.row.attr_id)"
                  >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 添加静态属性的面板 -->
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加参数的按钮 -->
          <el-button
            type="primary"
            size="mini"
            :disabled="isBtnDisabled"
            @click="addDialogVisible = true"
            >添加参数
          </el-button>
          <!-- 动态参数表格 -->
          <el-table :data="onlyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  :key="tag"
                  v-for="tag in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row, tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="showEditDialog(scope.row.attr_id)"
                  >编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeParams(scope.row.attr_id)"
                  >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数或属性的对话框 -->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 点击编辑的对话框 -->
    <el-dialog
      :title="'修改' + titleText"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//tag标签实现思路  1.下拉选择@change绑定数组[1,2,3]，请求参数列表，传分类catID(数组中最后1个)和选择项tab切换里的属性activename(绑定v-model，通过name拿到)  2.拿到数据渲染，渲染到table表格里，别忘记给prop绑定自己数据字段  3.渲染的tag标签-给外面套一个作用域插槽,作用就是获取到当前行数据，给当前行绑定value,绑定是否可见  4.tag标签输入内容触发方法-把输入的内容加到原来数据里attr_vals里，合到一起提交  5.提交tab标签接口-需要大分类id,属性id,属性名字,tag拼接后的字符串,当前在哪个tab切换里

import {
  catelist,
  attrlist,
  addattr,
  delattr,
  getAttrById,
  updateattr,
} from "@/api/api.js";

export default {
  data() {
    return {
      //tag死数据
      // dynamicTags: ["标签一", "标签二", "标签三"],
      // inputVisible: false,
      // inputValue: "",
      // 商品分类列表
      cateListData: [],
      // 级联选择框的配置对象
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 级联选择框双向绑定到的数组
      selectedCateKeys: [],
      // 被激活的页签的名称
      activeName: "many",
      // 动态参数的数据
      manyTableData: [
        // {
        //   attr_id: 1,
        //   attr_name: "cpu1",
        //   cat_id: 11,
        //   attr_sel: "only",
        //   attr_write: "manual",
        //   attr_vals: "ffff   aa",
        // },
        // {
        //   attr_id: 2,
        //   attr_name: "cpu2",
        //   cat_id: 22,
        //   attr_sel: "only",
        //   attr_write: "manual",
        //   attr_vals: "ffff  bb",
        // },
      ],
      // 静态属性的数据
      onlyTableData: [],
      // 控制添加对话框的显示与隐藏
      addDialogVisible: false,
      // 添加参数的表单数据对象
      addForm: {
        attr_name: "",
      },
      // 添加表单的验证规则对象
      addFormRules: {
        attr_name: [
          { required: true, message: "请输入参数名称", trigger: "blur" },
        ],
      },
      // 控制修改对话框的显示与隐藏
      editDialogVisible: false,
      // 修改的表单数据对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        attr_name: [
          { required: true, message: "请输入参数名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取所有的商品分类列表-接口要求参数可以不传，就走默认
    async getCateList() {
      let res = await catelist();
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
        this.cateListData = res.data;
      }
    },
    // 级联选择框选中项变化，会触发这个函数-请求参数列表接口
    async handleChange() {
      let arr = this.selectedCateKeys;
      // console.log("分类id", arr[2], this.activeName);

      if (arr.length != 3) {
        this.$message.error("只能选择三级分类");
        this.selectedCateKeys = [];
        this.manyTableData = [];
        return false;
      }
      //走接口-请求参数列表(父级分类id，在哪个属性里)   attrlist({id:cateid,sel:'many'})
      let res = await attrlist({ id: arr[2], sel: this.activeName });
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
        //处理原数据-给每行数据增加属性，字符串变数组,显示，文本value值等
        res.data.forEach((item) => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
          item.inputVisible = false;
          item.inputValue = "";
        });
        // console.log("修改后数据", res.data);
        this.manyTableData = res.data;
        this.onlyTableData = res.data;
      }
    },
    // tab 页签点击事件的处理函数
    handleTabClick() {},
    // 获取参数的列表数据
    async getParamsData() {},
    // 监听添加对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮，添加参数
    addParams() {},
    // 点击按钮，展示修改的对话框
    async showEditDialog(attrId) {
      // 查询当前参数的信息
    },
    // 重置修改的表单
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 点击按钮，修改参数信息
    editParams() {},
    // 根据Id删除对应的参数项
    async removeParams(attrId) {},

    //可把编辑tag,删除tag标签用到的接口，统一提炼成1个方法
    async saveAttrVals(row) {},

    // 文本框失去焦点，或摁下了 Enter 都会触发
    async handleInputConfirm(row) {
      console.log("当前行数据", row);
      let inputValue = row.inputValue;
      if (inputValue) {
        row.attr_vals.push(inputValue);
      }
      row.inputVisible = false;
      row.inputValue = "";

      //走接口 ——更新参数或属性 updateattr({id:分类id,attr_id:属性id,attr_name:属性名,attr_sel:tab项,attr_vals:字符串提交,})
      let res = await updateattr({
        id: row.cat_id,
        attr_id: row.attr_id,
        attr_name: row.attr_name,
        attr_sel: this.activeName,
        attr_vals: row.attr_vals.join(" "),
      });
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
      }
    },
    // 点击按钮，展示文本输入框
    showInput(row) {
      row.inputVisible = true;
      //nextTick里面是promise封装的回调函数，是异步里面的微任务。定时器是宏任务
      // setTimeout(()=>{
      // // this.$refs.saveTagInput.focus();
      //     console.log(11);
      // },0)
      this.$nextTick((_) => {
        console.log(22);
        this.$refs.saveTagInput.focus(); //获取焦点事件
      });
    },
    // 删除对应的参数可选项
    async handleClose(row, tag) {
      row.attr_vals.splice(row.attr_vals.indexOf(tag), 1);

      //走接口 ——更新参数或属性 updateattr({id:分类id,attr_id:属性id,attr_name:属性名,attr_sel:tab项,attr_vals:字符串提交,})
      let res = await updateattr({
        id: row.cat_id,
        attr_id: row.attr_id,
        attr_name: row.attr_name,
        attr_sel: this.activeName,
        attr_vals: row.attr_vals.join(" "),
      });
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
      }
    },
  },
  computed: {
    // 如果按钮需要被禁用，则返回true，否则返回false
    isBtnDisabled() {
      if (this.selectedCateKeys.length !== 3) {
        return true;
      }
      return false;
    },
    // 当前选中的三级分类的Id
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2];
      }
      return null;
    },
    // 动态计算标题的文本
    titleText() {
      if (this.activeName == "many") {
        return "动态参数";
      }
      return "静态属性";
    },
  },
};
</script>

<style lang="scss" scoped>
.cat_opt {
  margin: 15px 0;
}

.el-tag {
  margin: 10px;
}

.input-new-tag {
  width: 120px;
}
</style>
