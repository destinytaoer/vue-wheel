<template>
  <div class="cascader-items">
    <div class="left">
      <div
        class="label"
        v-for="(item, index) in items"
        :key="index"
        @click="leftSelected = item"
        :class="{active: item === leftSelected}"
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
      <d-cascader-items :items="rightItems"></d-cascader-items>
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
    }
  },
  data() {
    return {
      leftSelected: null
    };
  },
  computed: {
    rightItems() {
      if (this.leftSelected && this.leftSelected.children) {
        return this.leftSelected.children;
      } else {
        return null;
      }
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
  }
  .label {
    display: flex;
    align-items: center;
    padding: 0 10px;
    cursor: pointer;
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