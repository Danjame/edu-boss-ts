<template>
  <div class="text-editor" ref="editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const editor = new E(this.$refs.editor as any)
      // 内容变化触发回调
      editor.config.onchange = (value: string) => {
        this.$emit('input', value)
      }
      editor.create()
      // 初始化内容
      editor.txt.html(this.value)
    }
  }
})
</script>

<style lang="scss" scoped></style>
