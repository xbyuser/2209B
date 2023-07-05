<template>
  <div class="box colorfulShadow sushi">
    <!-- tab切换 -->
    <div class="box_top">
      <ul v-for="(item, index) in nav" :key="index">
        <li :class="{ ys: flag == index }" @click="tab(item, index)">
          {{ item }}
        </li>
      </ul>
    </div>

    <!-- 内容模块 -->
    <div class="box_list">
      <div class="" v-for="item in list" :key="item.id">
        <div v-if="flag == 0 ? list : txt == item.column_name" class="list_all">
          <div class="list_img">
            <img :src="item.cover" alt="" />
          </div>
          <div class="list_name">
            <h3>{{ item.title }}</h3>
            <p class="name">{{ item.summary }}</p>
            <!-- <p class="time">{{item.published_at|changeTime}} · <span>{{JSON.parse(item.user_info).name}}</span></p> -->
            <p class="time">
              {{ item.published_at | formatDate }} ·
              <span>{{ JSON.parse(item.user_info).name }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        "最新文章", "大公司", "消费","娱乐","前沿技术","汽车交通","区块链","技能Get",
      ],
      list: [],
      flag: 0,
      txt: "", //保存点击后的tab名称 然后判断显示哪个
    };
  },
  //接口 一进入页面就执行的
  mounted() {
    this.changeDate();
  },
  //事件方法
  methods: {
    tab(item, index) {
      console.log(item);
      this.flag = index;
      this.txt = item;
    },
    changeDate() {
      this.$axios.get("news.json").then((res) => {
        console.log(res);

        this.list = res.data.items.sort((a, b) => {
          //请求数据时,进行时间降序，按照时间戳
          return (
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
          );
        });
        console.log(this.list);
      });
    },
  },

  //过滤器
  filters: {
    formatDate: function (timeStamp) {
      var dateTime = new Date(timeStamp); //返回本地时间
      var old = dateTime.valueOf(); //返回自1970以来时间戳
      //   console.log(dateTime,old);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth() + 1;
      var day = dateTime.getDate();
      var hour = dateTime.getHours();
      var minute = dateTime.getMinutes();
      var second = dateTime.getSeconds();
      var now = new Date();
      var now_new = now.valueOf();
      var milliseconds = 0;
      var timeSpanStr;
      //通过时间差，换算成对应的几分钟，几小时等
      milliseconds = now_new - old;
      //小于60秒
      if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = "刚刚";
      }
      //在60秒与60分钟中间
       else if (
        1000 * 60 * 1 < milliseconds &&
        milliseconds <= 1000 * 60 * 60
      ) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60)) + "分钟前";
      } else if (
        1000 * 60 * 60 * 1 < milliseconds &&
        milliseconds <= 1000 * 60 * 60 * 24
      ) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + "小时前";
      } else if (
        1000 * 60 * 60 * 24 < milliseconds &&
        milliseconds <= 1000 * 60 * 60 * 24 * 5
      ) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + "天前";
      } else {
        timeSpanStr = `${year}-${month}-${day}`
      }

      return timeSpanStr;
    }
  },
};
</script>

<style lang='scss' scoped>
.box {
  width: 1000px;
  overflow: hidden;
  margin: 10px auto;
  .box_top {
    width: 100%;
    height: 50px;
    background-color: #eee;
    display: flex;
    justify-content: space-around;
    ul {
      width: 100%;
      line-height: 50px;
      li {
        text-align: center;
      }
    }
  }
  .box_list {
    width: 100%;
    height: 700px - 50px;
    // overflow: hidden; //超出部分隐藏
    overflow-y: scroll; //显示滑动条
    .list_all {
      width: 950px;
      height: 185px;
      margin-top: 11px;
      display: flex;
      border-bottom: #ccc solid 1px;
      .list_img {
        width: 250px;
        height: 170px;
        // border: black 1px solid;
        img {
          width: 250px;
          height: 170px;
        }
      }
      .list_name {
        width: 700px;
        height: 170px;
        padding-left: 20px;
        p {
          color: rgba(0, 0, 0, 0.562);
          font-size: 1px;
        }
        .time {
          margin-top: 70px;
        }
      }
    }
  }
}
.ys {
  background-color: burlywood;
}
.name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
h3 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sushi {
  // margin: 100px;
  // width: 150px;
  // height: 150px;
  // background-image: url("https://www.kirupa.com/icon/1f363.svg");
  background-color: rgb(226, 233, 233);
  background-repeat: no-repeat;
  background-size: contain;
}
.colorfulShadow {
  position: relative;
}

.colorfulShadow::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: inherit;
  background-position: center center;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5)) blur(20px);
  z-index: -1;
}
</style>
