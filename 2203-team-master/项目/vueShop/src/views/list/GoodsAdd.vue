<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false">
      </el-alert>
      <!-- 步骤条区域 -->
      <el-steps :space="200" finish-status="success" align-center :active="activeIndex - 0">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- tab栏区域 -->

      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
        <el-tabs :tab-position="'left'" :before-leave="beforeTabLeave" @tab-click="tabClicked" v-model="activeIndex">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader expand-trigger="hover" :options="cateList" :props="cateProps" v-model="addForm.goods_cat"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 动态参数 -->
            <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
              <!-- 复选框组 -->
              <el-checkbox-group v-model="item.newVals">
                <el-checkbox :label="cb" v-for="(cb, i) in item.attr_vals" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <!-- 静态属性 -->
            <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
              <!-- 复选框组 -->
              <el-checkbox-group v-model="item.newVals">
                <el-checkbox :label="cb" v-for="(cb, i) in item.attr_vals" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- el-upload商品图片上传
  action:指定图片上传api接口
  :on-preview ： 当点击图片时会触发该事件进行预览操作,处理图片预览
  :on-remove : 当用户点击图片右上角的X号时触发执行
  :on-success：当用户点击上传图片并成功上传时触发
  list-type ：设置预览图片的方式
  :headers ：设置上传图片的请求头 -->
            <el-upload :action="uploadURL" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture"
              :headers="headerObj" :on-success="handleSuccess">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器组件 -->
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <!-- 添加商品的按钮 -->
            <el-button type="primary" class="btnAdd" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" alt="" class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
//思路- 0.布局-用到步骤条el-step组件,每个tab组件里套着表单组件。步骤条与tab如何联动？，可给tab声明1个激活索引v-model="activeIndex"同时每个tab子项给到name=“索引”，步骤条调用该索引   1.tab切换验证：切换下一个,得验证上一个是否选择？可用离开之前属性-:before-leave 调用方法，判断用户是否选择了下拉的3级列表  2.点击商品属性或商品参数面板，要根据上次选择的3级分类id请求对应数据。你怎么知道它点击的是商品属性，还是商品参数？点击时@tab-click="tabClicked"通过判断当前激活索引是多少，做相应的接口请求 4.提交必须的参数接口-看是否能提交进去,正则验证
//点击上传-1.上传成功，会触发成功的事件，通达file文件里流信息，拿到临时路径存储后台要求的字段里 2.本地删除-从file流协议里找到你要删除的那个临时路径，从提交的数组中splice切掉 3.预览功能-通达file文件里流获取后台返回的正式地址，写到图片src里

import { catelist, attrlist, addgoods } from "@/api/api.js"

