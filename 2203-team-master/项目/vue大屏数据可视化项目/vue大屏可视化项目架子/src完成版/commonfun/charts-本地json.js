//思路-该页面用于封装统一请求方法
import {setOption1,setOption2,setOption3,setOption4,setOption5,setOption6,setForeignData} from './options.js' //echarts相关的配置属性,统一处理

//获取国外疫情数据-通过return promise的形式,导出异步获得的数据
const baseUrl='./data' //后台根请求地址
export function getForeinData (){
	//注意这里为什么通过promise包装下ajax，而不是直接请求ajax?就是因为外面要用ajax请求成功的数据。这里的解决方案：就是通过promise包装ajax，将要返回的数据通过resolve回调出去。相当于回调函数
	  return new Promise((resolve,reject)=>{
		 //注意这里在index.html引入了jq，同时在vue.config.js里设置了别名访问方式
		$.ajax({
			url: `${baseUrl}/disease_foreign.json`,
			success(res) {
				let foreinData;
				foreinData = JSON.parse(res.data);
				const option1 = setOption1(foreinData.countryAddConfirmRankList);
				const option2 = setOption2(foreinData.foreignList);
				const option3 = setOption3(foreinData.continentStatis);
				const option4 = setOption4(foreinData.globalDailyHistory);
				const option5 = setOption5(foreinData.continentStatis[foreinData.continentStatis.length-1]);
				const option6 = setOption6(foreinData.importStatis);
				const centerTop = foreinData.globalStatis;

				//注意这里resolve把请求成功的数据返回出去！！！外面要用这个数据,通过回调函数调用
				 resolve({option1,option2,option3,option4,option5,option6,centerTop})
				
			}
		});
			
	}) 
}

//同时获取国外和国内疫情数据，并进行一定处理。这里使用了Promise.all([new Promise,new Promise]),可同时请求多个数据
 export function getMapData(){
	return Promise.all([
		new Promise((resolve,reject)=>{
			$.ajax({
				url: `${baseUrl}/disease_foreign.json`,
				success(res) {
					let foreinData;
					foreinData = JSON.parse(res.data);
					const foreignData = setForeignData(foreinData.foreignList);
					resolve(foreignData)
				}})
			}),
		new Promise((resolve,reject)=>{
			$.ajax({
				url: `${baseUrl}/disease_h5.json`,
				success(res1) {   //注意res不能和上面的重复
					let chinaData;
					chinaData = JSON.parse(res1.data);
					const chinaMapData = {name:'中国',confirm:chinaData.chinaTotal.confirm,nowConfirm:chinaData.chinaTotal.nowConfirm}
					resolve(chinaMapData);
				}
			});
	   })
    ])
} 

//添加echart图表
//注意这里通过cdn方式在index.html引入了echarts,同时在vue.config.js里配置了代码拆分抽离,这样打包的时候echarts就不会被打包到dist文件里
export function addChart(dom,option){
	let myChart = echarts.init(dom);
	myChart.setOption(option);
	//页面改变大小时,echarts也跟随改变
	window.addEventListener("resize", function() {
	  myChart.resize();
	});
	return myChart;
}
