<template>
  <!-- 利用 class 决定 icon 位置 利用 flex 的 order-->
  <!-- 按钮的点击触发组件的点击事件 -->
  <button
    class="d-button"
    :class="{'icon-right': iconPos === 'right'}"
    :disabled="disabled"
    :readonly="readonly"
    @click='$emit("click")'
  >
    <d-icon
      v-if="loading"
      class="loading"
      name="loading"
    ></d-icon>
    <d-icon
      v-if="icon && !loading"
      :name="icon"
    ></d-icon>
    <div class="content">
      <slot />
    </div>
  </button>
</template>
<script>
import Icon from "../Common/Icon";
export default {
  name: "DButton",
  components: {
    "d-icon": Icon
  },
  props: {
    icon: {
      type: String
    },
    iconPos: {
      type: String,
      default: "left",
      validator(value) {
        // 校验属性 left right
        return value === "left" || value === "right";
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
@import "_var";
@import "animate";
$btn-height: $height;
.d-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: $btn-height;
  padding: 0 1em;
  border-radius: $border-radius;
  border: 1px solid $border-color;
  font-size: $font-size;
  color: $color;
  background: $btn-bg;
  vertical-align: middle;
  cursor: pointer;
  &:hover {
    background: $btn-hover-bg;
    border-color: $border-color-hover;
  }
  &:active {
    background: $btn-active-bg;
  }
  &:focus {
    outline: none;
  }
  > .icon {
    order: 1;
    margin-right: 0.3em;
  }
  > .content {
    order: 2;
  }
  &.icon-right {
    > .icon {
      order: 2;
      margin-right: 0;
      margin-left: 0.3em;
    }
    > .content {
      order: 1;
    }
  }
  .loading {
    animation: spin 1s linear infinite;
  }
  &:disabled,
  &[readonly] {
    cursor: not-allowed;
    background: $btn-disabled-bg;
  }
}
</style>