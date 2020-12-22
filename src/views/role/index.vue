<template>
  <div class="role">
    <role-list />
    <edit-create />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RoleList from './components/RoleList.vue'
import EditCreate from './components/EditCreate.vue'

export default Vue.extend({
  name: 'Resource',
  components: {
    RoleList,
    EditCreate
  }
})
</script>

<style lang="scss" scoped>
</style>
