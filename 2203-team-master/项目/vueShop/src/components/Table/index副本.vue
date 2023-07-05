<template>
  <div>
    <!-- 封装table :tree-props="tp" :row-key="rowKey" 这2个属性主要用户渲染tree数据时使用-->
    <el-table
      :tree-props="tp"
      :row-key="rowKey"
      :data="data"
      border
      style="width: 100%"
      class="table"
    >
      <el-table-column
        :label="col.title"
        :prop="col.name"
        v-for="(col, index) in cols"
        :key="index"
        :type="col.type"
        :width="col.width"
        :align="col.align"
      >
        
        <template v-slot="{ row, index }"   v-if="col.slot">
          <slot :name="col.slot" :row="row" :index="index"> </slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="page"
      @size-change="sizeChange"
      @current-change="currentChange"
      :page-sizes="[1, 2, 5, 10]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "MyTable",
  methods: {
    /**
     * 分页或页码更改事件
     */
    sizeChange(val) {
      console.log(49, val)
      this.$emit("size", val)
    },
    currentChange(val) {
      this.$emit("current", val)
    },
  },
  props: {
    /**
     * 嵌套配置项
     */
    tp: {
      type: Object,
      // 需要加() 里面返回的是代码段 加括号直接返回的是一个对象
      default: () => ({ hasChildren: "hasChildren", children: "children" }),
    },

    /**
     * 列
     */
    cols: {
      required: true,
      type: Array,
      default: () => [],
    },
    /**
     * 数据
     */
    data: {
      required: true,
      type: Array,
      default: () => [],
    },
    
    /**
     * 总条数
     */
    total: Number,
    /**
     * rowKey
     */
    rowKey: {
      type: String,
      default: "id",
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  margin-top: 20px;
}
.table {
  margin-top: 20px;
}
</style>
