"use strict";
const common_vendor = require("../common/vendor.js");
const store_index = require("../store/index.js");
const public_request = require("../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "se-member",
  setup(__props, { expose }) {
    function onEnter() {
      console.log("\u8FDB\u5165\u4E2D\u89E6\u53D1");
    }
    let submitData = common_vendor.reactive({
      phy_name: "",
      phy_time: "",
      show: false,
      patient_id: ""
    });
    function trigGer(event) {
      submitData.phy_name = event.phy_name;
      submitData.phy_time = event.phy_time;
      submitData.show = event.show;
    }
    expose({ trigGer });
    function choosePatient() {
      common_vendor.index.navigateTo({
        url: "/pages/my-service/my-patient/my-patient"
      });
    }
    let name = common_vendor.ref("");
    const store = store_index.myData();
    store.$subscribe((mutayion, state) => {
      name.value = state.patient.name;
      submitData.patient_id = state.patient._id;
    });
    async function subMit() {
      common_vendor.index.showLoading({ title: "\u63D0\u4EA4\u4E2D", mask: true });
      const res = await public_request.RequestApi.ResPhy(submitData);
      if (res.statusCode == 200) {
        common_vendor.index.hideLoading();
        common_vendor.index.redirectTo({
          url: "/pages/my-service/phy-exam/index"
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(name)),
        b: common_vendor.t(common_vendor.unref(name) == "" ? "\u9009\u62E9\u5C31\u8BCA\u4EBA" : "\u91CD\u65B0\u9009\u62E9"),
        c: common_vendor.o(choosePatient),
        d: common_vendor.o(subMit),
        e: common_vendor.unref(submitData).show,
        f: common_vendor.o(onEnter),
        g: common_vendor.o(($event) => common_vendor.unref(submitData).show = false)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u5317\u7F51-\u524D\u7AEF\u8D44\u6599/1708/JS\u7EC3\u4E60/uni-app\u6846\u67B6\u9879\u76EE/vue3+ts\u533B\u4F9D\u901A\u9879\u76EE\u5305uniapp\u7248/\u533B\u4F9D\u901A/src/com-components/se-member.vue"]]);
wx.createComponent(Component);
