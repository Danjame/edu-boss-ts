<template>
  <div class="edit-create">
    <el-dialog :title="isEdit ? '编辑角色':'添加角色'" :visible.sync="isVisible" width="40%">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="form.code"></el-input>
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
import { getRoleById, saveOrUpdateRole } from '@/services/role'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'EditCreate',
  data () {
    return {
      form: {
        id: undefined,
        code: '',
        name: '',
        description: ''
      },
      rules: {
        code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      },
      isVisible: false,
      isEdit: false
    }
  },
  created () {
    EventBus.$on('editCreate', (id: number) => {
      if (id) {
        // 打开编辑组件
        this.isEdit = true
        this.loadRoleById(id)
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
    handleHide () {
      this.isVisible = false
    },
    async loadRoleById (id: number) {
      const { data } = await getRoleById(id)
      if (data.code === '000000') {
        this.form = data.data
      } else {
        this.$message.error(`角色id加载失败：${data.mesg}`)
      }
    },
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        const { data } = await saveOrUpdateRole(this.form)
        if (data.code === '000000') {
          // 编辑更新完毕刷新列表
          EventBus.$emit('updateRoleList')
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
