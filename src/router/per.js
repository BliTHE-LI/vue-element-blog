import routerComponents from './router-components'

export default [{
  path: 'userStatistics',
  meta: {
    auth: 'userStatistics'
  },
  name: 'userStatistics',
  component: routerComponents.userStatistics
},
{
  path: 'userAuth',
  meta: {
    auth: 'userAuth'
  },
  name: 'userAuth',
  component: routerComponents.userAuth
},
{
  path: 'infoPublish',
  meta: {
    auth: 'infoPublish'
  },
  name: 'infoPublish',
  component: routerComponents.infoPublish
},
{
  path: 'articleManager',
  meta: {
    auth: 'articleManager'
  },
  name: 'articleManager',
  component: routerComponents.articleManager
},
{
  path: 'personal',
  name: 'personal',
  meta: {
    auth: 'personal'
  },
  component: routerComponents.personal
},
{
  path: 'myCollection',
  meta: {
    auth: 'myCollection'
  },
  name: 'myCollection',
  component: routerComponents.myCollection
},
{
  path: 'privateMessage',
  meta: {
    auth: 'privateMessage'
  },
  name: 'privateMessage',
  component: routerComponents.privateMessage
},
{
  path: 'myArticle',
  meta: {
    auth: 'myArticle'
  },
  name: 'myArticle',
  component: routerComponents.myArticle
}
]
