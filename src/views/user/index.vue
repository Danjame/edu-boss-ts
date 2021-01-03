<template>
  <div class="user">
    <user-list />
    <alloc-role />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserList from './components/UserList.vue'
import AllocRole from './components/AllocRole.vue'

export default Vue.extend({
  name: 'User',
  components: {
    UserList,
    AllocRole
  },
  created () {
    this.$store.commit('setBreadcrumbTitle', '用户管理')
  }
})
</script>

<style lang="scss" scoped></style>
