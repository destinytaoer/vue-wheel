<template>
  <div
    class="tabs-item"
    :class="itemClasses"
    @click="selected"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "DTabsItem",
  inject: ["eventBus"],
  data() {
    return {
      active: false
    };
  },
  computed: {
    itemClasses() {
      return {
        active: this.active
      };
    }
  },
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
      this.eventBus.$emit("update:selected", this.name, this);
    }
  },
  created() {
    this.eventBus.$on("update:selected", name => {
      this.active = name === this.name;
    });
  }
};
</script>
<style lang="scss" scoped>
.tabs-item {
  display: flex;
  align-items: center;
  padding: 0 1em;
  cursor: pointer;
  &.active {
    color: #1890ff;
    .icon {
      fill: #1890ff;
    }
  }
}
</style>