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
  }
})
</script>

<style lang="scss" scoped>
</style>
