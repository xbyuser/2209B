<template>
  <div>
    <upload-excel :on-success="onSuccess" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  methods: {
    async onSuccess({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      // [{ 入职日期:,姓名： ‘张三’ }, {}, {},{}] result
      // [{ timeOfEntry: '', username: '张三' }]
      const newList = results.map(item => {
        // item是  { 姓名: '张三' }
        const obj = {}
        Object.keys(item).forEach(key => {
          // key是中文
          // const eName = userRelations[key] // 得到的英文名称
          // const value = item[key] // 值
          // obj[eName] = value
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            obj[userRelations[key]] = this.formatDate(item[key], '/') // 第二个参数 是 2019-08-09 2019/08/09
          } else {
            obj[userRelations[key]] = item[key]
          }
        })
        return obj
      })
      // newList就是转化过的数据- 插入到员工列表中了
      console.log(newList)
      await importEmployee(newList) // 导入员工
      this.$message.success('导入员工成功')
      this.$router.push('/employee') // 重新跳转到员工页面
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
