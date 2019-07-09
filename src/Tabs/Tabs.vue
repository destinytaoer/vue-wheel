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
      eventBus: new Vue(),
      itemNames: [],
      contentNames: []
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
    }
  },
  methods: {
    selectTab() {
      for (let children of this.$children) {
        if (children.$options.name === "DTabsHead") {
          for (let vm of children.$children) {
            vm.name === this.selected &&
              this.eventBus.$emit("update:selected", this.selected, vm);
          }
        }
      }
    },
    checkChild() {
      if (!this.$children.length) {
        console.warn(
          "d-tabs 组件的子组件应该拥有 d-tabs-head 和 d-tabs-body 组件"
        );
      }
      for (const children of this.$children) {
        if (
          children.$options.name !== "DTabsHead" &&
          children.$options.name !== "DTabsBody"
        )
          console.warn(
            "d-tabs 组件的子组件应该只能是 d-tabs-head 和 d-tabs-body 组件"
          );
        if (children.$options.name === "DTabsHead") {
          this.checkHeadChild(children);
        }
        if (children.$options.name === "DTabsBody") {
          this.checkBodyChild(children);
        }
      }
    },
    checkHeadChild(head) {
      let { itemNames, contentNames } = this;
      for (const children of head.$children) {
        if (children.$options.name === "DTabsItem") {
          if (itemNames.includes(children.name)) {
            console.warn("d-tabs-item 组件的 name 属性应该是唯一的！");
          }
          if (children.disabled && children.name === this.selected) {
            console.warn("拥有 disabled: true 的 d-tab-items 不应该被选中！");
          }
          itemNames.push(children.name);
          this.selectTab(children);
        }
      }
    },
    checkBodyChild(body) {
      let { itemNames, contentNames } = this;
      for (const children of body.$children) {
        if (children.$options.name === "DTabsContent") {
          if (contentNames.includes(children.name)) {
            console.warn("d-tabs-content 组件的 name 属性应该是唯一的!");
          }
          if (!itemNames.includes(children.name)) {
            console.warn(
              "d-tabs-content 组件的 name 属性应该有对应的 d-tab-item 组件！"
            );
          }
          contentNames.push(children.name);
        }
      }
    }
  },
  created() {
    if (this.eventBus) {
      this.eventBus.$on("update:selected", name => {
        this.$emit("update:selected", name);
      });
    }
  },
  mounted() {
    this.checkChild();
    this.selectTab();
  }
};
</script>
<style lang="scss" scoped>
.tabs {
  display: flex;
  flex-direction: column;
}
</style>