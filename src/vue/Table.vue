<script lang="ts" setup>
import { ref } from "vue";
import { useVirtualTable } from "./useVirtualTable"

const tableViewportRef = ref<HTMLElement>()

useVirtualTable()
</script>

<template>
  <div ref="tableViewportRef">
    <table>

    </table>
  </div>
</template>

<style lang="css" scoped></style>