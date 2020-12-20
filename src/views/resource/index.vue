<template>
  <div class="resource">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({name: 'menu-create' })">添加菜单</el-button>
      </div>
      <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数"
          align="center"
        >
        </el-table-column>
          <el-table-column
          prop="icon"
          label="前端图标"
          align="center"
        >
        </el-table-column>
          <el-table-column
          prop="orderNum"
          label="排序"
          align="center"
        >
        </el-table-column>
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

export default Vue.extend({
  name: 'Resource',
  methods: {
    handleEdit (index: number, row: any) {
      console.log(index, row)
    },
    handleDelete (index: number, row: any) {
      console.log(index, row)
    }
  }
})
</script>

<style lang="scss" scoped></style>
