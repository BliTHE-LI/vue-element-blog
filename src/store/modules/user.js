import * as types from '../action-types'
import * as user from '@/api/user'
import { setLocal, getLocal, removeLocal } from '@/utils/local.js'
import router from '@/router'
import routerComponents from '@/router/router-components'
const filterRouter = (authList) => {
  // 过滤出所有需要添加路由的菜单
  const auths = authList.filter(auth => auth.auth)
  const routes = []
  auths.forEach(item => {
    routes.push({
      path: item.path.replace('/manager/', ''),
      name: item.auth,
      component: routerComponents[item.auth],
      meta: {
        title: item.name,
        auth: item.auth
      }
    })
  })

  return routes
}
export default {
  state: {
    // 用户信息
    userInfo: {},
    // 用户权限
    hasPermission: false,
    // 菜单权限
    menuPermission: false
  },
  mutations: {
    [types.SET_USER_INFO] (state, userInfo) {
      state.userInfo = userInfo
      if (userInfo && userInfo.token) {
        setLocal('token', userInfo.token)
      } else {
        removeLocal('token')
      }
    },
    [types.SET_PERMISSION] (state, has) {
      state.hasPermission = has
    },
    [types.SET_MENU_PERMISSION] (state, has) {
      state.menuPermission = has
    }
  },
  actions: {
    async [types.SET_USER_INFO] ({ commit }, { payload, permission }) {
      commit(types.SET_USER_INFO, payload)
      commit(types.SET_PERMISSION, permission)
    },
    async [types.USER_LOGIN] ({ dispatch }, payload) {
      try {
        const { data } = await user.login(payload)
        dispatch(types.SET_USER_INFO, { payload: data, permission: true })
        return Promise.resolve({ result: true })
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async [types.USER_VALIDATE] ({ dispatch }) {
      // 如果没有token就是没有登录，直接返回
      if (!getLocal('token')) {
        dispatch(types.SET_USER_INFO, { payload: {}, permission: false })
        return false
      }
      try {
        const { data } = await user.validate()
        dispatch(types.SET_USER_INFO, { payload: data, permission: true })
        return true
      } catch (e) {
        dispatch(types.SET_USER_INFO, { payload: {}, permission: false })
        return false
      }
    },
    async [types.USER_LOGOUT] ({ dispatch, commit }) {
      commit(types.SET_MENU_PERMISSION, false)
      dispatch(types.SET_USER_INFO, { payload: {}, permission: false })
    },
    async [types.ADD_ROUTE] ({ commit, state }) {
      // 后端返回的用户的权限
      const authList = state.userInfo.authList
      if (authList) { // 通过权限过滤出当前用户的路由
        const routes = filterRouter(authList)
        // 找到manager路由
        const route = router.options.routes.find(item => item.path === '/manager')
        route.children = routes // 给它添加子路由
        router.addRoutes([route]) // 动态添加进去
        // console.log('addRoutes', router)
      }
      commit(types.SET_MENU_PERMISSION, true) // 权限设置完毕
    }
  }
}
