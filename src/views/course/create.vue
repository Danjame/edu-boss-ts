<template>
  <div class="create">
    <edit-create />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EditCreate from './components/EditCreate.vue'

export default Vue.extend({
  name: 'Create',
  components: {
    EditCreate
  },
  created () {
    this.$store.commit('setBreadcrumbTitle', '新建课程')
  }
})
</script>

<style lang="scss" scoped></style>
