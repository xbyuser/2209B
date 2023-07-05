/*
 * @author: sanbao
 * @Date: 2022-06-22 10:41:44
 */
import http from './http'
//对request请求进行promise包装-加入了类型限制
type Method = 'get' | 'post' | 'DELETE'
interface AxiosRequest {
  url: string;
  data?: any;
  params?: any;
  method?: Method;
  headers?: any;
}
interface CostomResponse {
  readonly success: boolean;
  readonly msg: string;
  data: any;
}
export default function request({ method, url, data, params, headers }: AxiosRequest): Promise<CostomResponse> {
  return new Promise((resolve) => {
    http({
      method,
      url,
      data,
      params,
      headers
    }).then(res => {
      resolve({ success: res.data.success, msg: res.data.msg, data: res.data.data })
    })
  })
}

//传统js-对http请求在次包装，返回规定好的响应格式

/* export default function request({ method, url, data, params, headers }:any){
  return new Promise((resolve) => {
        http({
          method,
          url,
          data,
          params,
          headers
        }).then(res => {
          resolve({ success: res.data.success, msg: res.data.msg, data: res.data.data })
        })
      })
} */



