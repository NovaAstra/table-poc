<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("mounted");
});
</script>

<template>
  <td>
    <slot />
  </td>
</template>
