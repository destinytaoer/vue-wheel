<template>
  <div class="toast">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "DToast"
};
</script>
<style lang="scss" scoped>
$font-size: 14px;
$height: 40px;
$bg: rgba(0, 0, 0, 0.75);
.toast {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: $height;
  padding: 0 16px;
  line-height: 1.8;
  font-size: $font-size;
  border-radius: 4px;
  background: $bg;
  color: #eee;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
}
</style>