<template>
  <div class="edit-create">
    <el-dialog :title="form.id ? '编辑角色':'添加角色'" :visible.sync="isVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="角色名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code" :label-width="formLabelWidth">
          <el-input v-model="form.code"></el-input>
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
import { getRoleById, saveOrUpdateRole } from '@/services/role'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'EditCreate',
  data () {
    return {
      form: {
        id: 0,
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
      isEdit: false,
      formLabelWidth: '120px'
    }
  },
  created () {
    // 打开关闭编辑添加组件
    EventBus.$on('editCreate', (id: number) => {
      this.isVisible = true
      if (id) {
        this.loadRoleById(id)
      }
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
        let params
        if (!this.form.id) {
          // 添加资源不传id
          const { code, name, description } = this.form
          params = { code, name, description }
        } else {
          // 编辑资源传id
          params = this.form
        }
        const { data } = await saveOrUpdateRole(params)
        switch (data.code) {
          case '000000':
            // 编辑更新完毕刷新列表
            EventBus.$emit('updateRoleList')
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
