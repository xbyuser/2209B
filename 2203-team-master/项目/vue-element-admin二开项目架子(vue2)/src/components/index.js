// 负责管理所有的公共组件
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import Lang from './Lang'
import TagsView from './TagsView'
export default {
  install(Vue) {
    // Vue全局对象
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('Lang', Lang)
    Vue.component('TagsView', TagsView)
  }
}
