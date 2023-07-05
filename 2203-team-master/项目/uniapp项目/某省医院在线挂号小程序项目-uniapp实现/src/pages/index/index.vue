<template>
<!-- 自定义的导航 -->
  <view class="nav-gation">
    <view class="nav-top"></view>
    <view class="nav-height">云南省第一人民医院</view>
  </view>
  <view class="yuyue" v-if="weather.length > 0">
    <image mode="aspectFill" src="https://diancan-1252107261.cos.ap-chengdu.myqcloud.com/tianqi/tianqi-top.png"></image>
    <view class="weather">
      <view :class="addressCode == 202 ? '' : 'prohibit'" @click="openTargeting">
        <image :src="weather[0].address_icon"></image>
        <text>{{cityData}}</text>
      </view>
      <view>
        <image :src="weather[0].tigan_icon"></image>
        <text>体感温度 {{weather[0].realFeel}}°</text>
      </view>
      <view>
        <image :src="weather[0].ziwxian_icon"></image>
        <text>紫外线强度 {{weather[0].uvi}}W/m</text>
      </view>
    </view>
    <view class="tempture">
      <view class="tempture-num">
        <text>{{weather[0].temp}}°</text>
        <image :src="weather[0].icon" mode="widthFix"></image>
        <text>{{weather[0].condition}}</text>
      </view>
      <view class="tempture-wind tempture-tips">
        <text>湿度 {{weather[0].humidity}}%</text>
        <text>|</text>
        <text>{{weather[0].windDir}} {{weather[0].windLevel}}级</text>
      </view>
      <view class="tempture-tips">{{weather[0].tips}}</view>
    </view>
  </view>
<!-- 疫苗预约 -->
  <view class="gongge">
   <view v-for="(item, index) in vaccine" :key="index" @click="vaccineApp(index)">
    <image :src="item.image" mode="aspectFit"></image>
    <text>{{item.title}}</text>
   </view>
  </view>
<!-- 挂号和体检 -->
  <view class="re-me-ex">
    <view class="re-me-ex-view" v-for="(item, index) in pyhdata" :key="index" @click="regMedex(index)">
      <text class="re-me-ex-title">{{item.title}}</text>
      <text class="re-me-ex-lable">{{item.describe}}</text>
      <image mode="widthFix" :src="item.image"></image>
    </view>
  </view>
<!-- 疫情数据 -->
  <view class="online-title">
    <view>疫情数据</view>
    <view class="epidemic-time"><text>截止{{mtime}}</text></view>
  </view>
  <view class="epidemic-view sele-test-back">
    <view v-for="(item,index) in epidemicData" :key="index">
      <text>{{item.title}}</text>
      <text class="num-of-people" :style="{color:item.color}">{{item.numOfpeople}}</text>
    </view>
  </view>
<!-- 热门挂号 -->
  <view class="online-title">
    <view>热门挂号</view>
    <view class="online-More">
      <text @click="regMedex(0)">查看更多</text>
      <image src="/static/other/gengduo.svg"></image>
    </view>
  </view>
  <view class="online-reg">
    <view v-for="(item, index) in registered" :key="index" :style=" 'background-color:' + item.background "
    @click="regRoute(item.dep_id)"
    >
      <text>{{item.title}}</text>
      <image mode="aspectFit" :src="item.image"></image>
    </view>
  </view>
