<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 内容 -->
      <el-card class="tree-card">
        <!-- 卡片 -->
        <!-- 第一种 -->
        <!-- <template slot="header">我是头</template> -->
        <!-- 第二种 -->
        <!-- <template v-slot:header>123</template> -->
        <!-- 第三种 -->
        <tree-tools :tree-node="company" is-root @addDepts="addDepts" />
        <div style="height: 20px" />
        <!-- 放置树形组件 -->
        <el-tree :data="departs" default-expand-all :props="defaultProps">
          <!-- <el-row slot-scope="{ data }" type="flex" style="width:100%" justify="space-between"> -->
          <!-- <template v-slot="{ data }" v-slot:default="{ data }" #default="{ data }"> -->
          <!-- v-slot #只能作用在template标签上 -->
          <template #default="{ data }">
            <tree-tools :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 放置弹层 -->
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />

  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: { name: '', manager: '负责人', id: '' },
      departs: [],
      defaultProps: {
        label: 'name'
      },
      showDialog: false,
      node: null,
      loading: false
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      this.loading = true
      const { companyName, depts } = await getDepartments()
      await new Promise((resolve) => setTimeout(() => resolve(), 1000))
      this.company.name = companyName // 赋值公司数据
      this.departs = transListToTreeData(depts, '')
      this.loading = false
    },
    // node 是在该节点下 添加子部门
    addDepts(node) {
      // 弹层
      this.showDialog = true
      this.node = node
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id) // 父组件调用子组件的方法
      // 父组件可以通过ref获取子组件实例
      // 父传子 props 子传父
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 20px 140px;
  font-size: 16px;
}

</style>
