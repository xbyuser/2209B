<template>
  <!-- 自定义的导航 -->
  <view class="nav-gation">
    <view class="nav-top"></view>
    <view class="nav-height">
      <image src="/static/other/dingwei.png" mode="widthFix"></image>
      <text>{{addressData.data.address}}</text>
    </view>
  </view>
  <view>
    <map
    id="myMap"
    :show-location="true"
    :enable-building="true"
    :enable-poi="true"
    style="width: 100%; height: 100vh;"
    :latitude="addressData.data.lat"
    :longitude="addressData.data.lng"
    :markers="markers"
    :include-points="markers"
    @markertap="markerTap"
    ></map>
  </view>
  <!-- 底部 -->
  <view class="map-Details" v-for="(item,index) in mapDetail" :key="index">
    <text>{{item.title}}</text>
    <text>{{item.address}}</text>
    <text>{{item.category}}</text>
    <text>{{item.tel}}</text>
    <view class="submit-but">
      <button plain="true" @click="comeBack">返回</button>
      <button plain="true" @click="openMap(item.longitude,item.latitude,item.title)">到这去</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import {onMounted,ref,reactive} from 'vue'
import { onLoad } from "@dcloudio/uni-app";
import {nearbySearch} from '@/public/qq-Location'
import {MarkersData,Mapdetail} from '@/public/decl-type'

// 核酸监测点
let markers = ref<MarkersData[]>([])

// 取出胶囊按钮数据
let menu_top = ref<string>('')//胶囊按钮距离顶部的高度
let menu_height = ref<string>('')//胶囊按钮的高度
// 本地缓存的位置信心
let addressData = reactive({
  data:{address:'',lat:0,lng:0}
})
onLoad(async()=>{
  let MenuButton = uni.getStorageSync('MenuButton') as {top:number,height:number}
  menu_top.value = MenuButton.top + 'px'
  menu_height.value = MenuButton.height + 'px'
  let get_address = uni.getStorageSync('address') as {address:string;location:{lat:number;lng:number}}
  addressData.data.address = get_address.address
  addressData.data.lat = get_address.location.lat
  addressData.data.lng = get_address.location.lng
  const res = await nearbySearch(get_address.location.lat,get_address.location.lng)
  // console.log(res)
  // 取出数组第一项做底部展示
  mapDetail.value = [{
    title: res[0].title,
    address: res[0].address,
    category: res[0].category,
    tel: res[0].tel,
    longitude: res[0].location.lng,
    latitude: res[0].location.lat
  }]
  let Arr:MarkersData[] = []
  res.forEach((item,index)=>{
    Arr.push({
      id: index + 1,
      latitude: item.location.lat,
      longitude: item.location.lng,
      iconPath:'/static/other/add-hesuan.png',
      width:30,
      height:30,
      callout:{
        content:item.title,
        color:'#b3b3ff',
        fontSize:12,
        borderRadius:5,
        borderWidth:2,
        borderColor:'#b3b3ff',
        display:'ALWAYS',
        padding:3
      },
      otherData:[{
        title: item.title,
        address: item.address,
        category: item.category,
        tel: item.tel,
        longitude: item.location.lng,
        latitude: item.location.lat
      }]
    })
  })
  markers.value = Arr
  console.log(markers.value)
})

// 存储选中的下标
let iconIndex = ref(-1)
let mapDetail = ref<Mapdetail[]>([])
//点击地图标记点触发
function markerTap(event:any){
  const index = markers.value.findIndex(item=>item.id == event.detail.markerId)
  // 取出值赋值给打开地图app
  mapDetail.value = markers.value[index].otherData
  if(iconIndex.value == -1){//从未点击过
    iconIndex.value = index
    markers.value[index].width = 50
    markers.value[index].height = 50
  }else{
    if(iconIndex.value != index){//再次点击当前项
      markers.value[iconIndex.value].width = 30
      markers.value[iconIndex.value].height = 30
    }
    setTimeout(()=>{
      iconIndex.value = index
      markers.value[index].width = 50
      markers.value[index].height = 50
    },300)
  }
}
// 打开地图app
function openMap(longitude:number,latitude:number,title:string){
  let mapCtx:any = uni.createMapContext('myMap')
  mapCtx.openMapApp({
    longitude,
    latitude,
    destination:title,
    success:(res:any)=>{
      console.log(res)
    },
    fail:(err:any)=>{
      console.log(err)
    }
  })
}
// 返回上一页
function comeBack(){
  uni.navigateBack({delta: 1})
}
</script>

<style scoped>
.nav-gation{
  position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 99;
  background-color: #dae9fc;
}
.nav-top{
  height: v-bind('menu_top');
}
.nav-height image{
  width: 50rpx;
  height: 50rpx;
  display: block;
}
.nav-height{
  display: flex;
  align-items: center;
  height: v-bind('menu_height');
  line-height: v-bind('menu_height');
  padding-left: 20rpx;
  margin-bottom: 10rpx;
  font-weight: bold;
  font-size: 33rpx;
  width: 450rpx;
}
.nav-height text{
  padding-left: 10rpx;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
/* 底部 */
.map-Details{
  position: fixed;
  left: 10rpx;
  right: 10rpx;
  bottom: 68rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  padding: 20rpx;
}
.map-Details text{
  display: block;
  padding-bottom: 10rpx;
  font-size: 28rpx;
  color: #878b8c;
}
.map-Details text:nth-child(1){
  font-weight: bold;
  font-size: 32rpx;
  color: #333;
}
.submit-but button{
  border: none;
  width: 48%;
  font-size: 32rpx;
}
.submit-but{
  display: flex;
  align-items: center;
}
.submit-but button:nth-child(1){
  background-color: #e8f2fe;
  color: #3a75f3;
}
.submit-but button:nth-child(2){
  background-color: #2c76ef;
  color: #ffffff;
}
</style>