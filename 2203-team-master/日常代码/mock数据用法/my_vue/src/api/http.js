import axios from 'axios'
import { MessageBox, Message } from "element-ui"
const Server = axios.create({
    baseURL: "https://api-hmugo-web.itheima.net/api/public/v1/",
    timeout: 5000
})


//3. 配置请求拦截器，前置拦截器
Server.interceptors.request.use((config) => {
    //必须返回配置信息，配置token值
    // console.log("请求拦截器触发",config);
    // if (config.method == "post") {
    //     config.data = qs.stringify(config.data)
    // }
    //请求的header头中增加token值，，`Authorization`
    return config
}, (error) => {
    //请求发送时候，报错的时候触发的
    return Promise.reject(error);
})

//4. 配置后置拦截器，或者叫相应拦截器
Server.interceptors.response.use((res) => {
    //返回数据，过滤器服务端返回数据
    // console.log("我是后置拦截器触发", res);

    //把数据给他过滤掉，取出axios的data
    return res.data;
}, (error) => {
    //请求发送时候，报错的时候触发的
    // console.log(122);
    return Promise.reject(error);
})

//5. 抛出对象
export default Server;