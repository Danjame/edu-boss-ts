<template>
  <div class="user-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" ref="form" label-position="top" class="demo-form-inline">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="dateRange">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('form')" :disabled="isLoading">重置</el-button>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="users" style="width: 100%; margin-bottom: 20px" v-loading="isLoading">
        <el-table-column prop="id" label="用户ID" width="100" align="center" />
        <el-table-column prop="portrait" label="头像" width="180" align="center">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.portrait || circleUrl" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" align="center" />
        <el-table-column prop="phone" label="手机号" align="center" />
        <el-table-column prop="createTime" label="注册时间" align="center" />
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status==='ENABLE'" class="status status-success">
            </div>
            <div v-else class="status status-danger">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status==='ENABLE'"
              size="mini"
              type="text"
              @click="handleForbid(scope.$index, scope.row)">禁用</el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleAllocate(scope.$index, scope.row)">分配角色</el-button>
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
import EventBus from '@/eventbus/eventbus'
import { getUserPages, forbidUser } from '@/services/user'
import { DatePicker, Form } from 'element-ui'

interface Item {
  id: number
}

export default Vue.extend({
  name: 'UserList',
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker: DatePicker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker: DatePicker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker: DatePicker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      form: {
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        currentPage: 1,
        pageSize: 10
      },
      dateRange: [],
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      users: [],
      total: 0,
      roles: [],
      isLoading: false,
      userId: null
    }
  },
  created () {
    // 编辑更新完毕刷新列表
    EventBus.$on('updateUserList', () => {
      this.loadUserPages()
    })
    this.loadUserPages()
  },
  methods: {
    async loadUserPages () {
      this.isLoading = true
      if (this.dateRange && this.dateRange.length) {
        this.form.startCreateTime = this.dateRange[0]
        this.form.endCreateTime = this.dateRange[1]
      } else {
        this.form.startCreateTime = ''
        this.form.endCreateTime = ''
      }
      const { data } = await getUserPages(this.form)
      if (data.code === '000000') {
        this.users = data.data.records
        this.total = data.data.total
      } else {
        this.$message.error(`用户信息加载失败：${data.mesg}`)
      }
      this.isLoading = false
    },
    async handleForbid (index: number, row: Item) {
      // console.log(index, row)
      const { data } = await forbidUser(row.id)
      if (data.code === '000000') {
        this.$message.success('禁用成功')
        // 禁用之后重新加载列表
        this.loadUserPages()
      } else {
        this.$message.error(`禁用失败：${data.mesg}`)
      }
    },
    handleAllocate (index: number, row: Item) {
      // console.log(index, row)
      EventBus.$emit('allocateRole', row.id)
    },
    onSubmit () {
      this.form.currentPage = 1
      this.loadUserPages()
    },
    resetForm (form: string) {
      (this.$refs[form] as Form).resetFields()
      this.form.currentPage = 1
      this.dateRange = []
      this.loadUserPages()
    },
    handleSizeChange (size: number) {
      // console.log(`每页 ${size} 条`)
      this.form.pageSize = size
      this.form.currentPage = 1
      this.loadUserPages()
    },
    handleCurrentChange (current: number) {
      // console.log(`当前页: ${current}`)
      this.form.currentPage = current
      this.loadUserPages()
    }
  }
})
</script>

<style lang="scss" scoped>
.status{
  display: inline-block;
  width: .875rem;
  height: .875rem;
  vertical-align: middle;
  border-radius: 50%;
}
</style>
