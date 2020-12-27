<template>
  <div class="alloc-menu">
    <el-card>
      <div slot="header" class="clearfix">
        分配菜单
      </div>
      <el-tree
        :data="menus"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :default-checked-keys="checkedKeys"
        ref="el-tree"
      >
      </el-tree>
      <div class="alloc-menu-btns">
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, getRoleMenus, allocateRoleMenus } from '@/services/menu'
import { Tree } from 'element-ui'

interface Menu{
  id: number
  selected: boolean
  subMenuList: []
}

export default Vue.extend({
  name: 'AllocMenu',
  data () {
    return {
      roleId: Number(this.$route.query.roleId),
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  created () {
    this.loadMenuNodeList()
    this.loadRoleMenus()
  },
  methods: {
    async loadMenuNodeList () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      } else {
        this.$message.error(`菜单节点加载失败：${data.mesg}`)
      }
    },
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      if (data.code === '000000') {
        this.getCheckedKeys(data.data)
      } else {
        this.$message.error(`角色菜单加载失败：${data.mesg}`)
      }
    },
    // 收集选中项的key
    getCheckedKeys (menus: []) {
      menus.forEach((m: Menu) => {
        if (m.selected) {
          this.checkedKeys = [...this.checkedKeys, m.id] as []
        }
        if (m.subMenuList) {
          this.getCheckedKeys(m.subMenuList)
        }
      })
    },
    resetChecked () {
      (this.$refs['el-tree'] as Tree).setCheckedKeys([])
    },
    async onSave () {
      const menuIdList = (this.$refs['el-tree'] as Tree).getCheckedKeys()
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      if (data.code === '000000') {
        this.$message.success('保存成功')
      } else {
        this.$message.error(`保存失败：${data.mesg}`)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.alloc-menu-btns {
  margin-top: 20px;
  text-align: center;
}
</style>
