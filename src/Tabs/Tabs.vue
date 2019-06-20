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
    if (!this.$children.length) {
      console.warn(
        "d-tabs 组件的子组件应该拥有 d-tabs-head 和 d-tabs-body 组件"
      );
    }
    let itemNames = [];
    let contentNames = [];
    for (const children of this.$children) {
      if (
        children.$options.name !== "DTabsHead" &&
        children.$options.name !== "DTabsBody"
      )
        console.warn(
          "d-tabs 组件的子组件应该只是 d-tabs-head 和 d-tabs-body 组件"
        );
      if (children.$options.name === "DTabsHead") {
        for (const item of children.$children) {
          if (item.$options.name === "DTabsItem") {
            if (itemNames.includes(item.name)) {
              console.warn("d-tabs-item 组件的 name 属性应该是唯一的！");
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
              console.warn("d-tabs-content 组件的 name 属性应该是唯一的!");
            }
            if (!itemNames.includes(item.name)) {
              console.warn(
                "d-tabs-content 组件的 name 属性应该有对应的 d-tab-item 组件！"
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