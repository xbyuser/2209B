"use strict";
const common_vendor = require("../../common/vendor.js");
const public_misc = require("../../public/misc.js");
const public_request = require("../../public/request.js");
const store_index = require("../../store/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    async function upload() {
      const res = await public_misc.uploadImage(public_request.IMAGEURL, "\u4E0A\u4F20\u4E2D", "\u4E0A\u4F20\u5931\u8D25");
      submitData.ins_report.push(JSON.parse(res.data).data);
    }
    function checkboxChange(event) {
      submitData.guide = event.detail.value.length === 0 ? false : true;
    }
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
    let submitData = common_vendor.reactive({
      illness: "",
      guide: false,
      ins_report: [],
      patient_id: ""
    });
    function canCel() {
      common_vendor.index.navigateBack({ delta: 1 });
    }
    async function subMit() {
      common_vendor.index.showLoading({ title: "\u63D0\u4EA4\u4E2D", mask: true });
      const res = await public_request.RequestApi.GrapHics(submitData);
      if (res.statusCode == 200) {
        common_vendor.index.showToast({ title: "\u63D0\u4EA4\u6210\u529F", icon: "none", duration: 1e3 });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(submitData).illness,
        b: common_vendor.o(($event) => common_vendor.unref(submitData).illness = $event.detail.value),
        c: common_vendor.unref(submitData).guide,
        d: common_vendor.o(checkboxChange),
        e: common_vendor.f(common_vendor.unref(submitData).ins_report, (item, index, i0) => {
          return {
            a: item,
            b: common_vendor.o(($event) => common_vendor.unref(submitData).ins_report.splice(index, 1), index),
            c: index
          };
        }),
        f: common_vendor.o(upload),
        g: common_vendor.t(common_vendor.unref(name)),
        h: common_vendor.t(common_vendor.unref(name) == "" ? "\u9009\u62E9\u5C31\u8BCA\u4EBA" : "\u91CD\u65B0\u9009\u62E9"),
        i: common_vendor.o(choosePatient),
        j: common_vendor.o(canCel),
        k: common_vendor.o(subMit)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u5317\u7F51-\u524D\u7AEF\u8D44\u6599/1708/JS\u7EC3\u4E60/uni-app\u6846\u67B6\u9879\u76EE/vue3+ts\u533B\u4F9D\u901A\u9879\u76EE\u5305uniapp\u7248/\u533B\u4F9D\u901A/src/pages/graphics/index.vue"]]);
wx.createPage(MiniProgramPage);
