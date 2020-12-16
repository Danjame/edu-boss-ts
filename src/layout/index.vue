<template>
  <el-container>
    <el-aside>
      <Aside />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Vue from 'vue'
import Aside from './components/aside'
import Header from './components/header'

export default Vue.extend({
  name: 'Layout',
  components: {
    Aside,
    Header
  }
})
</script>

<style>
</style>
