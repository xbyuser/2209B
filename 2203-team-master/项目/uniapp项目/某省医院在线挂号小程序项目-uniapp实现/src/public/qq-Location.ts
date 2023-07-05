/*
 * :Author: Andy
 * :Date: 2022-09-27 00:40:04
 * :LastEditTime: 2022-12-10 15:37:32
 * :Description:
 */
// 腾讯地图开发文档  https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview
// 引入腾讯地图插件使用
import QQMapWX from "@/public/qqmap-wx-jssdk.js";
var qqmapsdk: any;
// 实例化地图，加入申请的地图key
qqmapsdk = new QQMapWX({
  key: "BC2BZ-QLACR-YAPWB-WLTDE-TQX72-RTBFB",
});

// 定位
interface Pres {
  code: number;
  city: string;
  province: string;
  district?: string;
  msg: string;
  lat: number | string;
  lng: number | string;
}
//首页获取 省市区位置的
export function getLocation(): Promise<Pres> {
  return new Promise((resolve, reject) => {
    uni.startLocationUpdate({
      success: (res) => {
        console.log('位置权限', res);
        uni.onLocationChange(
          async (add: { latitude: number; longitude: number }) => {
            console.log('获取位置', add);
            uni.stopLocationUpdate(); //关闭监听实时位置变化，前后台都停止消息接收
            const address = await addRess(add.latitude, add.longitude);
            resolve(address);
          }
        );
      },
      fail: (err) => {
        resolve({
          code: 202,
          msg: "北京市 东城区 开启定位",
          city: "none",
          province: "none",
          lat: "none",
          lng: "none",
        });
      },
    });
  });
}

// 获取位置
interface Adddress {
  message: string;
  status: number;
  result: {
    address_component: { city: string; province: string; district: string };
    location: { lat: number; lng: number };
    address: string;
  };
}
function addRess(latitude: number, longitude: number): Promise<Pres> {
  return new Promise((resolve, reject) => {
    qqmapsdk.reverseGeocoder({
      location: { latitude, longitude },
      success: (res: Adddress) => {
        // 存储经纬度和地址到本地
        uni.setStorageSync("address", {
          address: res.result.address,
          location: res.result.location,
        });
        if (res.message == "query ok" && res.status == 0) {
          resolve({
            code: 200,
            msg: "success",
            city: res.result.address_component.city,
            province: res.result.address_component.province,
            district: res.result.address_component.district,
            lat: res.result.location.lat,
            lng: res.result.location.lng,
          });
        } else {
          throw {
            code: 202,
            msg: "定位失败,程序出现bug",
            city: "none",
            province: "none",
            lat: "none",
            lng: "none",
          };
        }
      },
      fail: (err: any) => {
        resolve({
          code: 202,
          msg: "定位失败,程序出现bug",
          city: "none",
          province: "none",
          lat: "none",
          lng: "none",
        });
      },
    });
  });
}

// 周边地点搜索
interface Resdata {
  address: string;
  category: string;
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  tel: string;
  title: string;
}
export function nearbySearch(
  latitude: number,
  longitude: number
): Promise<Resdata[]> {
  return new Promise((resolve, reject) => {
    qqmapsdk.search({
      keyword: "核酸采样",
      location: { latitude, longitude },
      success: (res: any) => {
        resolve(res.data);
      },
      fail: (err: any) => {
        reject(err);
      },
    });
  });
}
