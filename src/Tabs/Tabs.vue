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
    let itemNames = [];
    let contentNames = [];
    for (const children of this.$children) {
      if (children.$options.name === "DTabsHead") {
        for (const item of children.$children) {
          if (item.$options.name === "DTabsItem") {
            if (itemNames.includes(item.name)) {
              console.warn("d-tab-item 组件的 name 属性应该是唯一的！");
            }
            if (item.disabled && item.name === this.selected) {
              console.warn("拥有 disabled: true 的 d-tab-items 不应该被选中！");
            }
            itemNames.push(item.name);
            item.name === this.selected &&
              this.eventBus.$emit("update:selected", this.selected, item);
          }
        }
      }
      if (children.$options.name === "DTabsBody") {
        for (const item of children.$children) {
          if (item.$options.name === "DTabsContent") {
            if (contentNames.includes(item.name)) {
              console.warn("d-tab-content 组件的 name 属性应该是唯一的!");
            }
            if (!itemNames.includes(item.name)) {
              console.warn(
                "d-tab-content 组件的 name 属性应该有对应的 d-tab-item 组件！"
              );
            }
            contentNames.push(item.name);
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