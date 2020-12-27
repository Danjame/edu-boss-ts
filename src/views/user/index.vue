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
  }
})
</script>

<style lang="scss" scoped></style>
