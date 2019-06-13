<template>
  <div
    class="g-input"
    :class="{'error': error}"
  >
    <input
      :value="value"
      :disabled="disabled"
      :readonly="readonly"
      type="text"
    >
    <template v-if="error">
      <d-icon
        class="icon-error"
        name="warn"
      ></d-icon>
      <span class="errMsg">{{error}}</span>
    </template>
  </div>
</template>
<script>
import Icon from "./Icon";
export default {
  name: "DInput",
  components: {
    "d-icon": Icon
  },
  props: {
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
$height: 32px;
$border-color: #999;
$border-radius: 4px;
$border-color-hover: #666;
$box-shadow-color: rgba(0, 0, 0, 0.5);
$box-shadow-color-error: rgba(255, 0, 0, 0.5);
$border-color-disabled: #666;
$bg-color-disabled: #eee;
$error-color: #f1453d;
$font-size: 12px;

.g-input {
  font-size: $font-size;
  display: inline-flex;
  align-items: center;
  > input {
    height: $height;
    padding: 9px 8px;
    border-radius: $border-radius;
    border: 1px solid $border-color;

    &:hover {
      border-color: $border-color-hover;
    }
    &:focus {
      outline: none;
      box-shadow: inset 0 0 3px $box-shadow-color;
    }
    &[disabled],
    &[readonly] {
      border-color: $border-color-disabled;
      color: $border-color-disabled;
      background: $bg-color-disabled;
      cursor: not-allowed;
    }
  }
  &.error {
    > input {
      border-color: $error-color;
      &:focus {
        outline: none;
        box-shadow: inset 0 0 3px $box-shadow-color-error;
      }
    }
  }
  .icon-error {
    fill: $error-color;
  }
  .errMsg {
    color: $error-color;
  }
  > *:not(:last-child) {
    margin-right: .5em;
  }
}
</style>