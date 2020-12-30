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
      <el-form :model="course" :rules="rules" ref="course" label-position="right" label-width="120px">
        <div v-show="currentStep === 0">
          <!-- 基本信息 -->
          <el-form-item label="名称" prop="courseName">
            <el-input v-model="course.courseName"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="brief">
            <el-input v-model="course.brief"></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名" prop="teacherDTO.teacherName">
            <el-input v-model="course.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="teacherDTO.position">
            <el-input v-model="course.teacherDTO.position"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介" prop="teacherDTO.description">
            <el-input v-model="course.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程概述" prop="previewFirstField">
            <el-input v-model="course.previewFirstField" type="textarea" placeholder="概述1"></el-input>
          </el-form-item>
          <el-form-item prop="previewSecondField">
            <el-input v-model="course.previewSecondField" type="textarea" placeholder="概述2"></el-input>
          </el-form-item>
          <el-form-item label="课程封面" prop="courseListImg">
            <course-image v-model="course.courseListImg" />
          </el-form-item>
          <el-form-item label="介绍封面" prop="courseImgUrl">
            <course-image v-model="course.courseImgUrl" />
          </el-form-item>
          <el-form-item label="课程排序" prop="sortNum">
            <el-input-number v-model="course.sortNum"></el-input-number>
          </el-form-item>
        </div>
        <div v-show="currentStep === 1">
          <!-- 销售信息 -->
          <el-form-item label="售卖价格" prop="discounts">
            <el-input v-model.number="course.discounts">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价" prop="price">
            <el-input v-model.number="course.price">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量" prop="sales">
            <el-input v-model.number="course.sales">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签" prop="discountsTag">
            <el-input type="text" maxlength="4" show-word-limit v-model="course.discountsTag"></el-input>
          </el-form-item>
        </div>
        <div v-show="currentStep === 2">
          <!-- 秒杀活动 -->
          <el-form-item label="限时秒杀开关" prop="activityCourse">
             <el-switch
              v-model="course.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <template v-if="course.activityCourse">
            <el-form-item label="开始时间" prop="activityCourseDTO.beginTime">
              <el-date-picker
                v-model="course.activityCourseDTO.beginTime"
                type="date"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="activityCourseDTO.endTime">
              <el-date-picker
                v-model="course.activityCourseDTO.endTime"
                type="date"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价" prop="activityCourseDTO.amount">
              <el-input v-model.number="course.activityCourseDTO.amount" type="number">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存" prop="activityCourseDTO.stock">
              <el-input v-model.number="course.activityCourseDTO.stock" type="number">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <div v-show="currentStep === 3">
          <!-- 课程详情 -->
          <el-form-item label="课程详情" prop="courseDescriptionMarkDown">
            <el-input type="textarea" v-model="course.courseDescriptionMarkDown"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button v-if="currentStep < 3" @click="next">下一步</el-button>
          <el-button v-else @click="onSubmit('course')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CourseImage from './CourseImage.vue'
import { getCourseById, uploadImage, saveOrUpdateCourse } from '@/services/course'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'EditCreate',
  components: {
    CourseImage
  },
  props: {
    // isEdit: {
    //   type: Boolean,
    //   default: true
    // },
    courseId: {
      type: Number
    }
  },
  data () {
    return {
      steps: ['基本信息', '销售信息', '秒杀活动', '课程详情'],
      currentStep: 0,
      course: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0, // 0：未发布，1：已发布
        sales: 0,
        activityCourse: false, // 是否开启活动秒杀
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      },
      rules: {
        courseName: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        brief: [{ required: true, message: '请输入课程简介', trigger: 'blur' }],
        'teacherDTO.teacherName': [{ required: true, message: '请输入讲师姓名', trigger: 'blur' }],
        'teacherDTO.position': [{ required: true, message: '请输入讲师职位', trigger: 'blur' }],
        'teacherDTO.description': [{ required: true, message: '请输入讲师简介', trigger: 'blur' }],
        previewFirstField: [{ required: true, message: '请输入课程概述', trigger: 'blur' }],
        previewSecondField: [{ required: true, message: '请输入课程概述', trigger: 'blur' }],
        courseListImg: [{ required: false }],
        courseImgUrl: [{ required: false }],
        sortNum: [{ required: true, message: '请输入课程排序', trigger: 'blur' }],
        discounts: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
        price: [{ required: false }],
        sales: [{ required: false }],
        discountsTag: [{ required: false }],
        activityCourse: [{ required: false }],
        'activityCourseDTO.beginTime': [{ required: false }],
        'activityCourseDTO.endTime': [{ required: false }],
        'activityCourseDTO.amount': [{ required: false }],
        'activityCourseDTO.stock': [{ required: false }],
        courseDescriptionMarkDown: [{ required: false }]
      }
    }
  },
  created () {
    if (this.courseId) {
      // 编辑课程
      this.loadCourseById()
    }
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
    async onSubmit (formName: string) {
      try {
        await (this.$refs[formName] as Form).validate(async (v, m) => {
          if (v) {
            // 验证通过
            const { data } = await saveOrUpdateCourse(this.course)
            if (data.code === '000000') {
              console.log(data)
              this.$message.success('保存成功')
              this.$router.push('/course')
            }
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
      } catch (err) {
        this.$message.error(`提交失败：${err}`)
      }
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
