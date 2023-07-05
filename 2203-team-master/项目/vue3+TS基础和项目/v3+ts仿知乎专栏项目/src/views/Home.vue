<template>
  <div class="home">
    <el-row justify="center">
      <el-col :span="8" @click="$router.push('/addArticle')">
        <img class="nav-image" src="@/assets/image/callout.svg" alt="callout" />
        <p class="fllow-you">随心写作，自由表达</p>
        <el-button type="primary">开始写文章</el-button>
      </el-col>
    </el-row>
    <h3 class="”columns-title“" style="margin: 20px 0">发现精彩</h3>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="8" v-for="column in columns" :key="column._id">
          <el-card :body-style="{ padding: '20px' }">
            <!-- {{ column }} -->
            <img
              :src="column.avatar.url"
              class="image"
              style="width: 50px; height: 50px; border-radius: 50%"
            />
            <div style="padding: 14px">
              <h5 class="time">{{ column.title }}</h5>
              <p class="desc">{{ column.description }}</p>
              <div class="bottom">
                <router-link
                  :to="`/column?author=${column._id}`"
                  custom
                  v-slot="{ navigate }"
                >
                  <el-button type="primary" @click="navigate" plain
                    >进入专栏</el-button
                  >
                </router-link>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-button
      type="primary"
      v-if="canLoadMore"
      plain
      class="load-more"
      @click="getList('loadmore')"
      >加载更多</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getColumnList } from "../utils/api";
//这里defineComponent()方法，是为了适配vue里用ts的语法，有类型提示，最重要的是给予了组件正确的参数类型推断。可以去掉不影响
export default defineComponent({
  setup() {
    const columns = ref([]);
    const total = ref(1);
    const canLoadMore = ref(true);
    const params = {
      currentPage: 1,
      pageSize: 6,
    };
    const getList = (type?: string) => {
      if (type === "loadmore") {
        params.currentPage++;
      }
      getColumnList(params).then((res) => {
        // console.log(55, res.data.list);
        columns.value = columns.value.concat(res.data.list);
        // console.log(res)
        total.value = res.data.total;
        if (total.value <= columns.value.length) {
          canLoadMore.value = false;
        }
      });
    };
    getList();
    return {
      columns,
      canLoadMore,
      getList,
    };
  },
});
</script>
<style lang="scss" scoped>
.nav-image {
  width: 200px;
  height: auto;
}
.content image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.fllow-you {
  text-align: center;
  margin: 20px 0;
}
.desc {
  margin: 20px 0;
  font-size: 14px;
  text-align: left;
  text-indent: 2em;
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  line-height: 20px;
  min-height: 40px;
}
:deep(.load-more) {
  width: 200px;
}
</style>
