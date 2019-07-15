<template>
  <div class="d-button-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "DButtonGroup",
  mounted() {
    // 校验其子元素是否是 d-button
    for (let node of this.$el.children) {
      if (
        node.nodeName.toLowerCase() !== "button" ||
        !node.classList.contains("d-button")
      ) {
        console.warn(
          "d-button-group 的子元素只能是 d-button，但是你写的是 div"
        );
      }
    }
  }
};
</script>
<style lang="scss">

.d-button-group {
  display: inline-flex;
  vertical-align: middle;
  > .d-button {
    border-radius: 0; // 清除圆角，然后再给第一个和最后一个元素添加圆角
    &:not(:first-child) {
      margin-left: -1px; // 使用 负 margin 实现边框合并
    }
    &:hover {
      // 负 margin 出现覆盖问题，hover 时，将其提升，出现高亮边框
      position: relative;
      z-index: 1000;
    }
    &:first-child {
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }
    &:last-child {
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
  }
}
</style>