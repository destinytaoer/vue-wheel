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
      @change="$emit('change', $event.target.value)"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
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
import Icon from "../Common/Icon";
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
@import "_var";
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
      background: $bg-disabled;
      cursor: not-allowed;
    }
  }
  &.error {
    > input {
      border-color: $color-error;
      &:focus {
        outline: none;
        box-shadow: inset 0 0 3px $box-shadow-color-error;
      }
    }
  }
  .icon-error {
    fill: $color-error;
  }
  .errMsg {
    color: $color-error;
  }
  > *:not(:last-child) {
    margin-right: 0.5em;
  }
}
</style>