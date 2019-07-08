<template>
  <div class="cascader">
    <div class="trigger">
      <slot></slot>
    </div>
    <div class="popover">
      <div
        v-for="(item, index) in source"
        :key="index"
      >
        <cascader-item :sourceItem="item"></cascader-item>
      </div>
    </div>
  </div>
</template>
<script>
import CascaderItem from "./CascaderItem";
export default {
  name: "DCascader",
  props: {
    source: {
      type: Array,
      required: true
    }
  },
  components: {
    "cascader-item": CascaderItem
  }
};
</script>
<style lang="scss" scoped>
@import "../var";
.cascader {
}
</style>