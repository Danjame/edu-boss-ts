<template>
  <div class="course">
    <course-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CourseList from './components/CourseList.vue'

export default Vue.extend({
  name: 'Course',
  components: {
    CourseList
  },
  created () {
    this.$store.commit('setBreadcrumbTitle', '课程管理')
  }
})
</script>

<style lang="scss" scoped></style>
