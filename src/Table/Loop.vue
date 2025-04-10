<script lang="tsx">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Loop",
  props: {
    start: {
      type: Number,
      default: 0
    },
    end: {
      type: Number,
      default: 0
    }
  },
  setup() {
    return () => <div></div>
  }
})
</script>