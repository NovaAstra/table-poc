<script setup lang="ts">
import Primitive from "./Primitive.vue"

defineOptions({
  name: "TBody"
})
</script>

<template>
  <Primitive as="tbody">
    <Row :start="4" :end="50" v-slot="rowIndex">
      <Cell :start="5" :end="10" v-slot="colIndex">

      </Cell>
    </Row>
  </Primitive>
</template>