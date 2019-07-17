<template>
  <div class="cascader-items">
    <div class="left">
      <div
        class="label"
        v-for="(item, index) in items"
        :key="index"
        @click="onClickLabel(item)"
        :class="{active: selected[level] && item.name === selected[level].name}"
      >
        {{item.name}}
        <d-icon
          v-if="item.children"
          name="right"
        ></d-icon>
      </div>
    </div>
    <div
      class="right"
      v-if="rightItems"
    >
      <d-cascader-items
        :items="rightItems"
        :level="level+1"
        :selected="selected"
        @selected="onUpdateSelected"
        @hide="notifyHide"
      ></d-cascader-items>
    </div>
  </div>
</template>
<script>
import Icon from "../Common/Icon";
export default {
  name: "DCascaderItems",
  props: {
    items: {
      type: Array
    },
    selected: {
      type: Array,
      default() {
        return [];
      }
    },
    level: {
      type: Number,
      default: 0
    }
  },
  computed: {
    rightItems() {
      if (this.selected[this.level]) {
        let selectedItem = this.items.filter(item => {
          return item.name === this.selected[this.level].name;
        })[0];
        if (
          selectedItem &&
          selectedItem.children &&
          selectedItem.children.length > 0
        ) {
          return selectedItem.children;
        }
      }
    }
  },
  methods: {
    onClickLabel(item) {
      if (!item.children) {
        this.notifyHide();
      }
      let selectedItem = this.selected[this.level];
      if (selectedItem && selectedItem.name === item.name) return;
      var copy = JSON.parse(JSON.stringify(this.selected));
      copy.splice(this.level);
      copy[this.level] = item;
      this.notifySelected(copy);
    },
    onUpdateSelected(newSelected) {
      this.notifySelected(newSelected);
    },
    notifySelected(item) {
      this.$emit("selected", item);
    },
    notifyHide() {
      this.$emit("hide");
    }
  },
  components: {
    "d-icon": Icon
  }
};
</script>
<style lang="scss" scoped>
@import "../var";
.cascader-items {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 200px;
  .left {
    height: 100%;
    overflow: auto;
  }
  .label {
    display: flex;
    align-items: center;
    padding: 5px 12px;
    cursor: pointer;
    min-width: 100px;
    &:hover {
      background: $bg-active-light;
    }
    &.active {
      background: $bg-active-light;
    }
    .icon {
      margin-left: 1em;
      font-size: 0.5em;
    }
  }
  .right {
    border-left: 1px solid $border-color-light;
  }
}
</style>