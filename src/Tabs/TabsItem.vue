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
        active: this.active,
        disabled: this.disabled
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
      if (this.disabled) return;
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
$active-color: #1890ff;
$disabled-color: #ddd;
.tabs-item {
  display: flex;
  align-items: center;
  padding: 0 1em;
  cursor: pointer;
  &.active {
    color: $active-color;
    .icon {
      fill: $active-color;
    }
  }
  &.disabled {
    color: $disabled-color;
  }
}
</style>