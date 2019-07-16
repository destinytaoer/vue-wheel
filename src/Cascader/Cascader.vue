<template>
  <div class="cascader">
    <div
      class="trigger"
      @click="popoverVisible = !popoverVisible"
    >
      {{result}}
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
    },
    split: {
      type: String,
      default: "/"
    }
  },
  data() {
    return {
      popoverVisible: false
    };
  },
  computed: {
    result() {
      return this.selected.join(` ${this.split} `);
    }
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
    display: inline-flex;
    align-items: center;
    min-width: 10em;
    height: $height;
    padding: 5px 12px;
    border: 1px solid $border-color;
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