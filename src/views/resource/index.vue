<template>
  <div class="resource">
    <resource-list />
    <edit-create />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResourceList from './components/ResourceList.vue'
import EditCreate from './components/EditCreate.vue'

export default Vue.extend({
  name: 'Resource',
  components: {
    ResourceList,
    EditCreate
  },
  created () {
    this.$store.commit('setBreadcrumbTitle', '资源管理')
  }
})
</script>

<style lang="scss" scoped>
</style>
