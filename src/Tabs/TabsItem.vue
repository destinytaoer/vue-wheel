<template>
  <div
    class="tabs-item"
    @click="selected"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "DTabsItem",
  inject: ["eventBus"],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String | Number,
      required: true
    }
  },
  methods: {
    selected() {
      this.eventBus.$emit("update:selected", this.name);
    }
  },
  created() {
    this.eventBus.$on("update:selected", name => {
      console.log(name);
    });
  }
};
</script>
<style lang="scss" scoped>
</style>