<template>
  <div class="menu-create">
    <edit-create :isEdit="false" />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import EditCreate from './components/EditCreate.vue'

export default Vue.extend({
  name: 'MenuCreate',
  components: {
    EditCreate
  },
  created () {
    this.$store.commit('setBreadcrumbTitle', '添加菜单')
  }
})
</script>

<style lang="scss" scoped>

</style>
