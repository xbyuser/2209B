import bread from './index.vue';

bread.install=function(vue){
	vue.component(bread.name,bread);
}

export default bread; 
