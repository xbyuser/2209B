import http from './http'
//对request请求进行promise包装-加入了类型限制
type Method = 'get' | 'post'
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
export default function request ({ method, url, data, params, headers }:AxiosRequest):Promise<CostomResponse> {
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

