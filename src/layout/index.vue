<template>
  <el-container>
    <el-aside width="auto">
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

<script lang="ts">
import Vue from 'vue'
import Aside from './components/aside.vue'
import Header from './components/header.vue'

export default Vue.extend({
  name: 'Layout',
  components: {
    Aside,
    Header
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  min-height: 100vh;
}

.el-aside {
  position: sticky;
  top: 0;
  max-height: 100vh;
}

.el-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #eee;
}

.el-main {
  // background: #e9eef3;
  background: #fff;
}
</style>
