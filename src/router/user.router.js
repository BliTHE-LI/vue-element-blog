import routerComponents from './router-components'
export default [
  {
    path: '/user',
    name: 'User',
    redirect: '/user/login',
    component: routerComponents.UserLayout,
    children: [
      {
        path: 'register',
        name: 'Register',
        component: routerComponents.Register,
        meta: {
          title: '注册'
        }
      },
      {
        path: 'login',
        name: 'login',
        component: routerComponents.Login,
        meta: {
          title: '登陆'
        }
      },
      {
        path: 'forget',
        name: 'forget',
        component: routerComponents.Forget,
        meta: {
          title: '忘记密码'
        }
      }
    ]
  }
]
