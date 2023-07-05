/* eslint-disable */
//vue-shims.d.ts，用于识别单文件vue内的ts代码
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