<!-- 健康自测 -->
  <view class="online-title">
    <view>健康自测</view>
  </view>
  <view class="self-test" v-if="selftest.length > 0">
    <view class="sele-test-top sele-test-flex sele-test-one sele-test-back"
    v-for="(item, index) in [selftest[0]]" :key="index"
    @click="jumpAssess(item.name, index, '001')"
    >
      <view class="sele-test-view">
        <text class="top-title">{{item.name}}</text>
        <text class="top-lable">{{item.describe}}</text>
        <view class="top-people">
          <text class="top-num">{{item.number_of_people}}</text>
          <text class="top-min top-lable">人测过 / {{item.question}}题 / {{item.minute}}分钟</text>
        </view>
      </view>
      <image class="top-img" mode="widthFix" :src="item.image"></image>
    </view>
    <view class="sele-test-top sele-test-flex sele-test-back"
    v-for="(item, index) in selftest.slice(1)" :key="index"
    @click="jumpAssess(item.name, index, '002')"
    >
      <view class="sele-test-view">
        <text class="top-title">{{item.name}}</text>
        <text class="top-lable top-min">{{item.question}}题 / {{item.minute}}分钟</text>
        <view class="top-people">
          <text class="top-num">{{item.number_of_people}}</text>
          <text class="top-min top-lable">人测过</text>
        </view>
      </view>
      <image class="top-img bottom-img" mode="widthFix" :src="item.image"></image>
    </view>
  </view>
<!-- 骨架屏 -->
  <skIndex v-if="skeLeton"></skIndex>
  <!-- 打开位置弹窗 -->
  <proMpt @parentFunc="reLocate" ref="showcont"></proMpt>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {RequestApi} from '@/public/request'
import {Vaccine,Phydata,Registered,Selftest,Weather,Epindemicdata} from '@/public/decl-type'
import { onPageScroll } from "@dcloudio/uni-app";
// 骨架屏
import skIndex from '@/Skeleton/SK-index.vue'
// 打开位置弹窗
import proMpt from './components/prompt.vue'
// 位置
import {getLocation} from '@/public/qq-Location'

// 取出胶囊按钮数据
let menu_top = ref<string>('')//胶囊按钮距离顶部的高度
let menu_height = ref<string>('')//胶囊按钮的高度
let navHeight = ref('')
onMounted(()=>{
  let MenuButton = uni.getStorageSync('MenuButton') as {top:number,height:number}
  // console.log(MenuButton)
  menu_top.value = MenuButton.top + 'px'
  menu_height.value = MenuButton.height + 'px'
  navHeight.value = MenuButton.top + MenuButton.height + 10 + 'px'
  pageData()
})


// 首页第一项数据：疫苗预约
let vaccine = ref<Vaccine[]>([])
// 首页第二项数据：疫苗预约
let pyhdata = ref<Phydata[]>([])
// 首页第三项数据：热门挂号
let registered = ref<Registered[]>([])
// 首页第四项数据：健康自测
let selftest = ref<Selftest[]>([])

let skeLeton = ref(true)//骨架屏
async function pageData(){
  const res:any = await RequestApi.FrontPage()
  // 获取位置
  await reLocate()
  vaccine.value = res.data.data[0].vaccine
  pyhdata.value = res.data.data[1].reserve
  registered.value = res.data.data[2].popular
  selftest.value = res.data.data[3].self_test
  skeLeton.value = false
  
}
// 导航栏透明度和文字颜色
let styleOpacity = ref(0)
let styleColor = ref('#fff')
// 滚动监听
onPageScroll((event:{scrollTop:number})=>{
  // console.log(event)
  styleOpacity.value = event.scrollTop >= 20 ? 1 : event.scrollTop / 300
  styleColor.value = event.scrollTop >= 20 ? '#000000' : '#fff'
})

