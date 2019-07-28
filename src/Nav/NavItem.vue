<template>
  <div
    class="nav-item"
    @click="onClick"
    :class="{active: isSelected, vertical}"
    :data-name="name"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "DNavItem",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  inject: ["eventBus", "vertical"],
  data() {
    return {
      isSelected: false,
      index: 0
    };
  },
  methods: {
    onClick() {
      let a = this.$el.getElementsByTagName("a");
      if (a.length > 0) a[0].click();
      if (!this.isSelected) {
        this.eventBus.$emit("select", this.name);
      }
    }
  },
  mounted() {
    this.eventBus.$on("change", selected => {
      this.isSelected = selected === this.name;
    });
    this.$nextTick(() => {
      if (this.vertical)
        this.$el.style.paddingLeft = `${(this.index + 1) * 0.5}em`;
    });
  }
};
</script>
<style lang="scss" scoped>
@import "_var";
.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5em 1em;
  cursor: pointer;
  background: $bg;
  white-space: nowrap;
  a {
    color: inherit;
    text-decoration: none;
  }
  &.active {
    color: $color-active;
    .icon {
      fill: $color-active;
    }
    &::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      z-index: 500;
      width: 100%;
      height: 0;
      border-bottom: 2px solid $border-color-active;
    }
    &.vertical::after {
      top: 0;
      right: -1px;
      left: auto;
      bottom: auto;
      width: 0;
      height: 100%;
      border-right: 2px solid $border-color-active;
      border-bottom: none;
    }
  }
  &:hover {
    color: $color-active;
    .icon {
      fill: $color-active;
    }
  }
}
.nav-sub-item .nav-item {
  &.active {
    background: $border-color-active-light;
    &::after {
      content: none;
    }
  }
}
</style>