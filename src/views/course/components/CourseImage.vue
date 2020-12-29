<template>
  <div class="course-image">
    <el-progress
      v-if="isUploading"
      type="circle"
      :percentage="percentage"
      :status="percentage === 100 ? 'success' : undefined"
      :width="178"
      />
    <el-upload
      v-else
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="handleUpload">
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { uploadImage } from '@/services/course'

export default Vue.extend({
  name: 'CourseImage',
  props: {
    value: {
      type: String
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      percentage: 0,
      isUploading: false
    }
  },
  methods: {
    beforeAvatarUpload (file: any) {
      // const isJPG = file.type === 'image/jpeg'
      // const isPNG = file.type === 'image/png'
      const isLtl = file.size / 1024 / 1024 < this.limit
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLtl) {
        this.$message.error(`上传头像图片大小不能超过 ${this.limit}MB!`)
      }
      return isLtl
    },
    async handleUpload (options: any) {
      this.isUploading = true
      const fd = new FormData()
      fd.append('file', options.file)
      const { data } = await uploadImage(fd, e => {
        this.percentage = Math.floor(e.loaded / e.total * 100)
      })
      if (data.code === '000000') {
        this.isUploading = false
        this.percentage = 0
        this.$emit('input', data.data.name)
        this.$message.success('上传成功')
      } else {
        this.$message.error(`上传失败：${data.mesg}`)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
