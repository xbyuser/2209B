<template>
  <div id="app">
    <!-- 头部组件内容 -->
    <VmHeader></VmHeader>
    <!-- 内容区 -->
    <div id="content">
      <!-- 左侧内容组件 -->
      <div class="left">
        <!-- 左1数据 -->
        <div class="vmpanel">
          <!-- 面板内容设置 -->
          <div class="panelcontent">
            <h2>新增确诊TOP10</h2>
            <!-- 面板高度-默认高度240px,每个外面调用时可单独设置。px转vw插件识别不到行内元素的px。所以就不会转vw.  style="width:480px;height:240px" -->
            <div class="chart left1">

            </div>
          </div>
        </div>

        <!-- 不同页面使用时,后续可提炼成组件 -->
        <!-- <VmPanel>
					<div slot='panelcontent'>
						<h2>新增确诊TOP10</h2>
						<div class="chart left2"></div>
					</div>
				</VmPanel> -->
      </div>
      <!-- 中间内容组件 -->
      <div class="center">
        <div class="center_top">aa</div>
        <!-- 中间世界地图 -->
        <VmCenterContainer></VmCenterContainer>
      </div>
      <!-- 右侧内容组件 -->
      <div class="right">
        <!-- 右1数据 -->
        <div class="vmpanel">
          <!-- 面板内容设置 -->
          <div class="panelcontent">
            <h2>世界TOP10</h2>
            <div class="chart right1">

            </div>
          </div>

        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
//在组件内引入这两个插件
import $ from "jquery";
import echarts from "echarts";

//头部组件
import VmHeader from "@/components/VmHeader.vue";
// import VmPanel from './common/VmPanel.vue'
//中间地图组件
import VmCenterContainer from "@/components/VmCenterContainer.vue";


