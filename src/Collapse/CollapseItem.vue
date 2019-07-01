<template>
  <div
    class="collapse-item"
    :class="collapseClasses"
  >
    <div
      class="title"
      @click="open"
    >
      {{title}}
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "DCollapseItem",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      collapse: true
    };
  },
  computed: {
    collapseClasses() {
      return {
        close: this.collapse
      };
    }
  },
  methods: {
    open() {
      this.collapse = !this.collapse;
    }
  }
};
</script>
<style lang="scss" scoped>
$border-color: #ddd;
$title-bg: #eee;
$border-radius: 4px;
.collapse-item {
  > .title {
    display: flex;
    align-items: center;
    min-height: 32px;
    padding: 0 8px;
    margin: -1px;
    border: 1px solid $border-color;
    background: $title-bg;
  }
  &:first-child {
    > .title {
      border-top-left-radius: $border-radius;
      border-top-right-radius: $border-radius;
    }
  }
  &:last-child {
    &.close > .title {
      border-bottom-left-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
  }

  > .content {
    padding: 8px;
  }
  &.close > .content {
    display: none;
  }
}
</style>