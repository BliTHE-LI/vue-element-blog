// const prefix = 'http://localhost:4000'
// 默认axios baseURL,如果已经写完整的路径 baseURL 会失效
export default {
  // register: `${prefix}/user/reg`
  // 用户注册
  register: '/user/reg',
  // 用户登录
  login: '/user/login',
  // 校验token
  validate: '/user/validate'
}
