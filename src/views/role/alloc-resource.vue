<template>
  <div class="alloc-resource">
    <el-card class="box-card">
      <div>
        <el-row style="background: rgb(242, 246, 252);">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >
          全选
          </el-checkbox>
        </el-row>
        <el-row>
          <!-- <div style="margin: 15px 0;"></div> -->
            <el-col :span="8" v-for="city in cities" :key="city">
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox :label="city" >{{city}}</el-checkbox>
            </el-checkbox-group>
            </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRoleResources, allocateRoleResources } from '@/services/resource'

export default Vue.extend({
  name: 'AllocResource',
  data () {
    return {
      roleId: Number(this.$route.query.roleId),
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: ['上海', '北京', '广州', '深圳'],
      isIndeterminate: true
    }
  },
  created () {
    // this.loadMenuNodeList()
    this.loadRoleResources()
  },
  methods: {
    // async loadMenuNodeList () {
    //   const { data } = await getMenuNodeList()
    //   if (data.code === '000000') {
    //     this.menus = data.data
    //   } else {
    //     this.$message.error(`加载失败：${data.mesg}`)
    //   }
    // },
    async loadRoleResources () {
      const { data } = await getRoleResources(this.roleId)
      if (data.code === '000000') {
        // this.getCheckedKeys(data.data)
        console.log(data.data)
      } else {
        this.$message.error(`加载失败：${data.mesg}`)
      }
    },
    handleCheckAllChange (val: any) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value: any) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  }
})
</script>

<style lang="scss" scoped>
.top-line{
  border-top: 1px solid #dcdfe6;
}
.el-row {
  padding: 20px;
    border-left: 1px solid #dcdfe6;
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
</style>
