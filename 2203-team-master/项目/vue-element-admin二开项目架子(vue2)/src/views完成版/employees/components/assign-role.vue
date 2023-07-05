<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">

    <!-- 多选框组 -->
    <el-checkbox-group v-model="roleIds">
      <!-- 放el-checkbox 有多少个角色放多少个多选框 -->
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </template>

  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      roleIds: [], // 选中的角色的列表
      roleList: []
    }
  },
  watch: {
    userId() {
      if (this.userId) {
        this.getUserDetailById(this.userId)
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList()
      this.roleList = rows
    },
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds // 赋值本用户的角色
    },
    btnCancel() {
      this.roleIds = []
      this.$emit('update:showRoleDialog', false)
      this.$emit('update:userId', null) // 每次关闭的时候 都要将userId设置为空 因为这样能保证 点击同一员工时  userId是变化的
    },
    async btnOK() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      this.$message.success('分配角色成功')
      this.btnCancel()
    }
  }
}
</script>

<style>

</style>
