import table from './index.vue';

table.install=function(vue){
	vue.component(table.name,table);
}

export default table; 
