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
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
        class="login-btn"
        type="primary"
        :loading="isLoginLoading"
        @click="onSubmit"
        >
          登陆
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'
import qs from 'qs'

export default Vue.extend({
  name: 'Login',
  data () {
    return {
      form: {
        phone: '15510792995',
        password: '111111'
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
    async onSubmit () {
      console.log('submit')
      const { data } = await request({
        method: 'POST',
        url: '/front/user/login',
        headers: { 'content-type': 'application/x-wwww-form-urlencoded' },
        data: qs.stringify(this.form)
      })

      console.log(data)
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
