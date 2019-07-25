<template>
  <div
    class="nav-sub-item"
    :class="{active: active || hover}"
    @mouseenter="show"
    @mouseleave="hide"
  >
    <span class="nav-sub-item-title">{{title}}</span>
    <div
      class="nav-sub-item-popover"
      v-show="open"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "DNavSubItem",
  inject: ["eventBus"],
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      open: false,
      active: false,
      hideTimer: null,
      hover: false
    };
  },
  methods: {
    show() {
      this.hideTimer && window.clearTimeout(this.hideTimer);
      this.open = true;
      this.hover = true;
    },
    hide() {
      this.hideTimer = window.setTimeout(() => {
        this.open = false;
        this.hover = false;
      }, 300);
    },
    searchChildren(children, selected) {
      return children.some(child => {
        return (
          selected.includes(child.name) ||
          (child.$children.length &&
            this.searchChildren(child.$children, selected))
        );
      });
    }
  },
  mounted() {
    this.eventBus.$on("change", selected => {
      this.active = this.searchChildren(this.$children, selected);
      if (this.active) this.hover = false;
    });
  }
};
</script>
<style lang="scss" scoped>
@import "_var";
.nav-sub-item {
  position: relative;
  user-select: none;
  cursor: pointer;
  > .nav-sub-item-title {
    display: block;
    padding: 0.5em 1em;
    white-space: nowrap;
  }
  > .nav-sub-item-popover {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    background: #fff;
    font-size: $font-size;
    min-width: 8em;
    margin-top: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  }
  &.active,
  &:hover {
    > .nav-sub-item-title {
      color: $color-active;
      .icon {
        fill: $color-active;
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        border-bottom: 2px solid $border-color-active;
      }
    }
  }
  & .nav-sub-item {
    > .nav-sub-item-popover {
      top: 0;
      left: 100%;
      margin-left: 5px;
      margin-top: 0;
    }
    &.active,
    &:hover {
      > .nav-sub-item-title {
        background: $border-color-active-light;
        color: $color-active;
        .icon {
          fill: $color-active;
        }
        &::after {
          content: none;
        }
      }
    }
  }
  & .nav-item {
    &.active {
      background: $border-color-active-light;
      &::after {
        content: none;
      }
    }
  }
}
</style>