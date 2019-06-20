<template>
  <div class="tabs-head">
    <slot></slot>
    <div
      class="line"
      ref="line"
    ></div>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "DTabsHead",
  inject: ["eventBus"],
  created() {
    this.eventBus.$on("update:selected", (name, vm) => {
      let { left: parentLeft } = this.$el.getBoundingClientRect();
      let { width, height, top, left } = vm.$el.getBoundingClientRect();
      this.$refs.line.style.width = `${width}px`;
      this.$refs.line.style.left = `${left - parentLeft}px`;
    });
  }
};
</script>
<style lang="scss" scoped>
.tabs-head {
  display: flex;
  position: relative;
  border: 1px solid #ff0000;
  > .line {
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid #1890ff;
    transition: all 350ms;
  }
  > .actions-wrapper {
    margin-left: auto;
  }
}
</style>