<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "DTabs",
  data() {
    return {
      eventBus: new Vue()
    };
  },
  provide() {
    return {
      eventBus: this.eventBus
    };
  },
  props: {
    selected: {
      types: String,
      required: true
    },
    direction: {
      type: String,
      default: "horizontal",
      validator(val) {
        return ["horizontal", "vertical"].includes(val);
      }
    }
  },
  created() {
    this.eventBus.$on("update:selected", name => {
      this.$emit("update:selected", name);
    });
  },
  mounted() {
    for (const children of this.$children) {
      if (children.$options.name === "DTabsHead") {
        for (const item of children.$children) {
          if (item.$options.name === "DTabsItem") {
            item.name === this.selected &&
              this.eventBus.$emit("update:selected", this.selected, item);
          }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tabs {
  display: flex;
  flex-direction: column;
}
</style>