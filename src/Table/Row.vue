<script setup lang="ts">
import Primitive from "./Primitive.vue"

defineOptions({
  name: "Row"
})

defineProps({
  as: {
    type: [String, Object],
    default: 'tr'
  },
  id: [String, Number],
  index: Number
})
</script>

<template>
  <Primitive :as="as" role="row" :row-index="index" :row-id="id">
    <slot></slot>
  </Primitive>
</template>