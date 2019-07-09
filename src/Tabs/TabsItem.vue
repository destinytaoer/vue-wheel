<template>
  <div
    class="tabs-item"
    :class="itemClasses"
    @click="selected"
    :data-name="name"
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
      if (this.eventBus) {
        this.eventBus.$emit("update:selected", this.name, this);
      }
      this.$emit("click", this);
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
@import "../_var";

.tabs-item {
  display: flex;
  align-items: center;
  padding: 0 1em;
  line-height: 35px;
  cursor: pointer;
  .icon:first-child {
    margin-right: 5px;
  }
  .icon:last-child {
    margin-left: 5px;
  }
  &.active {
    color: $color-active;
    .icon {
      fill: $color-active;
    }
  }
  &.disabled {
    color: $color-disabled;
    cursor: not-allowed;
  }
}
</style>