import { ref } from "vue"
import { VueAdapter } from "./adapter"

export function useVirtualizer() {
  const range = ref([0, 0])

  const adapter = new VueAdapter()

  adapter.createEffect(() => {

  })

  return range
}