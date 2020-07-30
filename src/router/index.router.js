import routerComponents from './router-components'
export default [
  {
    path: '',
    name: 'index',
    redirect: '/',
    component: routerComponents.BlogLayout,
    meta: {
      // 是否需要登录，子路由都需要登录
      needLogin: true
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: routerComponents.Home,
        meta: {
          title: '博客首页'
        }
      },
      {
        path: '/post',
        name: 'post',
        component: routerComponents.Post,
        meta: {
          title: '发表文章'
        }
      }
    ]
  }
]
