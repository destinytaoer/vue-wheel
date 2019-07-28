<template>
  <div
    class="nav"
    :class="{vertical}"
  >
    <slot></slot>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "DNav",
  props: {
    selected: {
      type: String
    },
    multiple: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      eventBus: new Vue()
    };
  },
  provide() {
    return {
      eventBus: this.eventBus,
      vertical: this.vertical,
      multiple: this.multiple
    };
  },
  computed: {
    items() {
      return this.$children.filter(child => child.$options.name === "DNavItem");
    }
  },
  methods: {
    notify(selected) {
      this.notifyParent(selected);
      this.notifyChild(selected);
    },
    notifyParent(selected) {
      this.$emit("update:selected", selected);
    },
    notifyChild(selected) {
      this.eventBus.$emit("change", selected);
    },
    setIndex(children, index) {
      if (!children.length > 0) return;
      children.forEach(child => {
        if (child.$options.name === "DNavSubItem") {
          child.index = index;
          this.setIndex(child.$children, index + 1);
        }
        if (child.$options.name === "DNavItem") {
          child.index = index;
        }
      });
    }
  },
  mounted() {
    this.notifyChild(this.selected);
    this.eventBus.$on("select", name => {
      this.notify(name);
    });
    this.setIndex(this.$children, 1);
  }
};
</script>
<style lang="scss" scoped>
@import "_var";
.nav {
  display: flex;
  color: $color;
  user-select: none;
  border-bottom: 1px solid $border-color-light;
  &.vertical {
    width: fit-content;
    flex-direction: column;
    border: 1px solid $border-color-light;
  }
}
</style>