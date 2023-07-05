/*
 * @author: sanbao
 * @Date: 2022-08-31 20:55:48
 */
import { LocationQueryValue } from 'vue-router'
import request from './request'

//注册接口有问题-后端不能注册
interface UserRegister {
  email: string,
  nickName: string,
  password: string,
}
// interface UserRegister {
//   email: string,
//   nickname: string,
//   password: string | number,
//   repeatPassword: string | number
// }
export const userRegister = (options: UserRegister) => request({ url: 'users/', method: 'post', data: options })

//登录接口可用
interface UserLogin {
  email: string,
  password: string | number
}
export const userLogin = (options: UserLogin) => request({ method: 'post', url: 'user/login', data: options })

//退出登录 应该是用不了了
// export const userLoginOut = () => request({ method: 'get', url: '/loginout' })

//图片上传
export const uploadFile = (options: any) => {
  console.log(options);
  return request({
    method: 'post',
    url: 'upload',
    data: options
  })
}

//填加内容-http://api.vikingship.xyz/api/posts
interface AddarticleConfig {
  title: string,
  content: string,
  image?: string,//可有可无
  author: string,
  column: string
}
export const addArticle = (options: AddarticleConfig) => request({ method: 'post', url: 'posts', data: options })

//首页文章列表
interface ListConfig {
  currentPage: number,
  pageSize: number
}
export const getColumnList = (options: ListConfig) => request({ method: 'get', url: '/columns', params: options })


//专栏列表-http://api.vikingship.xyz/api/columns/5f3e86d62c56ee13bb830968/posts?currentPage=1&pageSize=5
interface SpecialConfig {
  page: number,
  pageSize: number,
  author: LocationQueryValue | LocationQueryValue[]
}
export const getSpecialList = (options: SpecialConfig) => {
  return request({
    method: 'get',
    url: `columns/${options.author}/posts?currentPage=${options.page}&pageSize=${options.pageSize}`,
  })
}

//用户收藏
export const userCollect = (id: string) => request({ method: 'get', url: '/collect', params: { id } })

//删除收藏
export const userDelCollect = (id: string) => {
  return request({
    url: `posts/${id}`,
    method: 'DELETE',
  })
}


//用户信息
export const getuserlist = () => {
  return request({
    url: 'user/current',
    method: 'get',
  })
}
