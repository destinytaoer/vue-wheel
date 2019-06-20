<template>
  <div class="tabs-body">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "DTabsBody",
  inject: ["eventBus"],
  created() {
    console.log("tb eventBus", this.eventBus);
  }
};
</script>
<style lang="scss" scoped>
</style>