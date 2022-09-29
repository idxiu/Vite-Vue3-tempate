<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      className: {
        type: String,
        default: ''
      },
      mt: {
        type: [String, Number],
        default: 10
      }
    }
  })
</script>

<template>
  <h2 class="navTip" :style="{ marginTop: mt + 'px' }" :class="className"><slot></slot></h2>
</template>
<style scoped lang="scss">
  .navTip {
    &::before {
      display: inline-block;
      width: 0;
      height: 0;
      margin-right: 8px;

      // 居住
      vertical-align: middle;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 6px solid #2f44e0;

      // 向右d三角实体图标
      content: '';
    }
  }
</style>
