<template>
  <div class="login-box">
    <el-form :model="loginForm"
             :rules="loginFormRules"
             ref="loginFormRef"
             @keyup.enter.native="submitForm('loginFormRef')">
      <el-form-item class="title-item">
        <h3>登 录</h3>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username"
                  prefix-icon="el-icon-user"
                  placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password"
                  prefix-icon="el-icon-unlock"
                  placeholder="密码"
                  show-password></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="10">
          <el-col :span="10">
            <el-input v-model="loginForm.code"
                      prefix-icon="el-icon-key"
                      placeholder="验证码"></el-input>
          </el-col>
          <el-col :span="9">
            <div v-html="verify"
                 @click="getCaptcha"
                 class="verify-box"></div>
          </el-col>
          <el-col :span="5">
            <el-link type="primary"
                     :underline="false">
              忘记密码？
            </el-link>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="button-item">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-button type="primary"
                       @click="submitForm('loginFormRef')">登 录</el-button>
          </el-col>
          <el-col :span="12">
            <el-button @click="() => $router.push('/user/register')">
              注 册
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { v4 } from 'uuid'
import { getLocal, setLocal } from '@/utils/local'
import { getCaptcha } from '@/api/public'
import * as types from '@/store/action-types'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')
export default {
  name: 'Login',
  data () {
    return {
      // 用户登录表单
      loginForm: {
        // 用户名
        username: '',
        // 密码
        password: '',
        // 验证码
        code: ''
      },
      // 登录表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      // 验证码
      verify: ''
    }
  },
  created () {
    this.uid = getLocal('uuid')
    if (!this.uid) {
      setLocal('uuid', v4())
    }
    this.getCaptcha()
  },
  methods: {
    ...mapActions([types.USER_LOGIN]),
    async getCaptcha () {
      const { data } = await getCaptcha()
      this.verify = data
    },
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        try {
          await this[types.USER_LOGIN]({ ...this.loginForm, uid: this.uid })
          this.$message.success('登录成功！')
          this.$router.push('/')
        } catch (e) {
          this.$message.error(e || '登录失败！')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-box {
    width: 460px;
    // height: 332px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .el-form {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    .title-item {
      margin-bottom: 0;
      h3 {
        margin: 0;
      }
    }
    .button-item {
      margin-bottom: 0;
      .el-button {
        width: 100%;
      }
    }
    .verify-box {
      height: 40px;
      svg {
        width: 100%;
      }
    }
  }
</style>
