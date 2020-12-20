<template>
  <div class="edit-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{isEdit? '编辑菜单' : '添加菜单'}}</span>
      </div>
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="href">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option
              v-for="item in parentMenuList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标" prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="shown">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number
            v-model="form.orderNum"
            :min="1"
            :max="5"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { saveOrUpdate, getEditMenuInfo } from '@/services/menu'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'EditCreate',
  props: {
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {
        name: '',
        href: '',
        parentId: -1,
        description: '',
        icon: '',
        shown: false,
        orderNum: null
      },
      rules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        href: [{ required: false, message: '请输入菜单路径', trigger: 'blur' }],
        parentId: [{ required: false, message: '请选择上级菜单', trigger: 'blur' }],
        description: [{ required: true, message: '请选择上级菜单', trigger: 'blur' }],
        icon: [{ required: true, message: '请选择上级菜单', trigger: 'blur' }],
        shown: [{ required: false, message: '请选择上级菜单', trigger: 'blur' }],
        orderNum: [{ required: false, message: '请选择排序号码', trigger: 'blur' }]
      },
      parentMenuList: []
    }
  },
  created () {
    this.loadEditMenuInfo()
  },
  methods: {
    async loadEditMenuInfo () {
      const { data } = this.$route.query.id ? await getEditMenuInfo(this.$route.query.id) : await getEditMenuInfo()
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
      }
      if (data.data.menuInfo) {
        this.form = data.data.menuInfo
      }
    },
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        const { data } = await saveOrUpdate(this.form)
        if (data.code === '000000') {
          this.$message.success('提交成功')
          this.$router.back()
        }
      } catch (err) {
        console.log('提交失败', err)
      }
    },
    resetForm (form: string) {
      (this.$refs[form] as Form).resetFields()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
