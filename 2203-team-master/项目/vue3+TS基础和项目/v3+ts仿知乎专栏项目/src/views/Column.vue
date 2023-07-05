<template>
  <div class="column">
    <div class="author-info">
      <img
        v-if="state.author.authorImg"
        :src="state.author.authorImg"
        alt="avator"
      />
      <img v-else src="@/assets/image/callout.svg" alt="" />
      <div>
        <h3>{{ state.author.nickname }}</h3>
        <p>{{ state.author.description }}</p>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="content" v-if="state.articles.length > 0">
      <div class="column-list">
        <el-card
          class="box-card"
          v-for="(article, i) in state.articles"
          :key="article.id"
        >
          <div class="article">
            <h3>{{ article.title }}</h3>
            <div class="article-desc">
              <img
                v-if="article.image"
                :src="article.image.url"
                alt="article-img"
              />
              <img v-else src="../assets/image/callout.svg" alt="article-img" />
              <p>{{ article.excerpt }}</p>
            </div>
            <div class="bottom-set">
              <span>{{ article.createdAt }}</span>
              <div v-if="token == $store.state.user.column">
                <el-button
                  @click="collect(i, article._id)"
                  :type="article.key === 1 ? 'info' : 'primary'"
                  v-show="article.key"
                  >{{ article.key === 1 ? "取消收藏" : "收藏" }}</el-button
                >
                <el-button type="danger" @click="delArcitle(article._id)"
                  >删除</el-button
                >
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <el-button
        type="primary"
        v-if="isLoadMore"
        plain
        class="load-more"
        @click="loadMore('more')"
        >加载更多</el-button
      >
    </div>
    <span v-else class="no-articles"
      >暂无文章，<router-link to="/addArticle">马上发布</router-link></span
    >
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { getSpecialList, userCollect, userDelCollect } from "../utils/api";
import { useRoute } from "vue-router";
import { ElMessageBox } from "element-plus";
interface StateConfig {
  author: any;
  articles: any;
}
const state = reactive<StateConfig>({
  author: {},
  articles: [],
});
const isLoadMore = ref(true);
let total = 1;
const token = useRoute().query.author;
console.log(token);

const params = {
  page: 1,
  pageSize: 5,
  author: token,
};
const getList = (type: string | undefined) => {
  if (state.articles.length === total && state.articles.length > 0) return;
  if (type === "more") {
    params.page++;
  }
  getSpecialList(params).then((res) => {
    // console.log(res);
    total = res.data.count;
    // state.author = res.data.content;
    state.articles = state.articles.concat(res.data.list);
    console.log(res);

    // console.log(0)
    if (state.articles.length >= total) {
      isLoadMore.value = false;
    }
  });
};
getList(undefined);
const loadMore = (type: string) => {
  getList(type);
};
const collect = (i: number, id: string) => {
  console.log(i, id);

  // userCollect(id).then((res) => {
  //   if (res.success) {
  //     state.articles[i].star = state.articles[i].star === 1 ? 2 : 1;
  //   }
  // });
};
const delArcitle = (id: string) => {
  // console.log(id);
  // code: 401
  // error: "没有权限完成这次操作"

  ElMessageBox.alert("确定要删除该文章吗？", "删除文章", {
    confirmButtonText: "OK",
    callback: () => {
      userDelCollect(id).then((res) => {
        if (res.msg === "请求成功") {
          state.articles = [];
          getList(undefined);
        }
      });
    },
  });
};
</script>
<style lang="scss" scoped>
.column {
  width: 600px;
  margin: 0 auto;
}
.author-info {
  display: flex;
  text-align: left;
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 30px;
  }
  h3 {
    margin: 20px 0;
  }
  p {
    margin: 0;
    width: 346px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
.article {
  text-align: left;
  h3 {
    margin-bottom: 20px;
  }
  .article-desc {
    display: flex;
    align-items: center;
    img {
      width: 150px;
      height: 100px;
      border-radius: 6px;
      margin-right: 20px;
    }
    p {
      line-height: 36px;
    }
    margin-bottom: 20px;
  }
}
:deep(.box-card) {
  margin-bottom: 20px;
}
:deep(.load-more) {
  width: 200px;
}
.bottom-set {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}
.no-articles {
  color: #ccc;
  position: relative;
  top: 200px;
}
</style>
