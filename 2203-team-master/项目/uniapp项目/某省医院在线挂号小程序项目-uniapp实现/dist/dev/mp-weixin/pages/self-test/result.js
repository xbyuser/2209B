"use strict";
const common_vendor = require("../../common/vendor.js");
const public_request = require("../../public/request.js");
const public_testing = require("../../public/testing.js");
if (!Math) {
  skIndex();
}
const skIndex = () => "../../Skeleton/SK-self-test-result.js";
const _sfc_defineComponent = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "result",
  setup(__props) {
    let topic_id_v = common_vendor.ref([]);
    let type_id = common_vendor.ref("");
    let share_data = common_vendor.ref([]);
    common_vendor.onLoad((event) => {
      let { type, topic_id } = JSON.parse(event.value);
      topic_id_v.value = topic_id;
      type_id.value = type;
      share_data.value = public_testing.TEST.filter((item) => item.type == type);
    });
    let test_res = common_vendor.ref([]);
    let skeLeton = common_vendor.ref(true);
    common_vendor.onShow(async () => {
      if (type_id.value == "001") {
        var res = await public_request.RequestApi.DepressiSon({ value: topic_id_v.value });
      } else if (type_id.value == "002") {
        var res = await public_request.RequestApi.PremaTure({ value: topic_id_v.value });
      } else {
        var res = await public_request.RequestApi.InsoMnia({ value: topic_id_v.value });
      }
      test_res.value = res.data.data;
      skeLeton.value = false;
    });
    function canCel() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    common_vendor.onShareAppMessage(() => {
      return {
        title: share_data.value[0].share_title,
        path: share_data.value[0].share_path,
        imageUrl: share_data.value[0].share_url
      };
    });
    function regiSter(dep_id) {
      common_vendor.index.redirectTo({
        url: "/pages/doctor/index?id=" + dep_id
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(test_res), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.scope),
            b: common_vendor.t(item.result),
            c: common_vendor.t(item.suggest),
            d: common_vendor.f(item.outline, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(index_a + 1),
                b: common_vendor.t(item_a),
                c: index_a
              };
            }),
            e: item.recommend.length > 0
          }, item.recommend.length > 0 ? {
            f: common_vendor.f(item.recommend, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.dep_name),
                b: common_vendor.t(item_a.hospital),
                c: common_vendor.o(($event) => regiSter(item_a.dep_id), index_a),
                d: index_a
              };
            })
          } : {}, {
            g: index
          });
        }),
        b: common_vendor.o(canCel),
        c: common_vendor.unref(skeLeton)
      }, common_vendor.unref(skeLeton) ? {} : {});
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 2;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__file", "D:/\u5317\u7F51-\u524D\u7AEF\u8D44\u6599/1708/JS\u7EC3\u4E60/uni-app\u6846\u67B6\u9879\u76EE/vue3+ts\u533B\u4F9D\u901A\u9879\u76EE\u5305uniapp\u7248/\u533B\u4F9D\u901A/src/pages/self-test/result.vue"]]);
wx.createPage(MiniProgramPage);
