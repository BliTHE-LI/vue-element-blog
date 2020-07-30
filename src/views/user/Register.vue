<template>
  <div class="register-box">
    <el-form :model="registerForm"
             :rules="registerFormRules"
             ref="registerFormRef"
             status-icon>
      <el-form-item class="title-item">注册</el-form-item>
      <el-form-item prop="username">
        <el-input v-model="registerForm.username"
                  prefix-icon="el-icon-user"
                  placeholder="请输入用户名"
                  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerForm.password"
                  type="password"
                  prefix-icon="el-icon-unlock"
                  placeholder="请输入密码"
                  auto-complete="off"
                  show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input v-model="registerForm.checkPass"
                  type="password"
                  prefix-icon="el-icon-unlock"
                  placeholder="请再次输入密码"
                  auto-complete="off"
                  show-password>
        </el-input>
      </el-form-item>
      <el-form-item class="button-item">
        <el-button type="primary"
                   @click="submitForm('registerFormRef')">注 册</el-button>
        <el-link type="primary"
                 :underline="false"
                 @click="toLogin">
          使用已有账户登录
        </el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as user from '@/api/user'
export default {
  name: 'Register',
  data () {
    const checkPass1 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.checkPass) {
          this.$refs.registerFormRef.validateField('checkPass')
        }
        callback()
      }
    }
    const checkPass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        checkPass: ''
      },
      registerFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', tirgger: 'blur' },
          { validator: checkPass1, tirgger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请再次确认密码', tirgger: 'blur' },
          { validator: checkPass2, tirgger: 'blur' }
        ]
      }
    }
  },
  methods: {
    toLogin () {
      this.$router.push('/user/login')
    },
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        try {
          await user.register(this.registerForm)
          this.$message.success('注册成功，可以登录啦！')
          setTimeout(() => {
            this.$router.push('/user/login')
          }, 1000)
        } catch (e) {
          this.$message.error(e || '注册失败！')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .register-box {
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
    }
    .button-item {
      margin-bottom: 0;
      .el-button {
        width: 50%;
      }
      .el-link {
        float: right;
      }
    }
  }
</style>
