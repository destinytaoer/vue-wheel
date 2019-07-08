<template>
  <div class="cascader-item">
    {{sourceItem.name}}
    <template v-for="(item, index) in sourceItem.children">
      <d-cascader-item
        :sourceItem="item"
        :key="index"
      ></d-cascader-item>
    </template>
  </div>
</template>
<script>
export default {
  name: "DCascaderItem",
  props: {
    sourceItem: {
      type: Object
    }
  }
};
</script>
<style lang="scss" scoped>
.cascader-item {
  margin-left: 10px;
}
</style>