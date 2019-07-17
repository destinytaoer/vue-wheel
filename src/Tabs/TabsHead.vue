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
    if (this.eventBus) {
      this.eventBus.$on("update:selected", (name, vm) => {
        let { left: parentLeft } = this.$el.getBoundingClientRect();
        let { width, height, top, left } = vm.$el.getBoundingClientRect();
        this.$refs.line.style.width = `${width}px`;
        this.$refs.line.style.left = `${left - parentLeft}px`;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../_var";
.tabs-head {
  display: flex;
  position: relative;
  border-bottom: 1px solid $border-color;
  align-items: center;
  > .line {
    position: absolute;
    bottom: -1px;
    border-bottom: 1px solid $border-color-active;
    transition: all 350ms;
  }
  > .actions-wrapper {
    margin-left: auto;
  }
}
</style>