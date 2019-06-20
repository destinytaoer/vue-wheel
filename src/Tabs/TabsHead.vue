<template>
  <div class="tabs-head">
    <slot></slot>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "DTabsHead",
  inject: ["eventBus"]
};
</script>
<style lang="scss" scoped>
.tabs-head {
  display: flex;
  align-items: center;
  border: 1px solid #ff0000;
  > .actions-wrapper {
    margin-left: auto;
  }
}
</style>