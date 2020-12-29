<template>
  <div class="edit-create">

    <el-card>
      <div slot="header" class="clearfix">
        <el-steps :active="currentStep" finish-status="success">
          <el-step
            v-for="(step, index) in steps"
            :key="index"
            :title="step"
            @click.native="currentStep=index"></el-step>
        </el-steps>
      </div>
      <el-form label-position="right" label-width="120px">
        <div v-show="currentStep === 0">
          <!-- 基本信息 -->
          <el-form-item label="名称">
            <el-input v-model="course.courseName"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="course.brief"></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="course.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="course.teacherDTO.position"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="course.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input
              style="margin-bottom: 10px"
              v-model="course.previewFirstField"
              type="textarea"
              placeholder="概述1"
            ></el-input>
            <el-input
              v-model="course.previewSecondField"
              type="textarea"
              placeholder="概述2"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程封面">
           <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="解锁封面">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number
              v-model="course.sortNum"
            ></el-input-number>
          </el-form-item>
        </div>
        <div v-show="currentStep === 1">
          <!-- 销售信息 -->
          销售信息
        </div>
        <div v-show="currentStep === 2">
          <!-- 秒杀活动 -->
          秒杀活动
        </div>
        <div v-show="currentStep === 3">
          <!-- 课程详情 -->
          课程详情
        </div>
        <el-form-item>
          <el-button @click="next">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getCourseById } from '@/services/course'

export default Vue.extend({
  name: 'EditCreate',
  props: {
    isEdit: {
      type: Boolean,
      default: true
    },
    courseId: {
      type: Number
    }
  },
  data () {
    return {
      steps: ['基本信息', '销售信息', '秒杀活动', '课程详情'],
      currentStep: 0,
      course: '',
      imageUrl: ''
    }
  },
  created () {
    this.loadCourseById()
  },
  methods: {
    async loadCourseById () {
      const { data } = await getCourseById(this.courseId)
      if (data.code === '000000') {
        this.course = data.data
      } else {
        this.$message.error(`课程信息加载失败：${data.mesg}`)
      }
    },
    next () {
      if (this.currentStep++ > 3) this.currentStep = 0
    },
    handleAvatarSuccess (res: any, file: any) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        // this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
})
</script>

<style lang="scss" scoped>
.el-step{
  cursor: pointer
}

::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

::v-deep .avatar-uploader .el-upload:hover {
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
