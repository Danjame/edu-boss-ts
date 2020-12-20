<template>
  <div class="menu-edit">
    <edit-create />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import EditCreate from './components/EditCreate.vue'

export default Vue.extend({
  name: 'MenuEdit',
  components: {
    EditCreate
  }
})
</script>

<style lang="scss" scoped>

</style>