export default {
  data() {
    return {
      activeIndex: 0,
      // 添加商品的表单数据对象
      addForm: {
        goods_name: "奎哥22",
        goods_price: 10,
        goods_weight: 10,
        goods_number: 10,
        // 商品所属的分类数组
        // goods_cat: [1,3,6],
        goods_cat: [],
        // 图片的数组
        pics: [
          //  {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"},
          //  {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b9"}
        ], //{'pic':'存储上传成功后的临时路径'}
        // 商品的详情描述
        goods_introduce: "",
        attrs: [],
      },
      addFormRules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
        goods_cat: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
      },
      // 商品分类列表
      cateList: [],
      cateProps: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      // 动态参数列表数据
      manyTableData: [],
      // 静态属性列表数据
      onlyTableData: [],
      // 上传图片的接口地址
      // uploadURL: "http://127.0.0.1:8888/api/private/v1/upload",
      uploadURL: "https://lianghj.top:8888/api/private/v1/upload",
      // 图片上传组件的headers请求头对象
      headerObj: {
        Authorization: localStorage.getItem("token"),
      },
      previewPath: "", //预览路径
      previewVisible: false,
    }
  },
  created() {
    //获取商品分类列表
    this.getCateList()
  },
  methods: {
    // 获取商品分类列表数据
    async getCateList() {
      const res = await catelist()
      if (res.meta.status === 200) {
        this.$message.success("获取分类列表成功")
        // 把数据列表，赋值给 catelist
        this.cateList = res.data
      }
    },
    // 级联选择器选中项变化，会触发这个函数-如果选择3级以下，下拉框内不显示
    handleChange() {
      console.log(this.addForm.goods_cat)
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },

    //判断用户从哪里离开，有没有选择级联菜单-要配置tab离开属性:before-leave="beforeTabLeave"
    beforeTabLeave(activeName, oldActiveName) {
      console.log(activeName, oldActiveName) //新的，老的
      //判断条件-从第1个离开同时下拉列表选择了第3个
      if (oldActiveName == 0 && this.addForm.goods_cat.length != 3) {
        this.$message.error("请选择商品分类为3级")
        return false
      }
    },

    // 如果选中的是商品参数或商品属性分别获取数据
    async tabClicked() {
      //判断选择是商品动态参数1，还是商品静态属性2，分别请求对应接口
      console.log(202, this.activeIndex)
      let cateId = this.addForm.goods_cat[this.addForm.goods_cat.length - 1]
      console.log(198, cateId)
      if (this.activeIndex == 1) {
        const res = await attrlist({ id: cateId, sel: "many" })

        if (res.meta.status === 200) {
          this.$message.success("获取动态参数成功")
          res.data.forEach((item) => {
            item.attr_vals =
              item.attr_vals.length === 0 ? [] : item.attr_vals.split(" ")
            // 处理多选框选中消失的bug?——深拷贝一份数据
            item.newVals = JSON.parse(JSON.stringify(item.attr_vals))
          })
          this.manyTableData = res.data
        }
      } else if (this.activeIndex == 2) {
        const res = await attrlist({ id: cateId, sel: "only" })

        if (res.meta.status == 200) {
          this.$message.success("获取静态属性成功")
          res.data.forEach((item) => {
            item.attr_vals =
              item.attr_vals.length === 0 ? [] : item.attr_vals.split(" ")
            // 处理多选框选中消失的bug?——深拷贝一份数据
            item.newVals = JSON.parse(JSON.stringify(item.attr_vals))
          })
          this.onlyTableData = res.data
        }
      }
    },

    // 处理图片预览效果
    //1.通过点击时当前文件流信息，获取后台会返回1个正式路径地址，你把此路径写入到图片<img src="后端返回url地址">中即可
    handlePreview(file) {
      console.log(228, file)
      let url = file.response.data.url
      this.previewPath = url
      this.previewVisible = true
    },

    // 处理移除图片的操作
    //0.在移除的时候删除的是临时路径 1. 如何获取将要删除的图片的临时路径 ?删除时会响应当前文件信息， 从提交表单图片pics数组中，找到这个图片对应的索引值。从该数组中splice切除掉
    handleRemove(file) {
      // console.log(228,file); //点击这行信息，拿出删除临时路径
      let tpm_path = file.response.data.tmp_path
      //从数组中把它删除掉  ['a','b'].indexOf('b')
      //findIndex可以遍历,写循环条件查出下标
      let i = this.addForm.pics.findIndex((item) => item.pic == tpm_path) //返回下标
      console.log(235, i)
      this.addForm.pics.splice(i, 1)
    },

    // 监听图片上传成功的事件-response[{pic:临时路径地址}]
    //0.点击上传成功后 ,后台会返回临时路径和正式地址 1. 拼接得到一个图片信息对象 const picInfo = { pic: response.data.tmp_path } ！！注意，因为后端接口需要传pic字段，所以拼接下  2. 将图片信息对象picInfo，push 到表单图片pics数组中
    handleSuccess(res) {
      console.log(230, res) //成功响应有临时路径，还有正式地址
      let picStr = { pic: res.data.tmp_path } //注意要按照接口里要求的键拼接 {'pic':'上传成功后的临时路径'}
      this.addForm.pics.push(picStr)
    },

    // 最后添加商品-先验证用户必选项有没有选择
    add() {
      this.$refs["addFormRef"].validate(async (valid) => {
        //验证通过
        if (valid) {
          //此处有bug-当提交商品失败后,如果用户没有在次选择级联会有报错提醒用户，选择级联
          // this.addForm.goods_cat= this.addForm.goods_cat.join(',')

          //解决办法—深拷贝一份,表单绑定时用数据，提交接口时用深复制后的数据
          const form = JSON.parse(JSON.stringify(this.addForm))
          //提交接口-商品分类要字符串，声明的时候是数组，最后要转换下
          form.goods_cat = form.goods_cat.join(",")

          // 处理动态参数
          this.manyTableData.forEach((item) => {
            const newInfo = {
              attr_id: item.attr_id,
              attr_value: item.newVals.join(" "),
            }
            this.addForm.attrs.push(newInfo)
          })
          // 处理静态属性
          this.onlyTableData.forEach((item) => {
            const newInfo = {
              attr_id: item.attr_id,
              attr_value: item.newVals.join(" "),
            }
            this.addForm.attrs.push(newInfo)
          })

          form.attrs = this.addForm.attrs
          console.log(form)
          //提交接口
          const res = await addgoods(form)

          if (res.meta.status === 201) {
            this.$message.success(res.meta.msg)
            this.$router.push("/goods")
          }
        } else {
          this.$message.error("请填写必要的商品信息")
          return false
        }
      })
    },
  },
  //计算属性
  computed: {
    //方法名，要有返回值
    // cateId(){
    //    return  this.addForm.goods_cat[this.addForm.goods_cat.length-1]
    // }
  },
}
</script>

<style lang="scss" scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}

.previewImg {
  width: 100%;
}

.btnAdd {
  margin-top: 15px;
}

//sass,less: 注意此处用/deep/进行样式穿透时,可能会报错，可用::v-deep
::v-deep .ql-editor {
  min-height: 300px;
}
</style>
