import { computed, ref } from "vue"

export function useVirtualScroll() {
  const ra = ref([0, 3])

  const hrange = computed(() => [0, 2]);
  const vrange = computed(() => ra.value);

  setTimeout(() => ra.value = [1, 5], 5000)

  const rows = computed(() => {
    const rows = []
    const [start, end] = hrange.value
    for (let index = start; index <= end; index++) {
      rows.push({
        index,
      })
    }
    return rows
  })

  const cols = computed(() => {
    const cols = []
    const [start, end] = vrange.value
    for (let index = start; index <= end; index++) {
      cols.push({
        index
      })
    }
    return cols
  })

  return {
    rows,
    cols
  }
}