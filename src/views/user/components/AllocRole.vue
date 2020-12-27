<template>
  <div class="alloc-role">
    <el-dialog title="分配角色" :visible.sync="isVisible">
      <el-form :model="form">
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
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

export default Vue.extend({
  name: 'AllocRole',
  data () {
    return {
      form: {
        region: ''
      },
      isVisible: false,
      formLabelWidth: '120px'
    }
  },
  created () {
    EventBus.$on('allocateRole', () => {
      this.isVisible = true
    })
  },
  methods: {
    handleHide () {
      this.isVisible = false
    },
    onSubmit () {
      this.handleHide()
    }
  }
})
</script>

<style lang="scss" scoped></style>
