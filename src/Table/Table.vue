<script setup lang="ts">
import Primitive from "./Primitive.vue"
import TBody from "./TBody.vue";

defineOptions({
  name: "Table"
})
</script>

<template>
  <Primitive as="table">
    <TBody />
  </Primitive>
</template>