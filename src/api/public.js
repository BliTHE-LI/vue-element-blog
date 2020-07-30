import config from './config/public'
import axios from '@/utils/request'
import { getLocal } from '@/utils/local.js'

// 获取轮播图数据
export const getSlider = () => axios.get(config.getSlider)
// 获取验证码
export const getCaptcha = () => axios.get(config.getCaptcha, {
  params: {
    uid: getLocal('uuid')
  }
})

// 获取数据的位置
// 1. 在页面中获取数据
// 2. 在 Vuex 的 action 中获取数据
//    Vuex 中获取：
//    1. 全局数据（例如：权限）
//    2. 可以复用的方法
//    3. 做缓存在
