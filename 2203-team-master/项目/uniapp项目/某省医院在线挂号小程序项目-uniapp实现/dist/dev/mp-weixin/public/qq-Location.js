"use strict";
const common_vendor = require("../common/vendor.js");
const public_qqmapWxJssdk = require("./qqmap-wx-jssdk.js");
var qqmapsdk;
qqmapsdk = new public_qqmapWxJssdk.QQMapWX({
  key: "BC2BZ-QLACR-YAPWB-WLTDE-TQX72-RTBFB"
});
function getLocation() {
  return new Promise((resolve, reject) => {
    common_vendor.index.startLocationUpdate({
      success: (res) => {
        console.log("\u4F4D\u7F6E\u6743\u9650", res);
        common_vendor.index.onLocationChange(
          async (add) => {
            console.log("\u83B7\u53D6\u4F4D\u7F6E", add);
            common_vendor.index.stopLocationUpdate();
            const address = await addRess(add.latitude, add.longitude);
            resolve(address);
          }
        );
      },
      fail: (err) => {
        resolve({
          code: 202,
          msg: "\u5317\u4EAC\u5E02 \u4E1C\u57CE\u533A \u5F00\u542F\u5B9A\u4F4D",
          city: "none",
          province: "none",
          lat: "none",
          lng: "none"
        });
      }
    });
  });
}
function addRess(latitude, longitude) {
  return new Promise((resolve, reject) => {
    qqmapsdk.reverseGeocoder({
      location: { latitude, longitude },
      success: (res) => {
        common_vendor.index.setStorageSync("address", {
          address: res.result.address,
          location: res.result.location
        });
        if (res.message == "query ok" && res.status == 0) {
          resolve({
            code: 200,
            msg: "success",
            city: res.result.address_component.city,
            province: res.result.address_component.province,
            district: res.result.address_component.district,
            lat: res.result.location.lat,
            lng: res.result.location.lng
          });
        } else {
          throw {
            code: 202,
            msg: "\u5B9A\u4F4D\u5931\u8D25,\u7A0B\u5E8F\u51FA\u73B0bug",
            city: "none",
            province: "none",
            lat: "none",
            lng: "none"
          };
        }
      },
      fail: (err) => {
        resolve({
          code: 202,
          msg: "\u5B9A\u4F4D\u5931\u8D25,\u7A0B\u5E8F\u51FA\u73B0bug",
          city: "none",
          province: "none",
          lat: "none",
          lng: "none"
        });
      }
    });
  });
}
function nearbySearch(latitude, longitude) {
  return new Promise((resolve, reject) => {
    qqmapsdk.search({
      keyword: "\u6838\u9178\u91C7\u6837",
      location: { latitude, longitude },
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
exports.getLocation = getLocation;
exports.nearbySearch = nearbySearch;
