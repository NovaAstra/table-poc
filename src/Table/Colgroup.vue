<script setup lang="ts">
import Primitive from "./Primitive.vue"

defineOptions({
  name: "Colgroup"
})
</script>

<template>
  <Primitive as="colgroup">
    <slot></slot>
  </Primitive>
</template>
