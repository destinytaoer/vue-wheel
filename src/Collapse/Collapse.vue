<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "DCollapse",
  props: {
    single: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      eventBus: new Vue(),
      selectedArr: this.selected
    };
  },
  provide() {
    return {
      eventBus: this.eventBus
    };
  },
  methods: {
    notify() {
      // 通知子组件
      this.eventBus.$emit("selected", this.selectedArr);
      // 通知外部
      this.$emit("update:selected", this.selectedArr);
    },
    add(name) {
      if (this.single) {
        this.selectedArr = [name];
      } else {
        this.selectedArr.push(name);
      }
      this.notify();
    },
    remove(name) {
      let index = this.selectedArr.indexOf(name);
      this.selectedArr.splice(index, 1);
      this.notify();
    }
  },
  mounted() {
    // 初始时通知子元素是否应该选中
    this.eventBus.$emit("selected", this.selected);
    this.eventBus.$on("add", name => {
      this.add(name);
    });
    this.eventBus.$on("remove", name => {
      this.remove(name);
    });
  }
};
</script>
<style lang="scss" scoped>
@import "_var";
.collapse {
  border: 1px solid $border-color;
  border-radius: $border-radius;
}
</style>