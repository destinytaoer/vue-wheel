<template>
  <!-- 利用 class 决定 icon 位置 利用 flex 的 order-->
  <!-- 按钮的点击触发组件的点击事件 -->
  <button
    class="d-button"
    :class="{'icon-right': iconPos === 'right'}"
    @click='$emit("click")'
  >
    <d-icon v-if="loading" class="loading" name="loading"></d-icon>
    <d-icon v-if="icon && !loading" :name="icon"></d-icon>
    <div class="content">
      <slot/>
    </div>
  </button>
</template>
<script>
import Icon from './Icon'
export default {
  components: {
    'd-icon': Icon
  },
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
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
$font-size: 14px;
$btn-height: 32px;
$border-radius: 4px;
$border-color: #ccc;
$border-color-hover: #666;
$btn-bg: #fff;
$btn-hover-bg: #fff;
$btn-active-bg: #eee;
$color: #333;
@keyframes spin {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}
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
  .loading {
    animation: spin 1s linear infinite;
  }
}
</style>