<template>
  <div class="alloc-role">
    <el-dialog title="分配角色" :visible.sync="isVisible">
      <el-form :model="form" label-width="80px">
        <el-form-item label="活动区域">
          <el-select v-model="form.roleIdList" multiple placeholder="请选择">
            <el-option
              v-for="role in roles"
              :key="role.id"
              :label="role.name"
              :value="role.id">
            </el-option>
          </el-select>
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
import { getAllRoles, getUserRoles, allocateUserRoles } from '@/services/role'
import { enableUser } from '@/services/user'

interface Role{
  id: number
}

export default Vue.extend({
  name: 'AllocRole',
  data () {
    return {
      form: {
        userId: 0,
        roleIdList: []
      },
      roles: [],
      isVisible: false
    }
  },
  created () {
    EventBus.$on('allocateRole', (userId: number) => {
      this.form = {
        userId: 0,
        roleIdList: []
      }
      // 获取用户ID
      this.form.userId = userId
      // 获取用户的角色
      this.loadUserRoles()
      this.isVisible = true
    })
    this.loadAllRoles()
  },
  methods: {
    async loadAllRoles () {
      const { data } = await getAllRoles()
      if (data.code === '000000') {
        this.roles = data.data
      } else {
        this.$message.error(`角色信息加载失败：${data.mesg}`)
      }
    },
    async loadUserRoles () {
      const { data } = await getUserRoles(this.form.userId)
      if (data.code === '000000') {
        this.form.roleIdList = data.data.map((role: Role) => role.id)
      } else {
        this.$message.error(`加载失败：${data.mesg}`)
      }
    },
    async allocateUserRoles () {
      const { data } = await allocateUserRoles(this.form)
      if (data.code === '000000') {
        // if (this.form.roleIdList.length) {
        //   const { data } = await enableUser(this.form.userId)
        // }
        this.$message.success('分配成功')
        // 分配成功后重新加载列表
        this.loadAllRoles()
      } else {
        this.$message.error(`分配失败：${data.mesg}`)
      }
    },
    handleHide () {
      this.isVisible = false
    },
    onSubmit () {
      this.allocateUserRoles()
      this.handleHide()
    }
  }
})
</script>

<style lang="scss" scoped></style>
