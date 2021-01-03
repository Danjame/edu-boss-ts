<template>
  <div class="login">
    <el-form
      class="login-form"
      label-position = "top"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
        class="login-btn"
        type="primary"
        :loading="isLoginLoading"
        @click="onSubmit('form')"
        >
          登陆
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'Login',
  data () {
    return {
      form: {
        phone: '',
        password: ''
        // phone: '15510792995',
        // password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  methods: {
    async login () {
      this.isLoginLoading = true
      const { data } = await login(this.form)
      if (data.state !== 1) {
        this.$message.error(data.message)
      } else {
        this.$store.commit('setUser', data.content)
        this.$message.success('登陆成功')
        this.$router.push(this.$route.query.redirect as string || '/')
      }
      this.isLoginLoading = false
    },
    onSubmit (formName: string) {
      (this.$refs[formName] as Form).validate((v, m) => {
        if (v) {
          // 验证通过
          this.login()
        } else {
          // 验证失败
          const mesgs = []
          for (const key in m) {
            mesgs.push(` ${mesgs.length + 1}：${m[key][0].message}`)
          }
          this.$message.error(`${mesgs}`)
          return false
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 300px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
