<script lang="ts" setup>

</script>

<template>
  <div ref="root" class="zen-table" tabindex="0">
    <div class="zen-virtual-panel"></div>
    <div class="zen-scroll-table-clip">
      <table cellspacing="0">
       
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
