<script lang="ts" setup>
import { useTable } from "./useTable";

const { root } = useTable({
  row: 1000,
  col: 1000,
});
</script>

<template>
  <div ref="root">
    <table></table>
  </div>
</template>

<style lang="css" scoped></style>