// 定位城市
let cityData = ref<string | null>('定位中')
// 定位状态码
let addressCode = ref(0)
// 天气
let weather = ref<Weather[]>([])
// 疫情数据
let epidemicData = ref<Epindemicdata[]>([])
let mtime = ref('')//统计截止日期
// 被子组件调用，定位-获取天气和疫情数据
async function reLocate(){
  // 获取位置
  const resAddress = await getLocation()
  // console.log(resAddress)
  addressCode.value = resAddress.code
  // 获取天气
  let lng = resAddress.lng == 'none' ? 'none' : JSON.stringify(resAddress.lng)
  let lat = resAddress.lat == 'none' ? 'none' : JSON.stringify(resAddress.lat)
  const weather_data = await RequestApi.WeaTher({longitude:lng,latitude:lat}) as {data:{data:Weather[]}}
  // console.log(weather_data)
  weather.value = weather_data.data.data
  // 获取疫情
  const epidemic = await RequestApi.EpidEmic({cityName:resAddress.province}) as {data:{data:{mtime:string,cityData:Epindemicdata[]}}}
  // console.log(epidemic)
  mtime.value = epidemic.data.data.mtime
  epidemicData.value = epidemic.data.data.cityData
  if(resAddress.code == 200){
    cityData.value = resAddress.province + ' ' + resAddress.city + ' ' + resAddress.district
  }else{
    cityData.value = resAddress.msg
  }
}
// 调用父组件，打开定位弹窗
let showcont = ref()
function openTargeting(){
  showcont.value.showCont()
}
// 表单提交
function vaccineApp(index:number){
  switch(index){
    case 0:
      uni.navigateTo({url:"/pages/xinguan-vaccine/xinguan-vaccine"})
      break;
    case 1:
      uni.navigateTo({url:"/pages/hpv-vaccine/hpv-vaccine"})
      break;
    case 2:
      uni.navigateTo({url:"/pages/nucleic-acid-map/index"})
      break;
    case 3:
      uni.navigateTo({url:"/pages/graphics/index"})
  }
}
// 挂号和体检
function regMedex(index:number){
  switch(index){
    case 0:
      uni.switchTab({url:'/pages/registered/registered'})
      break;
    case 1:
      uni.navigateTo({url:"/pages/phy-exam/index"})
  }
}

// 挂号
function regRoute(dep_id:string){
  uni.navigateTo({
    url:"/pages/doctor/index?id=" + dep_id
  })
}

// 健康自测路由跳转
function jumpAssess(name:string,index:number,type:string){
  if(type == '001'){
    uni.navigateTo({
      url:"/pages/self-test/topic?type=001&name=" + name
    })
  }else{
    if(index == 0){
      uni.navigateTo({
      url:"/pages/self-test/topic?type=002&name=" + name
    })
    }else{
      uni.navigateTo({
      url:"/pages/self-test/topic?type=003&name=" + name
    })
    }
  }
}

</script>

