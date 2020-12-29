<template>
  <div class="edit">
    <edit-create :courseId="courseId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EditCreate from './components/EditCreate.vue'

export default Vue.extend({
  name: 'Edit',
  components: {
    EditCreate
  },
  data () {
    return {
      courseId: Number(this.$route.query.courseId)
    }
  }
})
</script>

<style lang="scss" scoped></style>
