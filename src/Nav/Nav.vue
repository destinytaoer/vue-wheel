<template>
  <div class="nav">
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
      eventBus: this.eventBus
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
  }
};
</script>
<style lang="scss" scoped>
@import "_var";
.nav {
  display: flex;
  color: $color;
}
</style>