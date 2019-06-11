<template>
  <!-- 利用 class 决定 icon 位置 利用 flex 的 order-->
  <button
    class="g-button"
    :class="{'icon-right': iconPos === 'right'}"
  >
    <g-icon v-if="icon" :name="icon"></g-icon>
    <div class="content">
      <slot/>
    </div>
  </button>
</template>
<script>
export default {
  props: {
    icon: {
      type: String
    },
    iconPos: {
      type: String,
      default: 'left',
      validator(value) {
         // 校验属性 left right
        return value === 'left' || value === 'right'
      }
    }
  }
};
</script>
<style lang="scss">
.g-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: var(--btn-height);
  padding: 0 1em;
  border-radius: var(--border-raduis);
  border: 1px solid var(--border-color);
  font-size: var(--font-size);
  color: var(--color);
  background: var(--btn-bg);
  vertical-align: middle;
  &:hover {
    background: var(--btn-hover-bg);
    border-color: var(--border-color-hover);
  }
  &:active {
    background: var(--btn-active-bg);
  }
  &:focus {
    outline: none;
  }
  > .icon {
    order: 1;
    margin-right: .3em;
  }
  > .content {
    order: 2;
  }
  &.icon-right {
    > .icon {
      order: 2;
      margin-right: 0;
      margin-left: .3em;
    }
    > .content {
      order: 1;
    }
  }
}
</style>