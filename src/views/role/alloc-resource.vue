<template>
  <div class="alloc-resource">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span style="flex: 1"><el-button type="text" icon="el-icon-back" @click="$router.push('/role')">返回</el-button></span>
        <span style="flex: 1">分配资源</span>
      </div>
      <el-tree
        :data="resource"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :default-checked-keys="checkedKeys"
        ref="el-tree"
      >
      </el-tree>
      <div class="alloc-resource-btns">
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllRource, getRoleResources, allocateRoleResources } from '@/services/resource'
import { getAllCategories } from '@/services/resource-category'
import { Tree } from 'element-ui'

interface Resource{
  id: number
  categoryId: number
  selected: boolean
  resourceList?: []
}

interface Category{
  id: number
}

interface RoleResource{
  roleId: number
  resourceIdList: any[]
}

export default Vue.extend({
  name: 'AllocResource',
  data () {
    return {
      roleId: Number(this.$route.query.roleId),
      resource: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  created () {
    this.$store.commit('setBreadcrumbTitle', '分配资源')
    this.loadAllReourceAndCategories()
    this.loadRoleResources()
  },
  methods: {
    async loadAllReourceAndCategories () {
      const ret = await Promise.all([getAllRource(), getAllCategories()])
      const resource = ret[0].data.data
      const categories = ret[1].data.data
      resource.forEach((r: Resource) => {
        const category = categories.find((c: Category) => c.id === r.categoryId)
        if (category) {
          category.children = category.children || []
          category.children.push(r)
        }
      })
      categories.forEach((c: Category) => {
        c.id = Math.random()
      })
      this.resource = categories
    },
    async loadRoleResources () {
      const { data } = await getRoleResources(this.roleId)
      if (data.code === '000000') {
        this.getCheckedKeys(data.data)
      } else {
        this.$message.error(`角色资源加载失败：${data.mesg}`)
      }
    },
    async allocateRoleResources (rr: RoleResource) {
      const { data } = await allocateRoleResources(rr)
      if (data.code === '000000') {
        this.$message.success('保存成功')
      } else {
        this.$message.error(`保存失败：${data.mesg}`)
      }
    },
    getCheckedKeys (resource: []) {
      resource.forEach((r: Resource) => {
        if (r.selected) {
          this.checkedKeys = [...this.checkedKeys, r.id] as []
        }
        if (r.resourceList) {
          this.getCheckedKeys(r.resourceList)
        }
      })
    },
    resetChecked () {
      (this.$refs['el-tree'] as Tree).setCheckedKeys([])
    },
    onSave () {
      const resourceIdList = (this.$refs['el-tree'] as Tree).getCheckedKeys()
      this.allocateRoleResources({
        roleId: this.roleId,
        resourceIdList
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.alloc-resource-btns {
  margin-top: 20px;
  text-align: center;
}

.header{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
