<script lang="ts" setup>
import Row from "./Row.vue";
import Cell from "./Cell.vue";
import { useVirtualScroll } from "./useVirtualScroll";

const { rows, cols } = useVirtualScroll();

const data = [
  [0, 1, 2, 3, 5, 6],
  [10, 11, 12, 13, 15, 16],
  [20, 21, 22, 23, 25, 26],
];
</script>

<template>
  <div ref="root" class="zen-table" tabindex="0">
    <div class="zen-virtual-panel"></div>
    <div class="zen-scroll-table-clip">
      <table cellspacing="0">
        <tbody>
          <Row v-for="(row, ridx) in rows" :key="ridx">
            <Cell v-for="(col, cidx) in cols" :key="cidx">
              {{ data[row.index][col.index] }}
            </Cell>
          </Row>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="css" scoped>
.zen-table {
  scrollbar-color: transparent transparent;
  scrollbar-width: thin;
  outline: none;
  overflow: scroll;
  overflow-anchor: none;
  overscroll-behavior: none;
  bottom: 0;
}

.zen-table .zen-virtual-panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  height: 700px;
  width: 700px;
}

.zen-table .zen-scroll-table-clip {
  position: sticky;
  contain: strict;
  overflow-anchor: none;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  overflow-anchor: none;
  top: 0px;
  left: 0px;
}

.zen-table .zen-scroll-table-clip table {
  position: absolute;
  overflow: hidden;
  outline: none;
  color: #666;
}
</style>
