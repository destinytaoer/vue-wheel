<template>
  <div class="tabs-head">
    <slot></slot>
    <slot name="actions"></slot>
  </div>
</template>
<script>
export default {
  name: "DTabsHead",
  inject: ["eventBus"],
  created() {
    console.log("th eventBus:", this.eventBus);
  }
};
</script>
<style lang="scss" scoped>
</style>