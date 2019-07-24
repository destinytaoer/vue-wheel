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
.nav-item {
  padding: 0.5em 1em;
  user-select: none;
  cursor: pointer;
  &.active {
    background: red;
  }
}
</style>