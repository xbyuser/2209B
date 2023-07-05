"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "SK-index",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "3dac9f53": common_vendor.unref(menu_height),
      "649842a9": common_vendor.unref(menu_top)
    }));
    let menu_top = common_vendor.ref("");
    let menu_height = common_vendor.ref("");
    let MenuButton = common_vendor.index.getStorageSync("MenuButton");
    menu_top.value = MenuButton.top + "px";
    menu_height.value = MenuButton.height + "px";
    let YIMIAO = common_vendor.ref(["", "", "", ""]);
    let GUAHAO = common_vendor.ref(["", "", "", "", "", "", "", "", ""]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(YIMIAO), (item, k0, i0) => {
          return {
            a: item
          };
        }),
        b: common_vendor.f(common_vendor.unref(YIMIAO).slice(0, 2), (item, k0, i0) => {
          return {
            a: item
          };
        }),
        c: common_vendor.f(common_vendor.unref(GUAHAO), (item, k0, i0) => {
          return {
            a: item
          };
        }),
        d: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f1c91273"], ["__file", "D:/\u5317\u7F51-\u524D\u7AEF\u8D44\u6599/1708/JS\u7EC3\u4E60/uni-app\u6846\u67B6\u9879\u76EE/vue3+ts\u533B\u4F9D\u901A\u9879\u76EE\u5305uniapp\u7248/\u533B\u4F9D\u901A/src/Skeleton/SK-index.vue"]]);
wx.createComponent(Component);
