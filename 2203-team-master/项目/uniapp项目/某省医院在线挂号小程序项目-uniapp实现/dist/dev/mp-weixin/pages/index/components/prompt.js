"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "prompt",
  emits: ["parentFunc"],
  setup(__props, { expose, emit }) {
    let show = common_vendor.ref(false);
    function onEnter() {
      console.log("\u8FDB\u5165\u4E2D\u89E6\u53D1");
    }
    function showCont() {
      show.value = true;
    }
    expose({ showCont });
    function openSetting() {
      show.value = false;
      common_vendor.index.openSetting({
        success: (res) => {
          if (res.authSetting["scope.userLocation"]) {
            console.log("00000");
            emit("parentFunc");
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(openSetting),
        b: common_vendor.o(($event) => common_vendor.isRef(show) ? show.value = false : show = false),
        c: common_vendor.unref(show),
        d: common_vendor.o(onEnter)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1f32ece3"], ["__file", "D:/\u5317\u7F51-\u524D\u7AEF\u8D44\u6599/1708/JS\u7EC3\u4E60/uni-app\u6846\u67B6\u9879\u76EE/vue3+ts\u533B\u4F9D\u901A\u9879\u76EE\u5305uniapp\u7248/\u533B\u4F9D\u901A/src/pages/index/components/prompt.vue"]]);
wx.createComponent(Component);
