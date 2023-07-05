<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools show-before>
        <template #before>
          当前共有{{ pageParams.total }}条记录
        </template>
        <template #after>
          <el-button type="danger" size="small" @click="exportData">普通excel导出</el-button>
          <el-button type="warning" size="small">负责excel导出</el-button>
          <el-button type="success" size="small" @click="$router.push('/import')">excel导入</el-button>
          <el-button type="primary" size="small" @click="showDialog = true">新增员工</el-button>
        </template>
      </page-tools>
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="头像" align="center">
            <template #default="{ row }">
              <el-avatar :size="80" :src="row.staffPhoto || require('@/assets/common/bigUserHeader.png')" @click.native="showCode(row.staffPhoto)" />
            </template>

          </el-table-column>
          <el-table-column label="手机号" sortable="" prop="mobile" />

          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" :formatter="formatEmployment" prop="formOfEmployment" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <!-- <template slot-scope="{ row }">
            <template v-slot="{ row }">
            <template v-slot:default="{ row }"> -->
            <template #default="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>

          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template #default="{ row }">
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default="{ row }">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="assignRole(row.id)">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
          <el-pagination
            :total="pageParams.total"
            :current-page="pageParams.page"
            :page-size="pageParams.size"
            layout="prev, pager, next"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <add-employee :show-dialog.sync="showDialog" />
    <el-dialog title="二维码" :visible.sync="showQrCode">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>

    </el-dialog>
    <assign-role ref="assignRole" :user-id.sync="userId" :show-role-dialog.sync="showRoleDialog" />
  </div>

</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import AddEmployee from './components/add-employee.vue'
import EmployeeEnum from '@/api/constant/employees'
import AssignRole from './components/assign-role.vue'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'
export default {
  components: {
    AddEmployee,
    AssignRole
  },
  data() {
    return {
      list: [], // 存员工列表数据
      pageParams: {
        page: 1,
        size: 10,
        total: 0
      },
      showDialog: false,
      showQrCode: false,
      showRoleDialog: false,
      userId: null
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      const { total, rows } = await getEmployeeList(this.pageParams)
      this.pageParams.total = total
      this.list = rows
    },
    //
    changePage(newPage) {
      this.pageParams.page = newPage // 2
      this.getEmployeeList()
    },
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === +cellValue)
      return obj ? obj.value : '未知'
      // EmployeeEnum.hireType.find(item => item.id === parseInt(cellValue))
    },
    async delEmployee(id) {
      // this.$confirm('确认要删除该员工吗').then(() => {
      //   return delEmployee(id)
      // }).then(() => {
      //   this.$message.success('删除用户成功')
      //   this.getEmployeeList()
      // })
      try {
        await this.$confirm('确认要删除该员工吗')
        await delEmployee(id)
        this.$message.success(
          '删除用户成功'
        )
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    },
    // 导出数据
    exportData() {
      // 懒加载
      import('@/vendor/Export2Excel').then(async excel => {
        const headers = {
          '姓名': 'username',
          '手机号': 'mobile',
          '入职日期': 'timeOfEntry',
          '聘用形式': 'formOfEmployment',
          '转正日期': 'correctionTime',
          '工号': 'workNumber',
          '部门': 'departmentName'
        }
        const { rows } = await getEmployeeList({ page: 1, size: this.pageParams.total })
        excel.export_json_to_excel({
          filename: '本公司人力资源统计表',
          header: Object.keys(headers),
          data: this.formatJson(headers, rows)
        })
        // excel就是导出的所有内容
        // excel.export_json_to_excel({
        //   filename: '当季销售统计表',
        //   header: ['月份', '销售额', '公司名称', '净利润', '毛利润', '环比增长'],
        //   data: [
        //     ['1月份', 200, '北京分公司', 200, 300, '40%'],
        //     ['1月份', 50000, '上海公司', 10, 20, '500%']]
        // })
        // 每页10条
        // 100 条
        // 1 每页total条
      })
    },
    // 格式化数据 - 符合条件的 data
    // header是中英文的对应关系
    // rows是所有的数据
    // [{},{},{}] => [[],[],[]]
    formatJson(header, rows) {
      return rows.map(item => {
        return Object.values(header).map(key => {
          if (key === 'formOfEmployment') {
            // 聘用形式
            const obj = EmployeeEnum.hireType.find(jj => jj.id === +item[key])
            return obj ? obj.value : '未知'
          } else if (key === 'timeOfEntry' || key === 'correctionTime') {
            return formatDate(item[key])
          } else {
            return item[key]
          }
        })
      })
    },
    showCode(url) {
      if (url) {
        this.showQrCode = true // 同步
        // 渲染绝对是异步-
        this.$nextTick(() => {
          // 此时意味着异步渲染已经结束了
          QrCode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message.warning('当前用户没有头像')
      }
    },
    async assignRole(id) {
      this.userId = id
      // await this.$refs.assignRole.getUserDetailById(id)
      this.showRoleDialog = true
    }
  }
}
</script>

<style>

</style>
