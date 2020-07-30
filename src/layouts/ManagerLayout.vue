<template>
  <el-container>
    <el-aside width="200px">
      <div class="logo-box">
        <img src="@/assets/logo.png"
             class="logo" />
        <h1>管理后台</h1>
      </div>
      <my-menu></my-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-row class="header-row">
          <el-col :span="18">
          </el-col>
          <el-col :span="6"
                  :offset="18">
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
                  <el-menu-item @click="() => $router.push('/')">博客首页</el-menu-item>
                  <el-menu-item @click="logout">退出登录</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import MyMenu from '@/components/MyMenu.jsx'
import * as types from '@/store/action-types'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('user')
export default {
  data () {
    return { }
  },
  components: {
    MyMenu
  },
  computed: {
    ...mapState(['userInfo', 'hasPermission'])
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
<style lang="scss" scoped>
  .logo-box {
    height: 60px;
    line-height: 60px;
    padding-left: 24px;
    user-select: none;
    img {
      height: 30px;
      vertical-align: middle;
    }
    h1 {
      display: inline-block;
      color: #fff;
      font-size: 20px;
      margin: 0 0 0 12px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      font-weight: 600;
      vertical-align: middle;
    }
  }
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
  .el-container {
    min-height: 100vh;
  }

  .el-header {
    background-color: #333;
  }

  .el-menu {
    border-right: none;
  }
  .el-aside {
    background: #333;
    opacity: 0.8;
  }
</style>
