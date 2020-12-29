<template>
  <div class="create">
    <edit-create :isEdit="isEdit" />
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
  data () {
    return {
      isEdit: false
    }
  }
  // methods : {

  // }
})
</script>

<style lang="scss" scoped></style>
