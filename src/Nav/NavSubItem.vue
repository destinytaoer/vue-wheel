<template>
  <div
    class="nav-sub-item"
    :class="{active}"
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
      active: false
    };
  },
  methods: {
    show() {
      this.open = true;
    },
    hide() {
      this.open = false;
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
    border: 1px solid #ddd;
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