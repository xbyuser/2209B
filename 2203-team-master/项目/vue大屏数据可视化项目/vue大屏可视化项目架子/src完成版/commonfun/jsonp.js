//封装一个获取jsonp接口方法 
//jsonp原理- <script src="请求链接callback"></script> 
//简单来说，jsonp是利用了script的src能够跨域获取数据的能力，用前后端约定的函数来包裹数据，前端声明，后端调用，来达到获取数据的目的。

export function jsonp({
	url,
	params = {},
	success
}) {
	// 根据时间戳生成一个callback名
	//例：https://view.inews.qq.com/g2/getOnsInfo?callback=jsonp_callback_161529116492615333&name=disease_h5
	let callbackName = 'jsonp_callback_' + Date.now() + Math.random().toString().substr(2, 5);
	let script = document.createElement('script');
	let baseUrl = `${url}?callback=${callbackName}`;

	// 取出params对象属性并得到完整url
	for (let item in params) {
		baseUrl += `&${item}=${params[item]}`;
	}
	// jsonp核心，通过script的跨域特性发出请求
	script.src = baseUrl;
	// 把创建的script挂载到DOM
	document.body.appendChild(script);

	// 给window添加属性，用于获取jsonp结果-注意:callback需挂载到window下
	window[callbackName] = (res) => {
		// 执行success回调
		success(res);
		// 删除window下属性
		delete window[callbackName];
		// 得到结果后删除创建的script
		document.body.removeChild(script);
	}

}
