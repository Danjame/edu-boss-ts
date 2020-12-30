<template>
  <div class="edit-create">
    <el-dialog :title="isEdit ? '编辑资源':'添加资源'" :visible.sync="isVisible" width="40%">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="form.categoryId" placeholder="请选择资源分类">
              <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
         <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="handleHide">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EventBus from '@/eventbus/eventbus'
import { getAllCategories, getEditResourceInfo, saveOrUpdateResource } from '@/services/resource'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'EditCreate',
  data () {
    return {
      form: {
        id: undefined,
        name: '',
        url: '',
        categoryId: null,
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
        url: [{ required: true, message: '请选择资源路径', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择资源分类', trigger: 'blur' }],
        description: [{ required: true, message: '请输入资源描述', trigger: 'blur' }]
      },
      category: [],
      isVisible: false,
      isEdit: false
    }
  },
  created () {
    this.loadAllCategories()
    EventBus.$on('editCreate', (id: number) => {
      if (id) {
        // 打开编辑组件
        this.isEdit = true
        this.loadEditResourceInfo(id)
      } else if (this.$refs.form) {
        // 打开添加组件
        (this.$refs.form as Form).resetFields()
        this.isEdit = false
        this.form.id = undefined
      }
      this.isVisible = true
    })
  },
  methods: {
    async loadAllCategories () {
      const { data } = await getAllCategories()
      if (data.code === '000000') {
        this.category = data.data
      } else {
        this.$message.error(`资源分类加载失败：${data.mesg}`)
      }
    },
    async loadEditResourceInfo (id: number) {
      const { data } = await getEditResourceInfo(id)
      if (data.code === '000000') {
        this.form = data.data
      } else {
        this.$message.error(`加载失败：${data.err}`)
      }
    },
    handleHide () {
      this.isVisible = false
    },
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        const { data } = await saveOrUpdateResource(this.form)
        if (data.code === '000000') {
          EventBus.$emit('updateResourceList')
          this.handleHide()
          this.$message.success('提交成功')
        } else {
          this.$message.error(`提交失败：${data.mesg}`)
        }
      } catch (err) {
        this.$message.error(`提交失败：${err}`)
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
