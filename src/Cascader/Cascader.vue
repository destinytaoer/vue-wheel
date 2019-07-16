<template>
  <div class="cascader">
    <div
      ref="trigger"
      class="trigger"
      @click="popoverVisible = !popoverVisible"
    >
      {{result}}
    </div>
    <div
      ref="popover"
      class="popover"
      v-show="popoverVisible"
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
  },
  mounted() {
    window.document.addEventListener("click", e => {
      const { trigger, popover } = this.$refs;
      if (e.target === trigger || trigger.contains(e.target)) return;
      if (e.target === popover || popover.contains(e.target)) return;
      this.popoverVisible = false;
    });
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