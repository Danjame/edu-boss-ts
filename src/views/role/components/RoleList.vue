<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item label="输入搜索" prop="name">
            <el-input v-model="form.name" placeholder="角色名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('form')" :disabled="isLoading">重置</el-button>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="box-card-btn">
          <el-button @click="handleCreate">添加角色</el-button>
        </div>
      </div>
      <el-table :data="roles" style="width: 100%; margin-bottom: 20px" v-loading="isLoading">
        <el-table-column prop="code" label="编号" width="100" align="center" />
        <el-table-column prop="name" label="角色名称" width="180" align="center" />
        <el-table-column prop="description" label="描述" align="center" />
        <el-table-column prop="createdTime" label="添加时间" align="center" />
        <el-table-column label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <div>
              <el-button
              type="text"
              size="small"
              @click="$router.push({name: 'alloc-menu', query: { roleId: scope.row.id } })">分配菜单</el-button>
              <el-button
              type="text"
              size="small"
              @click="$router.push({name: 'alloc-resource', query: { roleId: scope.row.id } })">分配资源</el-button>
            </div>
            <div>
              <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EventBus from '@/eventbus/eventbus'
import { getAllRoles, getRolePages, deleteRole } from '@/services/role'
import { Form } from 'element-ui'

interface Item {
  id: number
}

export default Vue.extend({
  name: 'RoleList',
  data () {
    return {
      form: {
        name: '',
        current: 1,
        size: 10
      },
      roles: [],
      isLoading: false
    }
  },
  created () {
    // 编辑更新完毕刷新列表
    EventBus.$on('updateRoleList', () => {
      this.loadAllRoles()
    })
    this.loadAllRoles()
  },
  methods: {
    async loadAllRoles () {
      this.isLoading = true
      const { data } = await getAllRoles()
      if (data.code === '000000') {
        this.roles = data.data
      } else {
        this.$message.error(`加载失败：${data.mesg}`)
      }
      this.isLoading = false
    },
    async loadRolePages () {
      const { data } = await getRolePages(this.form)
      if (data.code === '000000') {
        this.roles = data.data.records
      } else {
        this.$message.error(`加载失败：${data.mesg}`)
      }
    },
    async deleteRole (id: number) {
      const { data } = await deleteRole(id)
      switch (data.code) {
        case '000000':
          // 删除后更新列表
          this.loadAllRoles()
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
        this.deleteRole(row.id)
      }).catch(err => {
        console.log('已取消', err)
      })
    },
    handleCreate () {
      EventBus.$emit('editCreate')
    },
    onSubmit () {
      this.loadRolePages()
    },
    resetForm (form: string) {
      (this.$refs[form] as Form).resetFields()
      this.loadAllRoles()
    }
  }
})
</script>

<style lang="scss" scoped>
.box-card-btn{
  border-top: 1px solid #EBEEF5;
  padding-top: 18px;
}
</style>
