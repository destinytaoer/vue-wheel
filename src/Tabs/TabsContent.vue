<template>
  <div class="tabs-content">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "DTabsContent",
  inject: ["eventBus"],
  created() {
    this.eventBus.$on("update:selected", name => {
      console.log(name);
    });
  }
};
</script>
<style lang="scss" scoped>
</style>