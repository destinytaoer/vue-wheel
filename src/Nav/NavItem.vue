<template>
  <div
    class="nav-item"
    @click="onClick"
    :class="{active: isSelected}"
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
  inject: ["eventBus"],
  data() {
    return {
      isSelected: false
    };
  },
  methods: {
    onClick() {
      if (!this.isSelected) {
        this.eventBus.$emit("select", this.name);
      }
    }
  },
  mounted() {
    this.eventBus.$on("change", selected => {
      this.isSelected = selected.includes(this.name);
    });
  }
};
</script>
<style lang="scss" scoped>
@import "_var";
.nav-item {
  position: relative;
  padding: 0.5em 1em;
  user-select: none;
  cursor: pointer;
  &.active {
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
  &:hover {
    color: $color-active;
  }
}
</style>