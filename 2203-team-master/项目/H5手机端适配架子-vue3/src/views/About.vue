<template>
  <!--头部 -->
  <div class="div">
    <div>
      <h1>{{ title.msg }}-{{ test }}</h1>
      <h3>
        共有任务
        <span>1</span> 个,其中 <span>{{ listLen.length }}</span> 个已经完成
      </h3>
      <ul ref="ul">
        <!--template可以嵌套多个,它不会渲染成元素，一般和指令中的 v-if/v-for 一起用 -->
        <h2>未完成的列表</h2>
        <template v-for="(item, index) in list" :key="item.id">
          <li>
            <div>
              <input
                type="checkbox"
                :checked="item.status"
                @change="selectALL(index)"
              />
              <label>
                <span>{{ item.name }}</span>
              </label>

              <div></div>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <button @click="go" ref="btn">跳转路由</button>
    <!-- 父传子演示 -->
    <children :message="list" @sonclick="sonclick"></children>
  </div>
</template>


<script >
import {
  ref,
  reactive,
  toRefs,
  computed,
  onMounted,
  watch,
  getCurrentInstance,
} from "vue";
// import router from '../router/index'  //方法1  导入路由表
import { useRouter, useRoute } from "vue-router"; //方法2 用路由方法
import { useStore } from "vuex";

import Children from "@/components/Children.vue";
export default {
  // components:{},
  //数据方法都定义到setup这里面-相当于之前created
  setup() {
    console.log('我是在beforeCreate之后,created之前执行');

    // vue3里面需要 把原来方法，变成函数表达示方式,最近返回
    // function go(){}   let go=()=>{}
    // 定义单个响应式数据
    const title = ref({
      msg: "这里演示vue3的基本用法",
    });
    //也可以定义其它类型
    // const str=ref('字符串')
    // const bol = ref(false)
    // const nul = ref(null)

    //定义多个响应式数据
    const state = reactive({
      list: [
        {
          id: 1,
          name: "吃饭",
          status: false,
          isShow: true,
        },
        {
          id: 2,
          name: "睡觉",
          status: true,
          isShow: true,
        },
        {
          id: 3,
          name: "打豆豆",
          status: false,
          isShow: true,
        },
      ],
      test: "练习",
    });
     
    //计算长度-computed不要忘记返回值,数组方法如果有花摇号，就必须得有return
    let listLen = computed(() => {
      return state.list.filter((item) => {
        return item.status == true;
      }); //如果有花摇号，就必须得有return
    });
    console.log(95, listLen);
    //点击改变选中状态
    let selectALL = (index) => {
      state.list[index].status = !state.list[index].status;
    };
    //路由跳转
    let router = useRouter();
    let go = () => {
      router.push({ path: "/test", query: { id: 1 } });
      // router.push({name:'Test',params:{id:2}})
    };
    // 子传父演示
    let sonclick = (value) => {
      console.log("子传父值为", value);
    };
    //vuex用法
    const store = useStore(); //vuex中store,跟vue2中调用一样

    //watch用法, 监听路由变化时触发
    const route = useRoute();
    watch(route, () => {
      console.log("路由走了");
    });

    //this用法——获取当前组件的上下文，下面两种方式都能获取到组件的上下文。
    // const { ctx }  = getCurrentInstance() //  方式一，这种方式只能在开发环境下使用，生产环境下的ctx将访问不到
    const { proxy } = getCurrentInstance(); //  方式二，此方法在开发环境以及生产环境下都能放到组件上下文对象（推荐）
    // proxy 中包含了组件中由ref和reactive创建的响应式数据对象,以及以下对象及方法;
    // proxy.$attrs proxy.$emit  proxy.$nextTick   proxy.$parent  proxy.$props  proxy.$refs 等
    console.log("上下文对象代替this的", proxy); //获取到了

    //注意生命周期勾子需要引入,执行顺序在setup方法后,setup方法相当之前的beforecreate,created之间
    onMounted(() => {
      console.log("mouted生命周期");
      console.log("获取dom节点", proxy.$refs);
    });

    //对所有表达式进行返回
    return {
      title,
      ...toRefs(state),
      listLen,
      selectALL,
      go,
      sonclick,
    };
  },
  components: {
    Children,
  },
};
</script>

<style lang="scss" scoped>
div {
  li {
    list-style: none;
  }
}
</style>
