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
      <cascader-items :items="source"></cascader-items>
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
    }
  },
  data() {
    return {
      popoverVisible: false
    };
  },
  components: {
    "cascader-items": CascaderItems
  }
};
</script>
<style lang="scss" scoped>
@import "../var";
.cascader {
  .trigger {
    border: 1px solid red;
    height: $height;
    width: 100px;
  }
  .popover {
    border: 1px solid red;
    height: 200px;
    display: flex;
    .level1 {
    }
    .level2 {
    }
  }
}
</style>