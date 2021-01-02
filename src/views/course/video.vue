<template>
  <div class="video">
    <el-form label-width="80px">
      <el-form-item label="课程">
        <el-input disabled :placeholder="courseName"></el-input>
      </el-form-item>
      <el-form-item label="课时">
        <el-input disabled :placeholder="theme"></el-input>
      </el-form-item>
      <el-form-item label="视频上传">
        <!-- <input type="file">选择视频</input> -->
        <input type="file">
      </el-form-item>
      <el-form-item label="封面上传">
        <!-- <input type="primary">选择封面</input> -->
        <input type="file">
      </el-form-item>
      <el-form-item>
        <el-button type="primary">开始上传</el-button>
        <el-button>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Video',
  data () {
    return {
      courseName: this.$route.query.courseName,
      theme: this.$route.query.theme
    }
  },
  created () {
    console.log(this.$route.query)
  }
})
</script>

<style lang="scss" scoped>
.video{
  width: 500px;
  margin: 0 auto;
}
</style>
