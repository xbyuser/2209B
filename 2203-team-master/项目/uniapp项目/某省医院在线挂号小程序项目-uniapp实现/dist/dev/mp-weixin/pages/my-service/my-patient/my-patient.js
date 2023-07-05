"use strict";
const common_vendor = require("../../../common/vendor.js");
const public_request = require("../../../public/request.js");
const store_index = require("../../../store/index.js");
if (!Math) {
  ponit();
}
const ponit = () => "../../../com-components/point.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my-patient",
  setup(__props) {
    let show = common_vendor.ref(false);
    let title = common_vendor.ref("\u4F60\u8FD8\u6CA1\u6709\u5C31\u8BCA\u4EBA");
    let patient = common_vendor.ref([]);
    common_vendor.onShow(async () => {
      const res = await public_request.RequestApi.GetpaTient();
      patient.value = res.data.data;
      if (res.data.data.length == 0) {
        show.value = true;
      }
    });
    const store = store_index.myData();
    function checkedData(name, _id) {
      store.addPatient({ name, _id });
      common_vendor.index.navigateBack({ delta: 1 });
    }
    function canCel() {
      common_vendor.index.navigateBack({ delta: 1 });
    }
    function addTo() {
      common_vendor.index.navigateTo({
        url: "/pages/my-service/my-patient/add-patient"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(patient), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.relation),
            c: common_vendor.t(item.sex),
            d: common_vendor.t(item.age),
            e: common_vendor.t(item.phone),
            f: index,
            g: common_vendor.o(($event) => checkedData(item.name, item._id), index)
          };
        }),
        b: common_vendor.o(canCel),
        c: common_vendor.o(addTo),
        d: common_vendor.p({
          show: common_vendor.unref(show),
          title: common_vendor.unref(title)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u5317\u7F51-\u524D\u7AEF\u8D44\u6599/1708/JS\u7EC3\u4E60/uni-app\u6846\u67B6\u9879\u76EE/vue3+ts\u533B\u4F9D\u901A\u9879\u76EE\u5305uniapp\u7248/\u533B\u4F9D\u901A/src/pages/my-service/my-patient/my-patient.vue"]]);
wx.createPage(MiniProgramPage);
