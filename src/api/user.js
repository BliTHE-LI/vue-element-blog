import config from './config/user'
import axios from '@/utils/request'

// 注册
export const register = (options) => axios.post(config.register, options)

// 登录
export const login = (options) => axios.post(config.login, options)

// 校验用户是否登录，如果已登录就获取用户最新信息，更新用户
export const validate = () => axios.get(config.validate)
