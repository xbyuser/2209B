<template>
  <div id="zptime">
	 {{setDate}}
  </div>
</template>

<script>
	export default {
		name:'zptime',
		data(){
			return{
				date:new Date(),
			}
		},
		computed:{
			setDate(){
				//小于10,前面补0
				 var padaDate = function(value){
                      return value<10 ? '0'+value : value;
                 }
				//调用时间
				return `当前时间: ${this.date.getFullYear()}年${padaDate(this.date.getMonth()+1)}月${padaDate(this.date.getDate())}-${padaDate(this.date.getHours())}时${padaDate(this.date.getMinutes())}分${padaDate(this.date.getSeconds())}秒`
			}
		},
		mounted(){
			  this.timeId=setInterval(()=>{
				  this.date = new Date()
				  console.log('定时器在走');
			  }, 1000);
		},
		//实例销毁之前调用只走一次-销毁定时器
		beforeDestroy:function(){
			if(this.timeId){
				clearInterval(this.timeId);
				console.log('定时器在销毁');
			}
          
       },
	  
	}
</script>
<style scoped>
	#zptime{
		line-height: 75px;
		color: rgba(255, 255, 255, 0.7);
		font-size: 20px;
	}
</style>
