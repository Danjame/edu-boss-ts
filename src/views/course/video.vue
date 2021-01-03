<template>
  <div class="course-video">
    <el-form label-width="80px">
      <el-form-item label="课程">
        <el-input disabled :placeholder="courseName"></el-input>
      </el-form-item>
      <el-form-item label="课时">
        <el-input disabled :placeholder="theme"></el-input>
      </el-form-item>
      <el-form-item label="视频上传">
        <input type="file" ref="video-file">
        <span class="file-upload-progress">{{ uploadImgPercent == -1 ? '' : `上传进度：${uploadImgPercent}%` }}</span>
      </el-form-item>
      <el-form-item label="封面上传">
        <input type="file" ref="image-file">
        <span class="file-upload-progress">{{ uploadVideoPercent == -1 ? '' : `上传进度：${uploadVideoPercent}%` }}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleUpload">开始上传</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
      <el-form-item>
        <span>{{ transCodePercent > -1 && transCodePercent !== 100 ? `转码中：${transCodePercent}%` : '' }}</span>
        <span>{{ transCodePercent === 100 ? '转码完成' : ''}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from 'vue'
import { getVideoUploadAddressAdnAuth, getImagUploadAddressAdnAuth, getTransCode, getTransCodePercent } from '@/services/aliyun-upload'

export default Vue.extend({
  name: 'CourseVideo',
  data () {
    return {
      courseName: this.$route.query.courseName,
      lessonId: Number(this.$route.query.lessonId),
      theme: this.$route.query.theme,
      uploader: null,
      imgFileName: '',
      videoFileName: '',
      videoId: 0,
      imageURL: '',
      isUploading: false,
      uploadImgPercent: -1,
      uploadVideoPercent: -1,
      transCodePercent: -1
    }
  },
  created () {
    this.$store.commit('setBreadcrumbTitle', '课时视频上传')
    this.initUploader()
  },
  methods: {
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        // 阿里账号ID，必须有值
        userId: '1618139964448548',
        // 上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region: '',
        // 分片大小默认1 MB，不能小于100 KB
        artSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async (uploadInfo: any) => {
          this.isUploading = true
          const { file: { name } } = uploadInfo
          let uploadAddressAndAuth
          if (uploadInfo.isImage) {
            // 图片
            const { data } = await getImagUploadAddressAdnAuth()
            uploadAddressAndAuth = data.data
            this.imageURL = data.data.imageURL
          } else {
            // 视频
            const { data } = await getVideoUploadAddressAdnAuth(name, this.imageURL)
            uploadAddressAndAuth = data.data
            this.videoId = data.data.videoId
          }
          (this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            uploadAddressAndAuth.uploadAuth,
            uploadAddressAndAuth.uploadAddress,
            uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
          )
        },
        // 文件上传成功
        // onUploadSucceed (uploadInfo: any) {
        //   console.log(uploadInfo)
        // },
        // 文件上传失败
        // onUploadFailed (uploadInfo: any, code: any, message: any) {
        //   console.log(uploadInfo, code, message)
        // },
        // 文件上传进度，单位：字节
        onUploadProgress: (uploadInfo: any, totalSize: any, loadedPercent: any) => {
          console.log(uploadInfo, totalSize, loadedPercent)
          if (uploadInfo.isImage) {
            this.uploadImgPercent = Math.floor(loadedPercent * 100)
            console.log('图片进度：' + this.uploadImgPercent)
          } else {
            this.uploadVideoPercent = Math.floor(loadedPercent * 100)
            console.log('视频进度：' + this.uploadVideoPercent)
          }
        },
        // 上传凭证超时
        // onUploadTokenExpired (uploadInfo: any) {
        //   console.log(uploadInfo)
        // },
        // 全部文件上传结束
        onUploadEnd: async () => {
          this.isUploading = false
          const { data } = await getTransCode({
            lessonId: this.lessonId,
            coverImageUrl: this.imageURL,
            fileId: this.videoId,
            fileName: this.videoFileName
          })
          console.log(data)
          const timer = setInterval(async () => {
            const { data } = await getTransCodePercent(this.lessonId)
            this.transCodePercent = data.data
            if (data.data === 100) {
              clearInterval(timer)
              console.log('转码成功')
            }
          }, 1000)
        }
      })
    },
    handleUpload () {
      const image = (this.$refs['image-file'] as any).files[0]
      const video = (this.$refs['video-file'] as any).files[0]
      // 是否选择了文件
      if (!(image && video)) {
        this.$message.error('请选择需要上传的封面和视频')
        return
      }
      image.isImage = image.type.slice(0, 5) === 'image'
      video.isVideo = video.type.slice(0, 5) === 'video'
      // 校验文件格式
      if (!(image.isImage && video.isVideo)) {
        this.$message.error('请选择正确格式的视频或封面')
        return
      }
      this.imgFileName = image.name
      this.videoFileName = video.name
      const uploader = this.uploader as any
      uploader.addFile(image, null, null, null, '{"Vod":{}}')
      uploader.addFile(video, null, null, null, '{"Vod":{}}')
      uploader.startUpload()
    }
  }
})
</script>

<style lang="scss" scoped>
.video{
  width: 500px;
  margin: 0 auto;
}

.file-upload-progress{
  margin-left: 20px;
}
</style>
