<template>
  <div class="course-section">
    <el-card>
      <div slot="header" class="header">
        <span>课程：{{ courseName }}</span>
        <el-button type="primary" icon="el-icon-plus" @click="isSectionVisible = true">添加章节</el-button>
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
            <el-button @click.stop="isSectionVisible = true">编辑</el-button>
            <el-button type="primary" @click="isLessonVisible = true">添加课时</el-button>
            <el-button>状态</el-button>
          </span>
          <!-- 课时 -->
          <span v-else class="actions">
            <el-button @click="isLessonVisible = true">编辑</el-button>
            <el-button type="success">上传视频</el-button>
            <el-button>状态</el-button>
          </span>
        </div>
      </el-tree>
      <!-- 编辑添加阶段 -->
      <el-dialog title="章节信息" :visible.sync="isSectionVisible" width="40%">
        <el-form :model="section" label-width="80px">
          <el-form-item label="课程名称">
            <el-input disabled :placeholder="courseName"></el-input>
          </el-form-item>
          <el-form-item label="章节名称">
            <el-input v-model="section.sectionName"></el-input>
          </el-form-item>
          <el-form-item label="章节描述">
            <el-input v-model="section.description"></el-input>
          </el-form-item>
          <el-form-item label="章节排序">
            <el-input v-model.number="section.orderNum">
              <template slot="append">数字控制排序，数字越大越靠后</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isSectionVisible = false">取 消</el-button>
          <el-button type="primary" @click="isSectionVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑添加课时 -->
      <el-dialog title="课时信息" :visible.sync="isLessonVisible" width="40%">
        <el-form :model="lesson" label-width="80px">
          <el-form-item label="课程名称">
            <el-input disabled :placeholder="courseName"></el-input>
          </el-form-item>
          <el-form-item label="章节名称">
            <el-input disabled :placeholder="section.sectionName"></el-input>
          </el-form-item>
          <el-form-item label="课时名称">
            <el-input v-model="lesson.theme"></el-input>
          </el-form-item>
          <el-form-item label="时长">
            <el-input v-model.number="lesson.duration">
              <template slot="append">分钟</template>
            </el-input>
          </el-form-item>
          <el-form-item label="是否开放试听">
            <el-switch
              v-model="lesson.isFree"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model.number="lesson.orderNum">
              <template slot="append">数字控制排序，数字越大越靠后</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isLessonVisible = false">取 消</el-button>
          <el-button type="primary" @click="isLessonVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getSectionLesson, saveOrUpdateSection } from '@/services/course-section'
import { saveOrUpdateLesson } from '@/services/course-lesson'

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
        id: 0,
        courseId: 0,
        courseName: '',
        sectionName: '',
        description: '',
        orderNum: 0,
        status: 0
      },
      // 课时
      isLessonVisible: false,
      lesson: {
        id: 0,
        courseId: 0,
        sectionId: 0,
        theme: '',
        duration: 0,
        isFree: false,
        orderNum: 0,
        status: 0
      }
    }
  },
  created () {
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
</style>
