<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.wrapper {
  margin-top: 20px;
  position: relative;
  z-index: 1000;
}
</style>