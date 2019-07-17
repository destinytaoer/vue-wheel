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
        :load-data="loadData"
        @selected="onUpdateSelected"
        @hide="hidePopover"
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
    },
    loadData: {
      type: Function
    }
  },
  data() {
    return {
      popoverVisible: false
    };
  },
  computed: {
    result() {
      return this.selected.map(item => item.name).join(` ${this.split} `);
    }
  },
  methods: {
    onUpdateSelected(newSelected) {
      this.$emit("update:selected", newSelected);
      if (this.loadData) {
        let lastItem = newSelected[newSelected.length - 1];
        let complex = function fn(children, id) {
          let result = children.filter(item => item.id === id);
          if (result.length) {
            return result[0];
          }
          for (let i = 0; i < children.length; i++) {
            let item = children[i];
            if (item.children) {
              let result = fn(item.children, id);
              if (result) return result;
            }
          }
          return null;
        };
        let updateSource = result => {
          let copy = JSON.parse(JSON.stringify(this.source));
          let toUpdate = complex(copy, lastItem.id);
          if (result.length) {
            toUpdate.children = result;
            this.$emit("update:source", copy);
          }
        };
        if (!lastItem.isLeaf) {
          this.loadData(lastItem, updateSource);
        }
      }
    },
    hidePopover() {
      this.popoverVisible = false;
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
      this.hidePopover();
    });
  }
};
</script>
<style lang="scss" scoped>
@import "../_var";
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