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
      >
      </el-tree>
      <div class="alloc-menu-btns">
        <el-button>清空</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, allocateRoleMenus } from '@/services/menu'

export default Vue.extend({
  name: 'AllocMenu',
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },
  created () {
    this.loadMenuNodeList()
  },
  methods: {
    async loadMenuNodeList () {
      const { data } = await getMenuNodeList()
      console.log(data)
      if (data.code === '000000') {
        this.menus = data.data
      } else {
        this.$message.error(`加载失败：${data.mesg}`)
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
