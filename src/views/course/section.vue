<template>
  <div class="course-section">
    <el-card style="min-width: 800px">
      <div slot="header" class="header">
        <el-button type="text" icon="el-icon-back" @click="$router.push('/course')">返回</el-button>
        <span>课程：{{ courseName }}</span>
        <el-button type="primary" icon="el-icon-plus" @click="handleEditCreateSection">添加章节</el-button>
      </div>
      <!-- 章节和课时列表 -->
      <el-tree
        :data="sections"
        :props="defaultProps"
        draggable
        :allow-drop="handleAllowDrop"
        @node-drop="handleSort"
        v-loading="isLoading"
      >
        <div slot-scope="{ node, data }" class="row">
          <span>{{ node.label }}</span>
          <!-- 章节 -->
          <span v-if="data.sectionName" class="actions">
            <el-button @click.stop="handleEditCreateSection(data)">编辑</el-button>
            <el-button type="primary" @click.stop="handleEditCreateLesson(data)">添加课时</el-button>
            <el-select
              class="select-status"
              v-model="data.status"
              placeholder="请选择"
              @change="handleSectionStatusChange(data)"
            >
              <el-option label="已隐藏" :value="0" />
              <el-option label="待更新" :value="1" />
              <el-option label="已发布" :value="2" />
            </el-select>
          </span>
          <!-- 课时 -->
          <span v-else class="actions">
            <el-button @click.stop="handleEditCreateLesson(data)">编辑</el-button>
            <el-button type="success" @click="$router.push({name: 'course-video', query: {courseName, lessonId: data.id, theme: data.theme}})">上传视频</el-button>
            <el-select
              class="select-status"
              v-model="data.status"
              placeholder="请选择"
              @change="handleLessonStatusChange(data)"
            >
              <el-option label="已隐藏" :value="0" />
              <el-option label="未发布" :value="1" />
              <el-option label="已发布" :value="2" />
            </el-select>
          </span>
        </div>
      </el-tree>
      <!-- 编辑添加阶段 -->
      <el-dialog title="章节信息" :visible.sync="isSectionVisible">
        <el-form :model="section" :rules="sectionRules" ref="sectionForm" label-width="80px">
          <el-form-item label="课程名称">
            <el-input disabled :placeholder="courseName"></el-input>
          </el-form-item>
          <el-form-item label="章节名称" prop="sectionName">
            <el-input v-model="section.sectionName"></el-input>
          </el-form-item>
          <el-form-item label="章节描述" prop="description">
            <el-input v-model="section.description"></el-input>
          </el-form-item>
          <el-form-item label="章节排序" prop="orderNum">
            <el-input v-model.number="section.orderNum">
              <template slot="append">数字控制排序，数字越大越靠后</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isSectionVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmitSection('sectionForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑添加课时 -->
      <el-dialog title="课时信息" :visible.sync="isLessonVisible">
        <el-form :model="lesson" :rules="lessonRules" ref="lessonForm" label-width="80px">
          <el-form-item label="课程名称">
            <el-input disabled :placeholder="courseName"></el-input>
          </el-form-item>
          <el-form-item label="章节名称">
            <el-input disabled :placeholder="lesson.sectionName"></el-input>
          </el-form-item>
          <el-form-item label="课时名称" prop="theme">
            <el-input v-model="lesson.theme"></el-input>
          </el-form-item>
          <el-form-item label="时长" prop="duration">
            <el-input v-model.number="lesson.duration">
              <template slot="append">分钟</template>
            </el-input>
          </el-form-item>
          <el-form-item label="是否开放试听" prop="isFree">
            <el-switch
              v-model="lesson.isFree"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="排序" prop="orderNum">
            <el-input v-model.number="lesson.orderNum">
              <template slot="append">数字控制排序，数字越大越靠后</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isLessonVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmitLesson('lessonForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getSectionLesson, getSectionById, saveOrUpdateSection } from '@/services/course-section'
import { getLessonById, saveOrUpdateLesson } from '@/services/course-lesson'
import { Form } from 'element-ui'

interface Section{
  id?: number
  courseId: number
  sectionName: string
  description: string
  orderNum: number
  status: number
}

interface Lesson{
  id?: number
  courseId: number
  sectionId: number
  sectionName: string
  theme: string
  duration: number
  isFree: boolean
  orderNum: number
  status: number
}

export default Vue.extend({
  name: 'CourseSection',
  data () {
    return {
      courseId: Number(this.$route.query.courseId),
      courseName: this.$route.query.courseName,
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label (data: any) {
          return data.sectionName || data.theme
        }
      },
      isLoading: false,
      // 章节
      isSectionVisible: false,
      section: {
        // id: 0,
        courseId: 0,
        // courseName: '',
        sectionName: '',
        description: '',
        orderNum: 0,
        status: 0 // 0-隐藏，1-待更新，2-已发布
      },
      sectionRules: {
        courseName: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        sectionName: [{ required: true, message: '请输入章节名称', trigger: 'blur' }]
      },
      // 课时
      isLessonVisible: false,
      lesson: {
        // id: 0,
        courseId: 0,
        sectionId: 0,
        sectionName: '',
        theme: '',
        duration: 0,
        isFree: false,
        orderNum: 0,
        status: 0 // 0-隐藏，1-未发布，2-已发布
      },
      lessonRules: {
        theme: [{ required: true, message: '请输入课时名称', trigger: 'blur' }],
        duration: [{ required: true, message: '请输入时长', trigger: 'blur' }],
        isFree: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  created () {
    this.$store.commit('setBreadcrumbTitle', '课程内容管理')
    this.loadSectionLesson()
  },
  methods: {
    async loadSectionLesson () {
      const { data } = await getSectionLesson(this.courseId)
      if (data.code === '000000') {
        this.sections = data.data
      } else {
        this.$message.error(`加载章节失败：${data.mesg}`)
      }
    },
    handleAllowDrop (draggingNode: any, dropNode: any, type: any) {
      return draggingNode.data.sectionId === dropNode.data.sectionId && type !== 'inner'
    },
    async handleSort (dragNode: any, dropNode: any, type: any, event: any) {
      this.isLoading = true
      try {
        await Promise.all(dropNode.parent.childNodes.map((item: any, index: any) => {
          if (dragNode.data.lessonDTOS) {
            // 拖动阶段
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index + 1
            })
          } else {
            // 拖动课时
            return saveOrUpdateLesson({
              id: item.data.id,
              orderNum: index + 1
            })
          }
        }))
        this.$message.success('排序成功')
      } catch (err) {
        this.$message.error(`排序失败：${err}`)
      }
      this.isLoading = false
    },
    async loadSectionById (sectionId: number) {
      const { data } = await getSectionById(sectionId)
      if (data.code === '000000') {
        this.section = data.data
        console.log('加载成功')
      } else {
        this.$message.error(`加载章节信息失败：${data.mesg}`)
      }
    },
    async loadLessonById (lessonId: number) {
      const { data } = await getLessonById(lessonId)
      if (data.code === '000000') {
        this.lesson = data.data
        console.log('加载成功')
      } else {
        this.$message.error(`加载课时信息失败：${data.mesg}`)
      }
    },
    async saveOrUpdateSection (section: Section) {
      const { data } = await saveOrUpdateSection(section)
      if (data.code === '000000') {
        this.$message.success('保存成功')
        this.isSectionVisible = false
        this.loadSectionLesson()
      } else {
        this.$message.error(`保存失败：${data.mesg}`)
      }
    },
    async saveOrUpdateLesson (lesson: Lesson) {
      const { data } = await saveOrUpdateLesson(lesson)
      if (data.code === '000000') {
        this.$message.success('保存成功')
        this.isLessonVisible = false
        this.loadSectionLesson()
      } else {
        this.$message.error(`保存失败：${data.mesg}`)
      }
    },
    handleEditCreateSection (data: any) {
      this.isSectionVisible = true
      if (data.courseId) {
        // 编辑章节
        this.loadSectionById(data.id)
      } else {
        // 添加章节
        this.section = {
          // id: 0,
          courseId: this.courseId,
          // courseName: '',
          sectionName: '',
          description: '',
          orderNum: 0,
          status: 0
        }
      }
    },
    handleEditCreateLesson (data: any) {
      this.isLessonVisible = true
      if (data.theme) {
        // 编辑课时
        this.loadLessonById(data.id)
      } else {
        // 添加课时
        this.lesson = {
          // id: 0,
          courseId: this.courseId,
          sectionId: data.id,
          sectionName: data.sectionName,
          theme: '',
          duration: 0,
          isFree: false,
          orderNum: 0,
          status: 0
        }
      }
    },
    handleSectionStatusChange (data: any) {
      this.saveOrUpdateSection(data)
    },
    handleLessonStatusChange (data: any) {
      this.saveOrUpdateLesson(data)
    },
    handleSubmitSection (formName: string) {
      (this.$refs[formName] as Form).validate((v, m) => {
        if (v) {
          // 验证通过
          this.saveOrUpdateSection(this.section)
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
    },
    handleSubmitLesson (formName: string) {
      (this.$refs[formName] as Form).validate((v, m) => {
        if (v) {
          // 验证通过
          this.saveOrUpdateLesson(this.lesson)
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
.row {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}

::v-deep .el-tree-node__content {
  height: auto;
}

.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

::v-deep .el-dialog{
  min-width: 400px;
}

.select-status{
  width: 100px;
  margin-left: 10px;
}
</style>
