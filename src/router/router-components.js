import { BlogLayout, UserLayout, ManagerLayout } from '@/layouts'

const routerComponents = {
  BlogLayout,
  UserLayout,
  ManagerLayout,
  // 404
  404: () => import(/* webpackChunkName: '404' */ '@/views/404.vue'),

  // 主页
  Home: () => import(/* webpackChunkName: 'home' */ '@/views/Home.vue'),

  // 注册
  Register: () => import(/* webpackChunkName: 'user-register' */ '@/views/user/Register.vue'),
  // 登录
  Login: () => import(/* webpackChunkName: 'user-login' */ '@/views/user/Login.vue'),
  // 忘记密码
  Forget: () => import(/* webpackChunkName: 'user-forget' */ '@/views/user/Forget.vue'),

  // 用户统计
  userStatistics: () => import(/* webpackChunkName:'manager' */ '@/views/manager/UserStatistics.vue'),
  // 信息发布
  infoPublish: () => import(/* webpackChunkName:'manager' */ '@/views/manager/InfoPublish.vue'),
  // 用户权限
  userAuth: () => import(/* webpackChunkName:'manager' */ '@/views/manager/UserAuth.vue'),
  // 文章管理
  articleManager: () => import(/* webpackChunkName:'manager' */ '@/views/manager/ArticleManager.vue'),
  // 个人中心
  personal: () => import(/* webpackChunkName:'manager' */ '@/views/manager/Personal.vue'),
  // 我的收藏
  myCollection: () => import(/* webpackChunkName:'manager' */ '@/views/manager/MyCollection.vue'),
  // 私信消息
  privateMessage: () => import(/* webpackChunkName:'manager' */ '@/views/manager/PrivateMessage.vue'),
  // 我的文章
  myArticle: () => import(/* webpackChunkName:'manager' */ '@/views/manager/MyArticle.vue'),
  // 发表文章
  Post: () => import(/* webpackChunkName:'post' */ '@/views/article/Post.vue')
}

export default routerComponents