<style scoped>
.nav-gation{
  position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 99;
  background-color: rgba(255, 255, 255, v-bind('styleOpacity'));
}
.nav-top{
  height: v-bind('menu_top');
}
.nav-height{
  height: v-bind('menu_height');
  line-height: v-bind('menu_height');
  padding-left: 20rpx;
  margin-bottom: 10rpx;
  color: v-bind('styleColor');
  font-weight: bold;
  font-size: 35rpx;
}
/* 温度 */
.yuyue{
  height: 700rpx;
  position: relative;
  color: #ffffff;
}
.yuyue image{
  width: 100%;
  display: block;
  height: 700rpx;
}
.weather{
  position: absolute;
  left: 0;
  top: v-bind('navHeight');
}
.weather image{
  width: 35rpx;
  height: 35rpx;
  display: block;
  margin-right: 10rpx;
}
.weather view{
  font-size: 30rpx;
  display: flex;
  align-items: center;
  padding: 10rpx 20rpx;
}
.weather view:nth-child(1){
  font-size: 35rpx !important;
  font-weight: bold;
}
.tempture{
  position: absolute;
  left: 50%;
  top:75%;
  transform:translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.tempture-num{
  display: flex;
  align-items: flex-end;
}
.tempture-num image{
  width: 60rpx;
  height: 60rpx;
  display: block;
  margin: 0 20rpx;
}
.tempture-num text:nth-child(1){
  font-size: 100rpx;
  height: 100rpx;
  line-height: 100rpx;
}
.tempture-num text:nth-child(3){
  font-size: 35rpx;
}
.tempture-wind{
  padding: 30rpx 0;
}
.tempture-wind text:nth-child(2){
  padding: 0 20rpx;
}
.tempture-tips{
  font-size: 30rpx;
  text-align: center;
}
.gongge{
  display: flex;
  justify-content: space-between;
	margin: 40rpx 30rpx;
}
.gongge image{
  width: 50rpx;
  height: 50rpx;
  display: block;
  padding-bottom: 20rpx;
}
.gongge view{
  /* width: calc(20% - 10rpx*2); */
	/* margin: 10rpx; */
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 28rpx;
}
.re-me-ex{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10rpx;
}
.re-me-ex-view{
  position: relative;
  height: 200rpx;
  width: 48%;
}
.re-me-ex-view image{
  width: 150rpx;
  display: block;
  position: absolute;
  bottom: 0;
  right: 20rpx;
}
.re-me-ex view:nth-child(1) text:nth-child(1){
  color: #0042ff;
}
.re-me-ex view:nth-child(2) text:nth-child(1){
  color: #dc6200;
}
.re-me-ex view:nth-child(1){
  background-image: linear-gradient(to right, #d7dfff 10%, #5a9fff 100%);
  border-radius: 20rpx;
}
.re-me-ex view:nth-child(2){
  background-image: linear-gradient(to right, #ffdbb4 10%, #ffc56b 100%);
  border-radius: 20rpx;
}
.re-me-ex-title{
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  font-size: 40rpx;
}
.re-me-ex-lable{
  font-size: 30rpx;
  color: #ffffff;
  position: absolute;
  top: 90rpx;
  left: 20rpx;
}
/* 疫情数据 */
.epidemic-time{
  font-size: 25rpx;
  color: #a6abb0;
}
.epidemic-view{
  margin: 10rpx;
  border-radius: 20rpx;
  display: flex;
  flex-wrap: wrap;
  font-size: 28rpx;
}
.epidemic-view view{
  width: calc(33% - 30rpx*2);
  margin: 10rpx;
  padding: 20rpx;
  text-align: center;
}
.num-of-people{
  font-weight: bold;
  font-size: 35rpx;
}
/* 在线挂号 */
.online-title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40rpx 10rpx 10rpx 10rpx;
  font-weight: bold;
}
.online-title view:nth-child(1){
  font-size: 35rpx;
}
.online-More{
  display: flex;
  align-items: center;
}
.online-More image{
  width: 40rpx;
  height: 40rpx;
  display: block;
  margin-left: 10rpx;
}
.online-reg{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
	margin: 10rpx 0;
}
.online-reg image{
  width: 50rpx;
  height: 70rpx;
}

.online-reg view{
  width: calc(33% - 30rpx*2);
	margin: 10rpx;
  padding: 20rpx;
  display: flex;
  align-items: center;
  font-size: 28rpx;
  justify-content: space-between;
  border-radius: 10rpx;
}
/* 健康自测 */
.self-test{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.sele-test-top{
  display: flex;
  justify-content: space-between;
}
.sele-test-flex{
  width: calc(50% - 10rpx*2);
  margin: 10rpx;
  border-radius: 20rpx;
  overflow: hidden;
  position: relative;
  height: 250rpx;
}
.sele-test-one{
  width: 100%;
}
.sele-test-back{
  background-color: #ffffff;
  box-shadow: #f7f7f7 0px 0px 20rpx 10rpx;
}
.top-lable{
  color: #a6abb0;
}
.top-img{
  width:250rpx;
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
}
.bottom-img{
  width: 170rpx !important;
}
.self-test text{
  display: block;
}
.sele-test-view{
  position: absolute;
  left: 20rpx;
  top: 35rpx;
}
.top-people{
  display: flex;
  align-items: baseline;
  padding-top: 30rpx;
}
.top-title{
  padding-bottom: 10rpx;
  font-size: 35rpx;
}
.top-num{
  font-size: 35rpx;
  padding-right: 10rpx;
}
.top-min{
  font-size: 25rpx;
}
.prohibit{
  pointer-events: none;
}
</style>
