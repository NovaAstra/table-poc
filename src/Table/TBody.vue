<script setup lang="ts">
import Primitive from "./Primitive.vue"
import Loop from "./Loop.vue"
import Row from "./Row.vue"
import Cell from "./Cell.vue"

defineOptions({
  name: "TBody"
})
</script>

<template>
  <Primitive as="tbody">
    <Loop :as="Row" :start="4" :end="50" v-slot="rowIndex">
      <Cell>{{ rowIndex }}</Cell>
    </Loop>
  </Primitive>
</template>