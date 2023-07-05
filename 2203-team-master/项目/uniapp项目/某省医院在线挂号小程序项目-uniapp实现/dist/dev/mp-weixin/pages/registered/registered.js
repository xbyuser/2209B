"use strict";
const common_vendor = require("../../common/vendor.js");
const public_request = require("../../public/request.js");
if (!Math) {
  skIndex();
}
const skIndex = () => "../../Skeleton/SK-registered.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "registered",
  setup(__props) {
    let department_data = common_vendor.ref([]);
    let skeLeton = common_vendor.ref(true);
    common_vendor.onMounted(async () => {
      const res = await public_request.RequestApi.DeparTment();
      department_data.value = res.data.data;
      changeList(0, res.data.data[0]._id);
    });
    let addColor = common_vendor.ref(0);
    let reglist_data = common_vendor.ref([]);
    async function changeList(index, id) {
      addColor.value = index;
      const res = await public_request.RequestApi.RegList({ id });
      reglist_data.value = res.data.data;
      skeLeton.value = false;
    }
    function jumpRoute(id) {
      common_vendor.index.navigateTo({
        url: "/pages/doctor/index?id=" + id
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(department_data), (item, index, i0) => {
          return {
            a: common_vendor.t(item.dep_ment),
            b: index,
            c: common_vendor.n(common_vendor.unref(addColor) == index ? "addcolor" : ""),
            d: common_vendor.o(($event) => changeList(index, item._id), index)
          };
        }),
        b: common_vendor.f(common_vendor.unref(reglist_data), (item, index, i0) => {
          return {
            a: common_vendor.f(item.dep_ment_list, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.dep_name),
                b: index_a,
                c: common_vendor.o(($event) => jumpRoute(item_a.dep_id), index_a)
              };
            }),
            b: index
          };
        }),
        c: common_vendor.unref(skeLeton)
      }, common_vendor.unref(skeLeton) ? {} : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70dc9f2c"], ["__file", "D:/\u5317\u7F51-\u524D\u7AEF\u8D44\u6599/1708/JS\u7EC3\u4E60/uni-app\u6846\u67B6\u9879\u76EE/vue3+ts\u533B\u4F9D\u901A\u9879\u76EE\u5305uniapp\u7248/\u533B\u4F9D\u901A/src/pages/registered/registered.vue"]]);
wx.createPage(MiniProgramPage);
