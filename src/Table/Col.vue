<script setup lang="ts">
import Primitive from "./Primitive.vue"

defineOptions({
  name: "Col"
})
</script>

<template>
  <Primitive as="col">
    <slot></slot>
  </Primitive>
</template>
