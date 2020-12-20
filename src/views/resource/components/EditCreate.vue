<template>
  <div class="edit-create">
    <el-dialog :title="itemId?'编辑资源':'添加资源'" :visible.sync="isVisible">
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
import { getAllGategory, getEditResourceInfo, saveOrUpdate } from '@/services/resource'

export default Vue.extend({
  name: 'EditCreate',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    itemId: {
      type: Number
    }
  },
  data () {
    return {
      form: {
        name: '',
        url: '',
        categoryId: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请选择资源分类', trigger: 'blur' }],
        url: [{ required: true, message: '请选择资源分类', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择资源分类', trigger: 'blur' }],
        description: [{ required: true, message: '请选择资源分类', trigger: 'blur' }]
      },
      formLabelWidth: '120px',
      category: []
    }
  },
  created () {
    console.log(this.itemId)
    this.loadAllGategory()
    this.loadEditResourceInfo()
  },
  methods: {
    async loadAllGategory () {
      const { data } = await getAllGategory()
      if (data.code === '000000') {
        this.category = data.data
      }
    },
    async loadEditResourceInfo () {
      if (this.itemId) {
        const { data } = await getEditResourceInfo(this.itemId)
        console.log(data)
      }
    },
    handleHide () {
      this.$emit('hideEditCreate', false)
    },
    async onSubmit () {
      if (this.itemId) {
        // this.form.itemId
      }
      const { data } = await saveOrUpdate(this.form)
      console.log(data)
      this.handleHide()
    }
  }
})
</script>

<style lang="scss" scoped></style>
