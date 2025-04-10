<script setup lang="ts">
import Primitive from "./Primitive.vue"

defineOptions({
  name: "Cell"
})

defineProps({
  as: {
    type: [String, Object],
    default: 'td'
  }
})
</script>

<template>
  <Primitive :as="as">
    <slot></slot>
  </Primitive>
</template>