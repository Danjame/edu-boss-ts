<template>
  <div class="resource">
    <resource-list @showEditCreate="handleEditCreate" />
    <edit-create :itemId="itemId" :isVisible="editCreateVisible" @hideEditCreate="handleEditCreate"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResourceList from './components/ResourceList.vue'
import EditCreate from './components/EditCreate.vue'

export default Vue.extend({
  name: 'Resource',
  components: {
    ResourceList,
    EditCreate
  },
  data () {
    return {
      editCreateVisible: false,
      itemId: null
    }
  },
  methods: {
    handleEditCreate (data: object) {
      this.editCreateVisible = data.visible
      if (data.id) {
        this.itemId = data.id
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
