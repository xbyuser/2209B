<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!-- 内容 -->
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="2-50个字符" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="2-50个字符" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" placeholder="请选择负责人" style="width:80%" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" placeholder="1-300个字符" type="textarea" :rows="4" style="width:80%" />
      </el-form-item>
    </el-form>
    <template #footer>
      <!-- 放置按钮 -->
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button @click="btnCancel">取消</el-button>
          <el-button type="primary" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartDetail, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    const checkNameRepeat = async(rule, value, callback) => {
      // 只要进入这个位置- 开始检查- 获取最新的数据
      const { depts } = await getDepartments() // 获取最新的数组
      // 判断value是否和 depts中的同级部门出现了重复
      // this.treeNode 是点击了哪个节点 添加子部门 仁伟财务部 的子级的pid = 仁伟财务部.id
      // value 123 - 要和treeNode的子级的去比较
      // id pid
      let isRepeat = false
      if (this.formData.id) {
        // 编辑场景
        const otherList = depts.filter(item => item.pid === this.formData.pid && item.id !== this.formData.id)
        // 得到其他的部门list
        isRepeat = otherList.some(item => item.name === value)
      } else {
        const list = depts.filter(item => item.pid === this.treeNode.id) // 得到的是所有的子级
        isRepeat = list.some(item => item.name === value) // 是否重复
      }
      isRepeat ? callback(new Error(`同级部门已经有${value}的部门了`)) : callback()
    }
    // 检查编码的重复- 在所有部门中都不能重复
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments() // 获取最新的数组
      let isRepeat = false
      if (this.formData.id) {
        // 编辑场景
        const otherList = depts.filter(item => item.id !== this.formData.id)
        isRepeat = otherList.some(item => item.code === value)
      } else {
        isRepeat = depts.some(item => item.code === value)
      }
      isRepeat ? callback(new Error(`组织架构中已经有${value}的编码了`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 50, message: '部门名称要求2-50个字符', trigger: 'blur' }, {
            validator: checkNameRepeat, trigger: 'blur'
          }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 50, message: '部门编码要求2-50个字符', trigger: 'blur' }, {
            validator: checkCodeRepeat, trigger: 'blur'
          }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },
      peoples: []
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    btnOK() {
      this.$refs.deptForm.validate(async isOK => {
        if (isOK) {
          // 提交表单
          if (this.formData.id) {
            await updateDepartments(this.formData)
          } else {
            // 添加子部门要加一个pid- 确认加到哪个部门下面
            await addDepartments({ ...this.formData, pid: this.treeNode.id })
          }
          this.$message.success(`${this.showTitle}成功`)
          this.$emit('addDepts')
          this.$emit('update:showDialog', false) // 配套sync修饰符使用
        }
      })
    },
    btnCancel() {
      this.$refs.deptForm.resetFields() // 只能清除表单中的数据
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
      this.$emit('update:showDialog', false) // 配套sync修饰符使用
    },
    async  getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    }
  }

}
</script>

<style>

</style>
