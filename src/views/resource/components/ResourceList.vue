<template>
  <div class="resource">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="form.url" placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="form.categoryId" placeholder="全部">
              <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('form')" :disabled="isLoading">重置</el-button>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="box-card-btns">
          <el-button @click="handleCreate">添加</el-button>
          <el-button @click="$router.push({name: 'resource-category'})">资源分类</el-button>
        </div>
      </div>
      <el-table :data="resource" style="width: 100%; margin-bottom: 20px" v-loading="isLoading">
        <el-table-column prop="id" label="编号" width="100" align="center" />
        <el-table-column prop="name" label="资源名称" width="180" align="center" />
        <el-table-column prop="url" label="资源路径" align="center" />
        <el-table-column prop="description" label="描述" align="center" />
        <el-table-column prop="createdTime" label="添加时间" align="center" />
        <el-table-column label="操作" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="form.size"
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
import { getAllCategories, getResourcePages, deleteResource } from '@/services/resource'
import { Form } from 'element-ui'

interface Item {
  id: number
}

export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      form: {
        name: '',
        url: '',
        categoryId: null,
        current: 1,
        size: 10
      },
      total: 0,
      resource: [],
      categories: [],
      isLoading: false
    }
  },
  created () {
    // 编辑更新完毕刷新列表
    EventBus.$on('updateResourceList', () => {
      this.loadAllResource()
    })
    this.loadAllResource()
    this.loadAllCategory()
  },
  methods: {
    async loadAllResource () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.resource = data.data.records
        this.total = data.data.total
      } else {
        this.$message.error(`资源加载失败：${data.mesg}`)
      }
      this.isLoading = false
    },
    async loadAllCategory () {
      const { data } = await getAllCategories()
      if (data.code === '000000') {
        this.categories = data.data
      } else {
        this.$message.error(`分类加载失败：${data.mesg}`)
      }
    },
    async deleteResource (id: number) {
      const { data } = await deleteResource(id)
      switch (data.code) {
        case '000000':
          // 删除后更新列表
          this.loadAllResource()
          break
        case '10000':
          this.$message.error(`删除失败：${data.mesg}`)
          break
      }
    },
    handleEdit (index: number, row: Item) {
      // console.log(index, row)
      EventBus.$emit('editCreate', row.id)
    },
    handleDelete (index: number, row: Item) {
      // console.log(index, row)
      this.$confirm('确定删除？').then(() => {
        this.deleteResource(row.id)
      }).catch(err => {
        console.log('已取消', err)
      })
    },
    handleCreate () {
      EventBus.$emit('editCreate')
    },
    onSubmit () {
      this.form.current = 1
      this.loadAllResource()
    },
    resetForm (form: string) {
      (this.$refs[form] as Form).resetFields()
      this.form.current = 1
      this.loadAllResource()
    },
    handleSizeChange (size: number) {
      // console.log(`每页 ${size} 条`)
      this.form.size = size
      this.form.current = 1
      this.loadAllResource()
    },
    handleCurrentChange (current: number) {
      // console.log(`当前页: ${current}`)
      this.form.current = current
      this.loadAllResource()
    }
  }
})
</script>

<style lang="scss" scoped>
.box-card-btns{
  border-top: 1px solid #EBEEF5;
  padding-top: 18px;
}
</style>
