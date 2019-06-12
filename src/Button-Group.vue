<template>
  <div class="g-button-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  mounted() {
    // 校验其子元素是否是 g-button
    for (let node of this.$el.children) {
      if (node.nodeName.toLowerCase() !== 'button' || !node.classList.contains('g-button')) {
        console.warn('g-button-group 的子元素只能是 g-button，但是你写的是 div')
      }
    }
  }
}
</script>
<style lang="scss">
.g-button-group {
  display: inline-flex;
  vertical-align: middle;
  > .g-button {
    border-radius: 0; // 清除圆角，然后再给第一个和最后一个元素添加圆角
    &:not(:first-child) {
      margin-left: -1px; // 使用 负 margin 实现边框合并
    }
    &:hover { // 负 margin 出现覆盖问题，hover 时，将其提升，出现高亮边框
      position: relative;
      z-index: 1000;
    }
    &:first-child {
      border-top-left-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);
    }
    &:last-child {
      border-top-right-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }
  }
}
</style>