<script setup lang="ts">
import { type Ref, onMounted, ref, unref } from "vue"
import { Resizer } from "./core"

const root = ref() as Ref<HTMLElement>

let a: HTMLElement


const observer = new Resizer((entries: ResizeObserverEntry[]) => {
  console.log(entries)
  const entrie = entries[0]
})


onMounted(() => {
  a = unref(root)
  observer.observe(a)

  setTimeout(() => {
    a.textContent = '5 秒后更新的文本';
    a.style.height = '30px'
  }, 5000);
})
</script>

<template>
  <div ref="root">111</div>
</template>
