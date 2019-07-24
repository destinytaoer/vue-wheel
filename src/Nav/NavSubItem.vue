<template>
  <div
    class="nav-sub-item"
    v-click-outside="'open'"
  >
    <span
      class="nav-sub-item-title"
      @click="onClick"
    >{{title}}</span>
    <div
      class="nav-sub-item-popover"
      v-show="open"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
import ClickOutside from "../click-outside";
export default {
  name: "DNavSubItem",
  directives: { ClickOutside },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    onClick() {
      this.open = !this.open;
    }
  }
};
</script>
<style lang="scss" scoped>
.nav-sub-item {
  position: relative;
  user-select: none;
  cursor: pointer;
  &-title {
    display: block;
    padding: 0.5em 1em;
  }
  &-popover {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    background: #fff;
    white-space: nowrap;
    border: 1px solid #ddd;
  }
  & .nav-sub-item {
    background: lightblue;
    .nav-sub-item-popover {
      top: 0;
      left: 100%;
    }
  }
}
</style>