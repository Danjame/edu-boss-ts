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
  },
  created () {
    this.$store.commit('setBreadcrumbTitle', '编辑菜单')
  }
})
</script>

<style lang="scss" scoped>

</style>
