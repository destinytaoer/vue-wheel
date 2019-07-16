<template>
  <div class="cascader-items">
    <div class="left">
      <div
        class="label"
        v-for="(item, index) in items"
        :key="index"
        @click="onClickLabel(item)"
        :class="{active: item.name === selected[level]}"
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
      let selectedName = this.selected[this.level];
      let selectedItem = this.items.find(item => {
        return item.name === selectedName;
      });
      if (selectedItem) {
        return selectedItem.children;
      } else {
        return null;
      }
    }
  },
  methods: {
    onClickLabel(item) {
      if (this.selected[this.level] === item.name) return;
      var copy = JSON.parse(JSON.stringify(this.selected));
      copy.splice(this.level);
      copy[this.level] = item.name;
      this.notify(copy);
    },
    onUpdateSelected(newSelected) {
      this.notify(newSelected);
    },
    notify(item) {
      this.$emit("selected", item);
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
  overflow: auto;
  .left {
    height: 100%;
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