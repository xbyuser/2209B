<template>
  <el-row type="flex" style="width:100%" justify="space-between">
    <el-col>{{ treeNode.name }}</el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span>操作</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
// 组件封装原则- 复用的结构 - 别人用你的组件给你传参数 props
import { delDepartments } from '@/api/departments'
export default {
  // props: ['treeNode']
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    operateDepts(type) {
      if (type === 'add') {
      //  添加
      // 告诉父组件 要弹层了
        this.$emit('addDepts', this.treeNode) // 告诉父组件 要在哪个地方加数据
      } else if (type === 'edit') {
        // 编辑
        this.$emit('editDepts', this.treeNode) // 告诉父组件 编辑的是哪个节点
      } else {
        // 删除
        this.$confirm('确定要删除该部门吗').then(() => {
          // 要删除数据
          return delDepartments(this.treeNode.id)
        }).then(() => {
          // 进入这里删除成功
          // 子传父 通知父组件 更新数据
          this.$emit('delDepts')
        }).catch(() => {})
      }
    }
  }
}
</script>

<style>

</style>
