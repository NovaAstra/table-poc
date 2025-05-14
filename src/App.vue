<script setup lang="ts">
import { VueAdapter } from "./vue/adapter";

const adapter = new VueAdapter();
const [count, setCount] = adapter.createSignal(0);

console.log(count()); // 0

setTimeout(() => {
  // 更新值
  setCount(10);
  console.log(count()); // 10
}, 5000);
</script>

<template>
  {{ count() }}
</template>
