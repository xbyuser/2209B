// import Vue from 'vue'

// Vue.directive()
// 专门处理图片异常
export const imagerror = {
  inserted(dom, options) {
    // dom是作用的标签的dom元素
    dom.onerror = () => {
      dom.src = options.value
    }
  }
}

