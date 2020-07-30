<template>
  <div>
    <el-row class="header-row">
      <el-col :span="18">
        <img src="@/assets/logo.png"
             class="logo" />
        <el-menu class="menu"
                 mode="horizontal"
                 background-color="#333"
                 text-color="#fff"
                 active-text-color="fff"
                 :router="true">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/post">发表文章</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="6">
        <div class="nav-right">
          <el-menu class="el-menu-demo"
                   mode="horizontal"
                   background-color="#333"
                   text-color="#fff"
                   active-text-color="fff">
            <template v-if="!hasPermission">
              <el-menu-item index="login">
                <router-link to="/user/login">登录</router-link>
              </el-menu-item>
              <el-menu-item index="register">
                <router-link to="/user/register">注册</router-link>
              </el-menu-item>
            </template>
            <el-submenu v-else
                        index="profile">
              <template slot="title">{{userInfo.username}}</template>
              <el-menu-item @click="() => $router.push('/manager')">管理后台</el-menu-item>
              <el-menu-item @click="logout">退出登录</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as types from '@/store/action-types'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('user')
export default {
  name: 'PageHeader',
  computed: {
    ...mapState(['hasPermission', 'userInfo'])
  },
  methods: {
    ...mapActions([types.USER_LOGOUT]),
    logout () {
      this[types.USER_LOGOUT]()
      this.$router.push('/user/login')
    }
  }
}
</script>

<style lang="scss">
  .header-row {
    height: 100%;
    .logo {
      margin: 5px;
      height: 50px;
    }
    .menu,
    .logo {
      display: inline-block;
    }
    .nav-right {
      float: right;
      li {
        display: inline-block;
        text-align: center;
        line-height: 60px;
      }
      a {
        color: #fff;
      }
    }
  }
</style>
