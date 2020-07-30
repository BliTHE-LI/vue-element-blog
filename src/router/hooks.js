import store from '@/store'
import * as types from '@/store/action-types'
// 必须使用普通函数，不能使用箭头函数，否则没有 this 指向

// 不需要登录的路由地址
const whiteList = ['/user/login', '/user/register', '/user/forget']
// 登录后默认访问路由
const defaultRoutePath = '/'

// 登录权限校验
const loginPermission = async function (to, from, next) {
  const needLogin = to.matched.some(item => item.meta.needLogin)
  // 校验登录状态
  const r = await store.dispatch(`user/${types.USER_VALIDATE}`)
  // 判断登录状态
  if (!store.state.user.hasPermission) {
    if (needLogin || !whiteList.includes(to.path)) {
      if (r) {
        next()
      } else {
        next({ path: '/user/login', query: { redirect: to.fullPath } })
      }
    } else {
      next()
    }
  } else {
    if (to.path === '/user/login') {
      // 已经登录 如果访问的是的是登录路由直接跳转到默认路由
      next({ path: defaultRoutePath })
    } else {
      const redirect = decodeURIComponent(from.query.redirect || to.path)
      if (to.path === redirect) {
        next()
      } else {
        // 跳转到目的路由
        next({ path: redirect })
      }
    }
  }
}

// 路由权限动态添加
const menuPermission = function (to, from, next) {
  // 判断是否已经登录
  if (store.state.user.hasPermission) {
    // 判断是否已经添加了路由
    if (!store.state.user.menuPermission) {
      store.dispatch(`user/${types.ADD_ROUTE}`)
      return next({ ...to, replace: true }) // 进入到页面时 是404
    }
  }
  next()
}

export default {
  loginPermission,
  menuPermission
}
