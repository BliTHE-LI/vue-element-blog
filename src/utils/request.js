import axios from 'axios'
import config from '@/config'
import { getLocal } from './local'
class HttpRequest {
  constructor () {
    // 可以增加实例属性
    // 后台接口的路径，开发模式和生产模式不一样
    this.baseURL = config.baseURL
    // 3秒请求超时
    this.timeout = 3000
  }

  setInterceptors (instance) {
    instance.interceptors.request.use(config => {
      // 一般增加 token
      // jwt 需要在前面加上 Bearer
      config.headers.Authorization = `Bearer ${getLocal('token')}`
      return config
    })
    instance.interceptors.response.use(res => {
      if (res.status === 200) {
        // 服务器返回的结果都会放到 data 中
        if (res.data.err === 0) { // 统一处理错误状态码
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res.data.data)
        }
      } else {
        // 后端接口如果失败了，会在返回结果中增加一个 data 字段存放失败原因
        return Promise.reject(res.data.data)
      }
    }, err => {
      console.log(err)
      // 单独处理其它的异常状态码
      switch (err.response.status) {
        case '401':
          console.error(err)
          break
        default:
          break
      }
      return Promise.reject(err)
    })
  }

  mergeOptions (options) {
    return {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options
    }
  }

  request (options) {
    // 创建axios实例
    const instance = axios.create()
    this.setInterceptors(instance)
    const opts = this.mergeOptions(options)
    return instance(opts)
  }

  // get 请求为路径参数
  get (url, config) {
    return this.request({
      method: 'GET',
      url,
      ...config
    })
  }

  // post 数据在请求体中
  post (url, data) {
    return this.request({
      method: 'POST',
      url,
      data
    })
  }
}

export default new HttpRequest()
