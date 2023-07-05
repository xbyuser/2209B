"use strict";
const common_vendor = require("../../common/vendor.js");
const public_request = require("../../public/request.js");
const public_qqLocation = require("../../public/qq-Location.js");
require("../../public/qqmap-wx-jssdk.js");
if (!Math) {
  (skIndex + proMpt)();
}
const skIndex = () => "../../Skeleton/SK-index.js";
const proMpt = () => "./components/prompt.js";
const _sfc_defineComponent = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "0ef10704": common_vendor.unref(styleOpacity),
      "558633d9": common_vendor.unref(menu_top),
      "7742e023": common_vendor.unref(menu_height),
      "18a33496": common_vendor.unref(styleColor),
      "aa919174": common_vendor.unref(navHeight)
    }));
    let menu_top = common_vendor.ref("");
    let menu_height = common_vendor.ref("");
    let navHeight = common_vendor.ref("");
    common_vendor.onMounted(() => {
      let MenuButton = common_vendor.index.getStorageSync("MenuButton");
      menu_top.value = MenuButton.top + "px";
      menu_height.value = MenuButton.height + "px";
      navHeight.value = MenuButton.top + MenuButton.height + 10 + "px";
      pageData();
    });
    let vaccine = common_vendor.ref([]);
    let pyhdata = common_vendor.ref([]);
    let registered = common_vendor.ref([]);
    let selftest = common_vendor.ref([]);
    let skeLeton = common_vendor.ref(true);
    async function pageData() {
      const res = await public_request.RequestApi.FrontPage();
      await reLocate();
      vaccine.value = res.data.data[0].vaccine;
      pyhdata.value = res.data.data[1].reserve;
      registered.value = res.data.data[2].popular;
      selftest.value = res.data.data[3].self_test;
      skeLeton.value = false;
    }
    let styleOpacity = common_vendor.ref(0);
    let styleColor = common_vendor.ref("#fff");
    common_vendor.onPageScroll((event) => {
      styleOpacity.value = event.scrollTop >= 20 ? 1 : event.scrollTop / 300;
      styleColor.value = event.scrollTop >= 20 ? "#000000" : "#fff";
    });
    let cityData = common_vendor.ref("\u5B9A\u4F4D\u4E2D");
    let addressCode = common_vendor.ref(0);
    let weather = common_vendor.ref([]);
    let epidemicData = common_vendor.ref([]);
    let mtime = common_vendor.ref("");
    async function reLocate() {
      const resAddress = await public_qqLocation.getLocation();
      addressCode.value = resAddress.code;
      let lng = resAddress.lng == "none" ? "none" : JSON.stringify(resAddress.lng);
      let lat = resAddress.lat == "none" ? "none" : JSON.stringify(resAddress.lat);
      const weather_data = await public_request.RequestApi.WeaTher({ longitude: lng, latitude: lat });
      weather.value = weather_data.data.data;
      const epidemic = await public_request.RequestApi.EpidEmic({ cityName: resAddress.province });
      mtime.value = epidemic.data.data.mtime;
      epidemicData.value = epidemic.data.data.cityData;
      if (resAddress.code == 200) {
        cityData.value = resAddress.province + " " + resAddress.city + " " + resAddress.district;
      } else {
        cityData.value = resAddress.msg;
      }
    }
    let showcont = common_vendor.ref();
    function openTargeting() {
      showcont.value.showCont();
    }
    function vaccineApp(index) {
      switch (index) {
        case 0:
          common_vendor.index.navigateTo({ url: "/pages/xinguan-vaccine/xinguan-vaccine" });
          break;
        case 1:
          common_vendor.index.navigateTo({ url: "/pages/hpv-vaccine/hpv-vaccine" });
          break;
        case 2:
          common_vendor.index.navigateTo({ url: "/pages/nucleic-acid-map/index" });
          break;
        case 3:
          common_vendor.index.navigateTo({ url: "/pages/graphics/index" });
      }
    }
    function regMedex(index) {
      switch (index) {
        case 0:
          common_vendor.index.switchTab({ url: "/pages/registered/registered" });
          break;
        case 1:
          common_vendor.index.navigateTo({ url: "/pages/phy-exam/index" });
      }
    }
    function regRoute(dep_id) {
      common_vendor.index.navigateTo({
        url: "/pages/doctor/index?id=" + dep_id
      });
    }
    function jumpAssess(name, index, type) {
      if (type == "001") {
        common_vendor.index.navigateTo({
          url: "/pages/self-test/topic?type=001&name=" + name
        });
      } else {
        if (index == 0) {
          common_vendor.index.navigateTo({
            url: "/pages/self-test/topic?type=002&name=" + name
          });
        } else {
          common_vendor.index.navigateTo({
            url: "/pages/self-test/topic?type=003&name=" + name
          });
        }
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s(_ctx.__cssVars()),
        b: common_vendor.unref(weather).length > 0
      }, common_vendor.unref(weather).length > 0 ? {
        c: common_vendor.unref(weather)[0].address_icon,
        d: common_vendor.t(common_vendor.unref(cityData)),
        e: common_vendor.n(common_vendor.unref(addressCode) == 202 ? "" : "prohibit"),
        f: common_vendor.o(openTargeting),
        g: common_vendor.unref(weather)[0].tigan_icon,
        h: common_vendor.t(common_vendor.unref(weather)[0].realFeel),
        i: common_vendor.unref(weather)[0].ziwxian_icon,
        j: common_vendor.t(common_vendor.unref(weather)[0].uvi),
        k: common_vendor.t(common_vendor.unref(weather)[0].temp),
        l: common_vendor.unref(weather)[0].icon,
        m: common_vendor.t(common_vendor.unref(weather)[0].condition),
        n: common_vendor.t(common_vendor.unref(weather)[0].humidity),
        o: common_vendor.t(common_vendor.unref(weather)[0].windDir),
        p: common_vendor.t(common_vendor.unref(weather)[0].windLevel),
        q: common_vendor.t(common_vendor.unref(weather)[0].tips),
        r: common_vendor.s(_ctx.__cssVars())
      } : {}, {
        s: common_vendor.f(common_vendor.unref(vaccine), (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.title),
            c: index,
            d: common_vendor.o(($event) => vaccineApp(index), index)
          };
        }),
        t: common_vendor.s(_ctx.__cssVars()),
        v: common_vendor.f(common_vendor.unref(pyhdata), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.describe),
            c: item.image,
            d: index,
            e: common_vendor.o(($event) => regMedex(index), index)
          };
        }),
        w: common_vendor.s(_ctx.__cssVars()),
        x: common_vendor.t(common_vendor.unref(mtime)),
        y: common_vendor.s(_ctx.__cssVars()),
        z: common_vendor.f(common_vendor.unref(epidemicData), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.numOfpeople),
            c: item.color,
            d: index
          };
        }),
        A: common_vendor.s(_ctx.__cssVars()),
        B: common_vendor.o(($event) => regMedex(0)),
        C: common_vendor.s(_ctx.__cssVars()),
        D: common_vendor.f(common_vendor.unref(registered), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.image,
            c: index,
            d: common_vendor.s("background-color:" + item.background),
            e: common_vendor.o(($event) => regRoute(item.dep_id), index)
          };
        }),
        E: common_vendor.s(_ctx.__cssVars()),
        F: common_vendor.s(_ctx.__cssVars()),
        G: common_vendor.unref(selftest).length > 0
      }, common_vendor.unref(selftest).length > 0 ? {
        H: common_vendor.f([common_vendor.unref(selftest)[0]], (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.describe),
            c: common_vendor.t(item.number_of_people),
            d: common_vendor.t(item.question),
            e: common_vendor.t(item.minute),
            f: item.image,
            g: index,
            h: common_vendor.o(($event) => jumpAssess(item.name, index, "001"), index)
          };
        }),
        I: common_vendor.f(common_vendor.unref(selftest).slice(1), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.question),
            c: common_vendor.t(item.minute),
            d: common_vendor.t(item.number_of_people),
            e: item.image,
            f: index,
            g: common_vendor.o(($event) => jumpAssess(item.name, index, "002"), index)
          };
        }),
        J: common_vendor.s(_ctx.__cssVars())
      } : {}, {
        K: common_vendor.unref(skeLeton)
      }, common_vendor.unref(skeLeton) ? {
        L: common_vendor.s(_ctx.__cssVars())
      } : {}, {
        M: common_vendor.sr(showcont, "83a5a03c-1", {
          "k": "showcont"
        }),
        N: common_vendor.o(reLocate),
        O: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 1;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-83a5a03c"], ["__file", "D:/\u5317\u7F51-\u524D\u7AEF\u8D44\u6599/1708/JS\u7EC3\u4E60/uni-app\u6846\u67B6\u9879\u76EE/vue3+ts\u533B\u4F9D\u901A\u9879\u76EE\u5305uniapp\u7248/\u533B\u4F9D\u901A/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
