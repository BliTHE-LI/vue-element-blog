import Vue from 'vue'
import VueRouter from 'vue-router'
import routerComponents from './router-components'
import hooks from './hooks'

// 解决连续点击重复路由报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const routes = []
// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*',
  // 不能加name
  // name: '404',
  component: routerComponents[404]
}
// webpack 语法
// 像前段的读写文件
// 参数：路径，读取子目录，正则匹配后缀
const files = require.context('./', false, /\.router.js$/)
files.keys().forEach(key => {
  routes.push(...files(key).default)
})
routes.push(notFoundRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
Object.values(hooks).forEach(hook => {
  // 使用 bind 绑定 this 指向
  router.beforeEach(hook.bind(router))
})
export default router
