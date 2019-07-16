<template>
  <div class="cascader">
    <div
      class="trigger"
      @click="popoverVisible = !popoverVisible"
    >
      <slot></slot>
    </div>
    <div
      class="popover"
      v-if="popoverVisible"
    >
      <cascader-items
        :selected="selected"
        :items="source"
        @selected="onUpdateSelected"
      ></cascader-items>
    </div>
  </div>
</template>
<script>
import CascaderItems from "./CascaderItems";
export default {
  name: "DCascader",
  props: {
    source: {
      type: Array,
      required: true
    },
    selected: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      popoverVisible: false
    };
  },
  methods: {
    onUpdateSelected(newSelected) {
      this.$emit("update:selected", newSelected);
    }
  },
  components: {
    "cascader-items": CascaderItems
  }
};
</script>
<style lang="scss" scoped>
@import "../var";
.cascader {
  position: relative;
  .trigger {
    border: 1px solid $border-color;
    height: $height;
    width: 100px;
    &:focus {
      border-color: $border-color-active;
    }
  }
  .popover {
    display: flex;
    position: absolute;
    z-index: 1000;
    background: $bg;
    height: 200px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  }
}
</style>