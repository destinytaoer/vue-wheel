<template>
  <div
    class="iconlist-item"
    :title="name"
  >
    <d-icon
      class="icon-item"
      :name="name"
    ></d-icon>
    <div
      v-if="hasTitle"
      class="title"
    >{{name}}</div>
  </div>
</template>
<script>
export default {
  name: "iconlist-item",
  props: {
    name: {
      type: String
    },
    hasTitle: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style lang="scss" scoped>
.iconlist-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  .icon-item {
    width: 40px;
    height: 40px;
  }
  .title {
    margin-top: 10px;
  }
}
</style>