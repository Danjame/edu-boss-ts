<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({name: 'menu-create' })">添加菜单</el-button>
      </div>
      <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column prop="id" label="编号" width="100" align="center" />
        <el-table-column prop="name" label="菜单名称" width="180" align="center" />
        <el-table-column prop="level" label="菜单级数" align="center" />
        <el-table-column prop="icon" label="前端图标" align="center" />
        <el-table-column prop="orderNum" label="排序" align="center" />
        <el-table-column
          label="操作"
          min-width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAll, deleteMenu } from '@/services/menu'

export default Vue.extend({
  name: 'Menu',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.loadAll()
  },
  methods: {
    async loadAll () {
      const { data } = await getAll()
      this.tableData = data.data
    },
    handleEdit (index: number, row: any) {
      // console.log(index, row)
      this.$router.push({
        name: 'menu-edit',
        query: {
          id: row.id
        }
      })
    },
    handleDelete (index: number, row: any) {
      this.$confirm('确认删除？')
        .then(async () => {
          const { data } = await deleteMenu(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAll()
          } else {
            this.$message.error(`删除失败，${data.mesg}`)
          }
        }).catch(err => {
          console.log('取消', err)
        })
    }
  }
})
</script>

<style lang="scss" scoped></style>
