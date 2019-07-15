<template>
  <div class="cascader-items">
    <div class="left">
      <div
        class="label"
        v-for="(item, index) in items"
        :key="index"
        @click="leftSelected = item"
      >
        {{item.name}}
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
  }
};
</script>
<style lang="scss" scoped>
.cascader-items {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>