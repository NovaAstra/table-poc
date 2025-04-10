<script lang="ts" setup>
defineOptions({
  name: "Primitive"
})

defineProps({
  as: {
    type: [String, Object],
    default: "div"
  }
})
</script>

<template>
  <component :is="as">
    <slot></slot>
  </component>
</template>