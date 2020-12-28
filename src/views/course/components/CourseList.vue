<template>
  <div class="course-list">

      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item label="课程名称" prop="courseName">
            <el-input v-model="form.courseName" placeholder="课程名称"></el-input>
          </el-form-item>
           <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="全部">
              <el-option label="全部"></el-option>
              <el-option label="上架" value="true"></el-option>
              <el-option label="下架" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="isLoading">查询</el-button>
            <el-button type="primary">新建课程</el-button>
          </el-form-item>
        </el-form>

      <el-card class="box-card">
      <el-table :data="courses" style="width: 100%; margin-bottom: 20px" v-loading="isLoading">
        <el-table-column prop="id" label="ID" width="100" align="center" />
        <el-table-column prop="courseName" label="课程名称" width="180" align="center" />
        <el-table-column prop="price" label="价格" align="center" />
        <el-table-column prop="sortNum" label="排序" align="center" />
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" align="center">
          <template slot-scope="">
            <el-button
              size="mini"
             >编辑</el-button>
            <el-button
              size="mini"
              >内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.currentPage"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :disabled="isLoading">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getCourses } from '@/services/course'

export default Vue.extend({
  name: 'CourseList',
  data () {
    return {
      form: {
        currentPage: 1,
        pageSize: 10,
        courseName: '',
        status: null
      },
      courses: [],
      total: 0,
      isLoading: false
    }
  },
  created () {
    this.loadCourses()
  },
  methods: {
    async loadCourses () {
      this.isLoading = true
      const { data } = await getCourses(this.form)
      if (data.code === '000000') {
        this.courses = data.data.records
        this.total = data.data.total
      } else {
        this.$message.error(`禁用失败：${data.mesg}`)
      }
      this.isLoading = false
    },
    handleSizeChange (size: number) {
      // console.log(`每页 ${size} 条`)
      this.form.pageSize = size
      this.form.currentPage = 1
      this.loadCourses()
    },
    handleCurrentChange (current: number) {
      // console.log(`当前页: ${current}`)
      this.form.currentPage = current
      this.loadCourses()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
