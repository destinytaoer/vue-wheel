<template>
  <div
    class="tabs-content"
    :class="contentClasses"
    v-if="active"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "DTabsContent",
  inject: ["eventBus"],
  data() {
    return {
      active: false
    };
  },
  props: {
    name: {
      type: String
    }
  },
  computed: {
    contentClasses() {
      return {
        active: this.active
      };
    }
  },
  created() {
    if (this.eventBus) {
      this.eventBus.$on("update:selected", name => {
        this.active = name === this.name;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.tabs-content {
  &.active {
    // background: red;
  }
}
</style>