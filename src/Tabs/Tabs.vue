<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "DTabs",
  props: {
    selected: {
      types: String,
      required: true
    },
    direction: {
      type: String,
      default: "horizontal",
      validator(val) {
        return ["horizontal", "vertical"].includes(val);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>