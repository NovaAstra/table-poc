import { onMounted, onUnmounted, ref } from "vue"
import { type TableOptions, Table } from "../core"
import { VueAdapter } from "./adapter"

export interface TableProps extends TableOptions {

}

export const microtask =
  typeof queueMicrotask === "function"
    ? queueMicrotask
    : (fn: () => void) => {
      Promise.resolve().then(fn);
    };

export function useTable(props: TableProps) {
  const adapter = new VueAdapter()
  const table = new Table(props, adapter)

  const root = ref<HTMLElement>()

  onMounted(() => {
    microtask(() => {
      table.resizer.observeRoot(root.value!);
    });
  })

  onUnmounted(() => {
    table.resizer.disconnect()
  })

  return {
    table,
    root
  }
}