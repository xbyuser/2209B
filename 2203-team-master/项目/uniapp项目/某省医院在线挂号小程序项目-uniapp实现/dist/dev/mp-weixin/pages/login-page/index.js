"use strict";
const common_vendor = require("../../common/vendor.js");
const public_request = require("../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    function Login() {
      common_vendor.index.getUserProfile({
        desc: "\u83B7\u53D6\u4E2A\u4EBA\u4FE1\u606F",
        success: (res) => {
          let { avatarUrl, nickName } = res.userInfo;
          common_vendor.index.login({
            success: (code) => {
              common_vendor.index.showLoading({ title: "\u767B\u9646\u4E2D", mask: true });
              ApiLogin(avatarUrl, nickName, code.code);
            },
            fail: (err) => {
              common_vendor.index.showToast({ title: "\u767B\u5F55\u5931\u8D25", icon: "none", duration: 1e3 });
            }
          });
        },
        fail: (err) => {
          common_vendor.index.showToast({ title: "\u767B\u5F55\u5931\u8D25", icon: "none", duration: 1e3 });
        }
      });
    }
    async function ApiLogin(avatarUrl, nickName, code) {
      try {
        let obj = {
          appid: "wx90181aae40d571d5",
          secret: "0b8e701966f372a094e30639e9744ae4",
          avatarUrl,
          nickName,
          code
        };
        let res = await public_request.RequestApi.WxLogin(obj);
        common_vendor.index.setStorageSync("wxuser", res.data.data);
        setTimeout(() => {
          common_vendor.index.navigateBack({ delta: 1 });
          common_vendor.index.hideLoading();
        }, 600);
      } catch (error) {
        common_vendor.index.showToast({ title: "\u767B\u5F55\u5931\u8D25", icon: "none", duration: 1e3 });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(Login)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u5317\u7F51-\u524D\u7AEF\u8D44\u6599/1708/JS\u7EC3\u4E60/uni-app\u6846\u67B6\u9879\u76EE/vue3+ts\u533B\u4F9D\u901A\u9879\u76EE\u5305uniapp\u7248/\u533B\u4F9D\u901A/src/pages/login-page/index.vue"]]);
wx.createPage(MiniProgramPage);
