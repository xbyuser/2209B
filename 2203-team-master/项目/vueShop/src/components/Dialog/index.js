import dialog from './index.vue';
//如果要在全局调用这个组件，要把写好的组件index.vue挂载到全局组件上vue.component(name名字,组件名)
dialog.install = function (vue) {
	vue.component(dialog.name, dialog);
}

export default dialog; 
