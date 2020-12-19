<template>
  <div class="menu-edit">
    <edit-delete />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import EditDelete from './components/EditDelete.vue'

export default Vue.extend({
  name: 'MenuEdit',
  components: {
    EditDelete
  }
})
</script>

<style lang="scss" scoped>

</style>
