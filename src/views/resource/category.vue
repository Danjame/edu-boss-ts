<template>
  <div class="category">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="handleCreate">添加</el-button>
      </div>
      <!-- 表格信息 -->
      <el-table
        :data="categories"
        style="width: 100%"
      >
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
    <!-- 编辑或添加组件 -->
    <el-dialog :title="isEdit ? '编辑分类':'添加分类'" :visible.sync="isVisible" width="40%">
      <el-form :model="form" :rules="rules" ref="form" label-width="52px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="form.sort"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="handleHide">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllCategories, saveOrUpdateCategory, deleteCategory } from '@/services/resource-category'
import { Form } from 'element-ui'

interface Item {
  id: number
}

export default Vue.extend({
  name: 'Category',
  data () {
    return {
      categories: [],
      form: {
        id: undefined,
        name: '',
        sort: null
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { type: 'number', message: '排序必须为数字' }
        ]
      },
      isVisible: false,
      isEdit: false
    }
  },
  created () {
    this.loadAllCategories()
  },
  methods: {
    async loadAllCategories () {
      const { data } = await getAllCategories()
      if (data.code === '000000') {
        this.categories = data.data
      } else {
        this.$message.error(`加载失败：${data.mesg}`)
      }
    },
    async deleteCategory (id: number) {
      const { data } = await deleteCategory(id)
      if (data.code === '000000') {
        this.$message.success('删除成功')
        // 删除后更新列表
        this.loadAllCategories()
      } else {
        this.$message.error(`删除失败：${data.mesg}`)
      }
    },
    async saveOrUpdateCategory () {
      const { data } = await saveOrUpdateCategory(this.form)
      if (data.code === '000000') {
        this.loadAllCategories()
        this.handleHide()
        this.$message.success('提交成功')
      } else {
        this.$message.error(`提交失败：${data.mesg}`)
      }
    },
    handleCreate () {
      if (this.$refs.form) {
        (this.$refs.form as Form).resetFields()
      }
      this.isEdit = false
      this.form.id = undefined
      this.isVisible = true
    },
    handleEdit (index: number, row: Item) {
      // console.log(index, row)
      const arr = this.categories.filter((item: Item) => item.id === row.id)
      this.isVisible = true
      this.isEdit = true
      // 等待初始化之后再进行赋值，避免影响 (this.$refs.form as Form).resetFields() 出错
      this.$nextTick(() => {
        // 深拷贝赋值，防止输入时响应式改变表格内容
        this.form = JSON.parse(JSON.stringify(arr[0]))
      })
    },
    handleDelete (index: number, row: Item) {
      // console.log(index, row)
      this.$confirm('确认删除？')
        .then(() => {
          this.deleteCategory(row.id)
        }).catch(err => {
          console.log('取消', err)
        })
    },
    handleHide () {
      this.isVisible = false
    },
    onSubmit (formName: string) {
      (this.$refs[formName] as Form).validate((v, m) => {
        if (v) {
          // 验证通过
          this.saveOrUpdateCategory()
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
</style>
