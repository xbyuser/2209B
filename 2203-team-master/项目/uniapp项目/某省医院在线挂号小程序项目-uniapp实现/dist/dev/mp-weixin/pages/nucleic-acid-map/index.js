"use strict";
const common_vendor = require("../../common/vendor.js");
const public_qqLocation = require("../../public/qq-Location.js");
require("../../public/qqmap-wx-jssdk.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "26e6b1d7": common_vendor.unref(menu_top),
      "39ae8d36": common_vendor.unref(menu_height)
    }));
    let markers = common_vendor.ref([]);
    let menu_top = common_vendor.ref("");
    let menu_height = common_vendor.ref("");
    let addressData = common_vendor.reactive({
      data: { address: "", lat: 0, lng: 0 }
    });
    common_vendor.onLoad(async () => {
      let MenuButton = common_vendor.index.getStorageSync("MenuButton");
      menu_top.value = MenuButton.top + "px";
      menu_height.value = MenuButton.height + "px";
      let get_address = common_vendor.index.getStorageSync("address");
      addressData.data.address = get_address.address;
      addressData.data.lat = get_address.location.lat;
      addressData.data.lng = get_address.location.lng;
      const res = await public_qqLocation.nearbySearch(get_address.location.lat, get_address.location.lng);
      mapDetail.value = [{
        title: res[0].title,
        address: res[0].address,
        category: res[0].category,
        tel: res[0].tel,
        longitude: res[0].location.lng,
        latitude: res[0].location.lat
      }];
      let Arr = [];
      res.forEach((item, index) => {
        Arr.push({
          id: index + 1,
          latitude: item.location.lat,
          longitude: item.location.lng,
          iconPath: "/static/other/add-hesuan.png",
          width: 30,
          height: 30,
          callout: {
            content: item.title,
            color: "#b3b3ff",
            fontSize: 12,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: "#b3b3ff",
            display: "ALWAYS",
            padding: 3
          },
          otherData: [{
            title: item.title,
            address: item.address,
            category: item.category,
            tel: item.tel,
            longitude: item.location.lng,
            latitude: item.location.lat
          }]
        });
      });
      markers.value = Arr;
      console.log(markers.value);
    });
    let iconIndex = common_vendor.ref(-1);
    let mapDetail = common_vendor.ref([]);
    function markerTap(event) {
      const index = markers.value.findIndex((item) => item.id == event.detail.markerId);
      mapDetail.value = markers.value[index].otherData;
      if (iconIndex.value == -1) {
        iconIndex.value = index;
        markers.value[index].width = 50;
        markers.value[index].height = 50;
      } else {
        if (iconIndex.value != index) {
          markers.value[iconIndex.value].width = 30;
          markers.value[iconIndex.value].height = 30;
        }
        setTimeout(() => {
          iconIndex.value = index;
          markers.value[index].width = 50;
          markers.value[index].height = 50;
        }, 300);
      }
    }
    function openMap(longitude, latitude, title) {
      let mapCtx = common_vendor.index.createMapContext("myMap");
      mapCtx.openMapApp({
        longitude,
        latitude,
        destination: title,
        success: (res) => {
          console.log(res);
        },
        fail: (err) => {
          console.log(err);
        }
      });
    }
    function comeBack() {
      common_vendor.index.navigateBack({ delta: 1 });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(addressData).data.address),
        b: common_vendor.s(_ctx.__cssVars()),
        c: common_vendor.unref(addressData).data.lat,
        d: common_vendor.unref(addressData).data.lng,
        e: common_vendor.unref(markers),
        f: common_vendor.unref(markers),
        g: common_vendor.o(markerTap),
        h: common_vendor.s(_ctx.__cssVars()),
        i: common_vendor.f(common_vendor.unref(mapDetail), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.address),
            c: common_vendor.t(item.category),
            d: common_vendor.t(item.tel),
            e: common_vendor.o(comeBack, index),
            f: common_vendor.o(($event) => openMap(item.longitude, item.latitude, item.title), index),
            g: index
          };
        }),
        j: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f76a24e3"], ["__file", "D:/\u5317\u7F51-\u524D\u7AEF\u8D44\u6599/1708/JS\u7EC3\u4E60/uni-app\u6846\u67B6\u9879\u76EE/vue3+ts\u533B\u4F9D\u901A\u9879\u76EE\u5305uniapp\u7248/\u533B\u4F9D\u901A/src/pages/nucleic-acid-map/index.vue"]]);
wx.createPage(MiniProgramPage);
