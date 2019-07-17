<template>
  <div
    class="cascader"
    ref="cascader"
    v-click-outside="'popoverVisible'"
  >
    <div
      class="trigger"
      @click="toggle"
    >
      {{result}}
    </div>
    <div
      class="popover"
      v-show="popoverVisible"
    >
      <cascader-items
        :selected="selected"
        :items="source"
        :load-data="loadData"
        @selected="onUpdateSelected"
        @hide="hide"
      ></cascader-items>
    </div>
  </div>
</template>
<script>
import CascaderItems from "./CascaderItems";
import ClickOutside from "../click-outside";
export default {
  name: "DCascader",
  directives: { ClickOutside },
  props: {
    source: {
      type: Array,
      required: true
    },
    selected: {
      type: Array,
      required: true
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
    show() {
      this.popoverVisible = true;
      this.$emit("show");
    },
    hide() {
      this.popoverVisible = false;
      this.$emit("hide");
    },
    toggle() {
      if (this.popoverVisible) {
        this.hide();
      } else {
        this.show();
      }
    }
  },
  components: {
    "cascader-items": CascaderItems
  }
};
</script>
<style lang="scss" scoped>
@import "../_var";
.cascader {
  position: relative;
  display: inline-block;
  .trigger {
    display: flex;
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