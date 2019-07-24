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
        <span class="name">{{item.name}}</span>
        <template v-if="loadingItem && item.name === loadingItem.name">
          <d-icon
            class="loading"
            name="loading"
          ></d-icon>
        </template>
        <template v-else>
          <d-icon
            v-if="rightArrowVisible(item)"
            name="right"
          ></d-icon>
        </template>
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
        :load-data="loadData"
        :loading-item="loadingItem"
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
    },
    loadData: {
      type: Function
    },
    loadingItem: {
      type: Object
    }
  },
  data() {
    return {
      loading: false
    };
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
    rightArrowVisible(item) {
      return this.loadData
        ? !item.isLeaf
        : item.children && item.children.length > 0;
    },
    onClickLabel(item) {
      if (!this.rightArrowVisible(item)) {
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
@import "_var";
@import "animate";

.cascader-items {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  .left {
    height: 100%;
    overflow: auto;
  }
  .label {
    display: flex;
    align-items: center;
    padding: 5px 12px;
    min-width: 100px;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      background: $bg-active-light;
    }
    &.active {
      background: $bg-active-light;
      font-weight: 700;
    }
    > .name {
      margin-right: 1em;
      user-select: none;
    }
    > .icon {
      margin-left: auto;
      font-size: 0.5em;
      &.loading {
        animation: spin 2s infinite linear;
      }
    }
  }
  .right {
    height: 100%;
    border-left: 1px solid $border-color-light;
  }
}
</style>