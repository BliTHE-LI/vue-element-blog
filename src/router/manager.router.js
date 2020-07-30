import routerComponents from './router-components'
export default [
  {
    path: '/manager',
    // name: 'manager',
    // redirect: '/manager/userStatistics',
    component: routerComponents.ManagerLayout,
    meta: {
      needLogin: true
    },
    children: []
  }
]
