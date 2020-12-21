<template>
  <div class="category">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="handleCreate">添加</el-button>
      </div>
      <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column prop="id" label="编号" width="100" align="center" />
        <el-table-column prop="name" label="名称" width="180" align="center" />
        <el-table-column prop="createdTime" label="创建时间" align="center" />
        <el-table-column prop="sort" label="排序" align="center" />
        <el-table-column
          label="操作"
          min-width="150"
          align="center"
        >
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
    </el-card>
    <el-dialog :title="form.id ? '编辑资源':'添加资源'" :visible.sync="isVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort" :label-width="formLabelWidth">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleHide">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllGategories, saveOrUpdateCategories } from '@/services/resource'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'Category',
  data () {
    return {
      tableData: [],
      form: {
        id: 0,
        name: '',
        sort: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }]
      },
      isVisible: false,
      formLabelWidth: '120px'
    }
  },
  created () {
    this.loadAllGategories()
  },
  methods: {
    async loadAllGategories () {
      const { data } = await getAllGategories()
      if (data.code === '000000') {
        this.tableData = data.data
      } else {
        this.$message.error(`加载失败：${data.mesg}`)
      }
    },
    handleCreate () {
      this.isVisible = true
    },
    async handleEdit (index: number, row: any) {
      // console.log(index, row)
      this.isVisible = true
      const { data } = await getAllGategories(row.id)
      console.log(data)
    },
    handleDelete (index: number, row: any) {
      // this.$confirm('确认删除？')
      // .then(async () => {
      //   const { data } = await deleteMenu(row.id)
      //   if (data.code === '000000') {
      //     this.$message.success('删除成功')
      //     this.loadAll()
      //   } else {
      //     this.$message.error(`删除失败：${data.mesg}`)
      //   }
      // }).catch(err => {
      //   console.log('取消', err)
      // })
    },
    handleHide () {
      this.isVisible = false
    },
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
      //   let params
      //   if (this.form.id) {
      //     // 编辑资源传id
      //     params = this.form
      //   } else {
      //     // 添加资源不传id
      //     const { name, url, categoryId, description } = this.form
      //     params = { name, url, categoryId, description }
      //   }
      //   const { data } = await saveOrUpdate(params)
      //   switch (data.code) {
      //     case '000000':
      //       // 编辑更新完毕刷新列表
      //       EventBus.$emit('updateList')
      //       this.handleHide()
      //       break
      //     case '10000':
      //       this.$message.error(`提交失败：${data.mesg}`)
      //       break
      //   }
      } catch (err) {
        console.log(err)
        this.$message.error(`提交失败：${err}`)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
