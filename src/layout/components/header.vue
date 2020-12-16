<template>
 <el-breadcrumb separator-class="el-icon-arrow-right">
   <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
   <el-breadcrumb-item>活动管理</el-breadcrumb-item>
   <el-breadcrumb-item>活动列表</el-breadcrumb-item>
   <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Header'
})
</script>

<style>

</style>
