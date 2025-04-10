<script lang="tsx">
import { defineComponent, type VNode } from "vue"
import Primitive from "./Primitive.vue"

export default defineComponent({
  name: "Loop",
  props: {
    as: {
      type: [String, Object],
      default: "div"
    },
    start: {
      type: Number,
      default: 0
    },
    end: {
      type: Number,
      default: 0
    }
  },
  setup(props, { slots }) {
    const items: VNode[] = []

    for (let index = props.start; index <= props.end; index++) {
      items.push(slots.default?.(index) as unknown as VNode)
    }

    return () => <Primitive as={props.as}>{items}</Primitive>
  }
})
</script>