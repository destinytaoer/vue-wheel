<template>
  <div
    class="layout"
    :class="layoutClass"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "DLayout",
  data() {
    return {
      layoutClass: {
        hasSider: false
      }
    };
  },
  mounted() {
    for (let child of this.$children) {
      if (child.$options.name === "DSider") {
        this.layoutClass.hasSider = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.layout {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  &.hasSider {
    flex-direction: row;
  }
}
</style>