<template lang="">
  <div>
   <h1>{{detail.goodsname}}</h1> 
   <img :src="detail.img" alt="">
   <div v-html="detail.description"></div>

  </div>
</template>
<script>
export default {
  name: "Detail",
  data() {
    return {
      detail: null,
    };
  },
  async created() {
    var id = this.$route.query.id;
    // console.log(id)
    var result = await this.$http({
      url: "/xuexiao/api/getgoodsinfo",
      params: {
        id,
      },
    });
    console.log(result)
    var detail = result.data.list[0];
    this.detail = detail;
  }
};
</script>
<style lang="css">

</style>