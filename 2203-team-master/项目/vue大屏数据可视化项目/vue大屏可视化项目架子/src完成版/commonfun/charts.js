//思路-这里引入了自己封装的原生jsonp，1.原因是需要解决跨域问题 2.jsonp可以跨域，但是只能get请求，而且需要后台配合,返回jsonp格式。 3.跨域其它方式-第三方代理跨域

import { jsonp } from './jsonp.js'  //原生jsonp
import { setOption1, setOption2, setOption3, setOption4, setOption5, setOption6, setForeignData } from './options.js'

//获取国外疫情数据
//通过return promise的形式,导出异步获得的数据
export function getForeinData() {
	return new Promise((resolve, reject) => {
		//1.原生jsonp自己封装
		// jsonp({
		// 	url: 'https://view.inews.qq.com/g2/getOnsInfo',
		// 	params: {
		// 		name: 'disease_foreign',
		// 	},
		// 	success(res) {
		// 		let foreinData;
		// 		let chinaData;
		// 		foreinData = JSON.parse(res.data);
		// 		const option1 = setOption1(foreinData.countryAddConfirmRankList);
		// 		const option2 = setOption2(foreinData.foreignList);
		// 		const option3 = setOption3(foreinData.continentStatis);
		// 		const option4 = setOption4(foreinData.globalDailyHistory);
		// 		const option5 = setOption5(foreinData.continentStatis[foreinData.continentStatis.length-1]);
		// 		const option6 = setOption6(foreinData.importStatis);
		// 		const centerTop = foreinData.globalStatis;
		// 		resolve({option1,option2,option3,option4,option5,option6,centerTop})
		// 	}
		// });	

		//2.jquery中ajax也封装好了jsonp-缺点：1.只能用get方法请求,不能用post 2.还得后台配合你写回调参数
		$.ajax({
			url: 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_foreign',
			dataType: "jsonp",
			// jsonp: "callback",//传给后端用来获取jsonp回调函数名的参数名，一般默认是callback。不写也可以
			// jsonpCallback:"cb",//也可跟后端约定函数名
			success(res) {
				console.log('ajax数据', res);
				let foreinData;
				let chinaData;
				foreinData = JSON.parse(res.data);
				const option1 = setOption1(foreinData.countryAddConfirmRankList);
				const option2 = setOption2(foreinData.foreignList);
				const option3 = setOption3(foreinData.continentStatis);
				const option4 = setOption4(foreinData.globalDailyHistory);
				const option5 = setOption5(foreinData.continentStatis[foreinData.continentStatis.length - 1]);
				const option6 = setOption6(foreinData.importStatis);
				const centerTop = foreinData.globalStatis;
				resolve({ option1, option2, option3, option4, option5, option6, centerTop })
			}
		})


	})
}

//中间地图的数据——同时获取国外和国内疫情数据与，并进行一定处理
export function getMapData() {
	return Promise.all([new Promise((resolve, reject) => {

		jsonp({
			url: 'https://view.inews.qq.com/g2/getOnsInfo',
			params: {
				name: 'disease_foreign',
			},
			success(res) {
				let foreinData;
				foreinData = JSON.parse(res.data);
				const foreignData = setForeignData(foreinData.foreignList);
				resolve(foreignData)
			}
		})


	}), new Promise((resolve, reject) => {
		jsonp({
			url: 'https://view.inews.qq.com/g2/getOnsInfo',
			params: {
				name: 'disease_h5',
			},
			success(res1) {   //注意不能和上面的重复
				console.log(104, res1);
				//数据可能有问题
				// let chinaData;
				// chinaData = JSON.parse(res1.data);
				// const chinaMapData = {name:'中国',confirm:chinaData.chinaTotal.confirm,nowConfirm:chinaData.chinaTotal.nowConfirm}
				// resolve(chinaMapData);
				const chinaMapData = { name: '中国', confirm: 100, nowConfirm: 100 }
				resolve(chinaMapData);
			}
		});
	})])
}

//添加echart图表
export function addChart(dom, option) {
	let myChart = echarts.init(dom);
	myChart.setOption(option);
	window.addEventListener("resize", function () {
		myChart.resize();
	});
	return myChart;
}
