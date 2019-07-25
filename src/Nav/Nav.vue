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
      type: Array,
      default() {
        return [];
      }
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
      eventBus: new Vue(),
      selectedArr: JSON.parse(JSON.stringify(this.selected))
    };
  },
  provide() {
    return {
      eventBus: this.eventBus,
      vertical: this.vertical
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
    this.notifyChild(this.selectedArr);
    this.eventBus.$on("select", name => {
      if (this.multiple) {
        this.selectedArr.push(name);
      } else {
        this.selectedArr = [name];
      }
      this.notify(this.selectedArr);
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