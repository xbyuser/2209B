<template lang="">
  <div>
    <h1>List页面</h1> 
    <div class="item" v-for="item in list" :key="item.id" @click="toDetail(item.id)">
      <img :src="item.img" alt="">
      <div>{{item.goodsname}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "List",
  mounted() { },
  data() {
    return {
      list: [],
      page: 1,
      tag: true, //定义开关
    };
  },
  methods: {
    //跳转详情页
    toDetail(id) {
      // console.log(id)
      this.$router.push({ path: "/detail", query: { id } });
    },
    //触底加载更多
    async scrollFn() {
      let clientHeight = document.documentElement.clientHeight;
      let scrollTop = document.documentElement.scrollTop;
      let docHeight = document.documentElement.scrollHeight;
      //触底了，请求下一页数据
      if (clientHeight + scrollTop == docHeight) {
        //判断是否最后一页了
        if (!this.tag) return;

        this.page += 1;
        var result = await this.$http({
          url: "/xuexiao/api/getgoodlist",
          params: {
            cateid: 3,
            page: this.page,
            size: 5,
            type: 1,
          },
        });

        var list = result.data.list.goodData || [];
        if (list.length < 5) {
          this.tag = false; //开关
        }
        //跟上次数据合并下
        this.list = this.list.concat(list);
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollFn);
  },
  async created() {
    //接口地址(有跨域)- http://api.aslegou.top/api/getgoodlist?cateid=2&page=1&size=10&type=1
    //1.发送网路请求
    var result = await this.$http({
      url: "/xuexiao/api/getgoodlist",
      params: {
        cateid: 3,
        page: this.page,
        size: 5,
        type: 1,
      },
    });

    //2.列表渲染
    var list = result.data.list.goodData;
    this.list = list;

    //3.触底加载更多
  },
};
</script>
<style lang="css">
.item {
  width: 300px;
  height: 140px;
  margin-top: 20px;
  border: 1px solid #000;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item img {
  max-width: 200px;
  max-height: 100px;
}
</style>