export default {
  data() {
    return {};
  },
  methods: {
    leftOne(res) {
      let xArr = []
      let yArr = []
      res.countryAddConfirmRankList.forEach(item => {
        xArr.push(item.nation)
        yArr.push(item.addConfirm)

      })
      // console.log(161, xArr, yArr);

      //初始化echarts
      let left1 = document.querySelector('.left1')
      let mychart = echarts.init(left1)

      //配置图表
      let option = {
        // backgroundColor: '#00265f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '5%',
          right: '3%',
          left: '12%',
          bottom: '22%'
        },
        xAxis: [{
          type: 'category',
          data: xArr,
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.12)'
            }
          },
          axisLabel: {
            margin: 10,
            color: '#e2e9ff',
            textStyle: {
              fontSize: 14
            },
          },

        }],
        yAxis: [{
          axisLabel: {
            formatter: '{value}',
            color: '#e2e9ff',
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.12)'
            }
          }
        }],
        series: [{
          type: 'bar',
          data: yArr,
          barWidth: '10px',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0,244,255,1)' // 0% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(0,77,167,1)' // 100% 处的颜色
              }], false),
              barBorderRadius: [30, 30, 30, 30],
              shadowColor: 'rgba(0,160,221,1)',
              shadowBlur: 4,
            }
          },
          label: {

          }
        }]
      };
      //把图表加入到echarts里
      mychart.setOption(option)
      //让内部的echarts图表大小 跟着窗口改变
      // window.onresize = function () {
      //   mychart.resize()
      // }
      //原生事件绑定方法-对象覆盖不执行问题
      window.addEventListener('resize', function (e) {
        mychart.resize()
      }, false)
    },
    rightOne(res) {
      let xArr = []
      let yArr = []
      res.countryAddConfirmRankList.forEach(item => {
        xArr.push(item.nation)
        yArr.push(item.addConfirm)

      })
      // console.log(161, xArr, yArr);

      //初始化echarts
      let right1 = document.querySelector('.right1')
      let mychart = echarts.init(right1)

      //配置图表
      let option = {
        // backgroundColor: '#00265f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '5%',
          right: '3%',
          left: '12%',
          bottom: '22%'
        },
        xAxis: [{
          type: 'category',
          data: xArr,
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.12)'
            }
          },
          axisLabel: {
            margin: 10,
            color: '#e2e9ff',
            textStyle: {
              fontSize: 14
            },
          },

        }],
        yAxis: [{
          axisLabel: {
            formatter: '{value}',
            color: '#e2e9ff',
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.12)'
            }
          }
        }],
        series: [{
          type: 'bar',
          data: yArr,
          barWidth: '10px',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0,244,255,1)' // 0% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(0,77,167,1)' // 100% 处的颜色
              }], false),
              barBorderRadius: [30, 30, 30, 30],
              shadowColor: 'rgba(0,160,221,1)',
              shadowBlur: 4,
            }
          },
          label: {

          }
        }]
      };
      //把图表加入到echarts里
      mychart.setOption(option)
      //让内部的echarts图表大小 跟着窗口改变
      window.addEventListener('resize', function (e) {
        mychart.resize()
      }, false)
    },
  },
  components: {
    VmHeader,
    // VmPanel,
    VmCenterContainer,
  },
  created() {
  },
  mounted() {
    //用ajax请求数据
    let p = new Promise((resolve, reject) => {
      $.ajax({
        url: 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_foreign',
        dataType: 'jsonp', //jsonp解决跨域，缺点只能解决get请求的，而且是后端返回的是回调函数的数据callback({数据})
        success: (res) => {
          // console.log('请求成功的数据', res.data);  
          let data = JSON.parse(res.data); //注意后端数据返的是字符串的，需要转成对象
          // console.log(151, data.countryAddConfirmRankList);
          resolve(data)
        }
      })

    })

    p.then(res => {
      //左1
      //提炼成一个方法
      this.leftOne(res)

      //接收接口数据
      // let xArr = []
      // let yArr = []
      // res.countryAddConfirmRankList.forEach(item => {
      //   xArr.push(item.nation)
      //   yArr.push(item.addConfirm)

      // })
      // console.log(161, xArr, yArr);

      // //初始化echarts
      // let left1 = document.querySelector('.left1')
      // let mychart = echarts.init(left1)

      // //配置图表
      // let option = {
      //   // backgroundColor: '#00265f',
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       type: 'shadow'
      //     }
      //   },
      //   grid: {
      //     top: '5%',
      //     right: '3%',
      //     left: '12%',
      //     bottom: '22%'
      //   },
      //   xAxis: [{
      //     type: 'category',
      //     data: xArr,
      //     axisLine: {
      //       lineStyle: {
      //         color: 'rgba(255,255,255,0.12)'
      //       }
      //     },
      //     axisLabel: {
      //       margin: 10,
      //       color: '#e2e9ff',
      //       textStyle: {
      //         fontSize: 14
      //       },
      //     },

      //   }],
      //   yAxis: [{
      //     axisLabel: {
      //       formatter: '{value}',
      //       color: '#e2e9ff',
      //     },
      //     axisLine: {
      //       show: false
      //     },
      //     splitLine: {
      //       lineStyle: {
      //         color: 'rgba(255,255,255,0.12)'
      //       }
      //     }
      //   }],
      //   series: [{
      //     type: 'bar',
      //     data: yArr,
      //     barWidth: '10px',
      //     itemStyle: {
      //       normal: {
      //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //           offset: 0,
      //           color: 'rgba(0,244,255,1)' // 0% 处的颜色
      //         }, {
      //           offset: 1,
      //           color: 'rgba(0,77,167,1)' // 100% 处的颜色
      //         }], false),
      //         barBorderRadius: [30, 30, 30, 30],
      //         shadowColor: 'rgba(0,160,221,1)',
      //         shadowBlur: 4,
      //       }
      //     },
      //     label: {

      //     }
      //   }]
      // };

      //把图表加入到echarts里
      // mychart.setOption(option)
      // //让内部的echarts图表大小 跟着窗口改变
      // window.onresize = function () {
      //   mychart.resize()
      // }

      //右一
      this.rightOne(res)

    })


  },
};
</script>

<style lang="scss">
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  overflow-y: scroll;
}

body {
  overflow: hidden;
  // font-size: 20px;
}

li {
  list-style: none;
}

/* 内容区样式 */
#app {
  height: 100vh;
  /* width: calc(100vw - 17px); 表示整个浏览器窗口高度减去10px的大小 */
  /* 别名访问方式，需在vue.config.js配置别名 */
  /* background: url(assets/image/bg.jpg) top center;  */
  /* 静态访问方式 */
  background: url("./assets/image/bg.jpg") top center;
}

//  内容区
#content {
  display: flex;

  //  左边
  .left {
    flex: 3;
    height: 310px;
    // background-color: red;
  }


  //每个图表的背景，内容宽高
  .vmpanel {
    border: 1px solid rgba(25, 186, 139, 0.17);
    background: url("./assets/image/line(1).png");
    display: flex;
    justify-content: center;
    align-items: center;

    .panelcontent h2 {
      height: 48px;
      line-height: 48px;
      color: white;
      font-size: 20px;
      text-align: center;
      font-weight: 400;
    }

    .panelcontent .chart {
      width: 480px;
      height: 260px;
    }
  }

  //  中间区域
  .center {
    flex: 5;
    // background-color: yellow;

    .center_top {
      height: 160px;
      background-color: #fff;
    }
  }

  // 右边区域
  .right {
    flex: 3;
    // background-color: red;

  }


}
</style>
