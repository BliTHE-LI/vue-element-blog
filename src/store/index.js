import Vue from 'vue'
import Vuex from 'vuex'
import rootModule from './rootModule'
Vue.use(Vuex)
const files = require.context('./modules', false, /\.js$/)
files.keys().forEach((key, index) => {
  // 取出模块对应的内容
  const store = files(key).default
  const moduleName = key.replace(/\.\//, '').replace(/\.js/, '')
  // 动态添加模块
  const modules = rootModule.modules = rootModule.modules || {}
  modules[moduleName] = store
  modules[moduleName].namespaced = true
})
const store = new Vuex.Store(rootModule)
export default store
