<template>
  <div class="edit-create">
    <el-dialog :title="form.id ? '编辑资源':'添加资源'" :visible.sync="isVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="资源名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url" :label-width="formLabelWidth">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
          <el-form-item label="资源分类" prop="categoryId" :label-width="formLabelWidth">
            <el-select v-model="form.categoryId" placeholder="请选择资源分类">
              <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
         <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.description"></el-input>
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
import EventBus from '@/eventbus/eventbus'
import { getAllCategories, getEditResourceInfo, saveOrUpdateResource } from '@/services/resource'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'EditCreate',
  data () {
    return {
      form: {
        id: 0,
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
      isEdit: false,
      formLabelWidth: '120px'
    }
  },
  created () {
    this.loadAllCategory()
    // 打开关闭编辑添加组件
    EventBus.$on('editCreate', (data: number) => {
      if (data) {
        this.form.id = data
        this.loadEditResourceInfo()
      }
      this.isVisible = true
    })
  },
  watch: {
    // 当关闭编辑添加组件，还原表单
    isVisible: function () {
      if (!this.isVisible) {
        (this.$refs.form as Form).resetFields()
        this.form.id = 0
      }
    }
  },
  methods: {
    async loadAllCategory () {
      const { data } = await getAllCategories()
      if (data.code === '000000') {
        this.category = data.data
      }
    },
    async loadEditResourceInfo () {
      if (this.form.id) {
        try {
          const { data } = await getEditResourceInfo(this.form.id)
          if (data.code === '000000') {
            this.form = data.data
          }
        } catch (err) {
          this.$message.error(`加载失败：${err}`)
        }
      }
    },
    handleHide () {
      this.isVisible = false
    },
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        let params
        if (!this.form.id) {
          // 添加资源不传id
          const { name, url, categoryId, description } = this.form
          params = { name, url, categoryId, description }
        } else {
          // 编辑资源传id
          params = this.form
        }
        const { data } = await saveOrUpdateResource(params)
        switch (data.code) {
          case '000000':
            // 编辑更新完毕刷新列表
            EventBus.$emit('updateResourceList')
            this.handleHide()
            break
          case '10000':
            this.$message.error(`提交失败：${data.mesg}`)
            break
        }
      } catch (err) {
        console.log(err)
        this.$message.error(`提交失败：${err}`)
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
