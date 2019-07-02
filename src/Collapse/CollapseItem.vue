<template>
  <div
    class="collapse-item"
    :class="collapseClasses"
  >
    <div
      class="title"
      @click="toggle"
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
  inject: ["eventBus"],
  props: {
    title: {
      type: String,
      required: true
    },
    name: {
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
    toggle() {
      // 只通知父组件
      if (this.collapse) {
        this.eventBus.$emit("add", this.name);
      } else {
        this.eventBus.$emit("remove", this.name);
      }
    },
    close() {
      this.collapse = true;
    },
    open() {
      this.collapse = false;
    }
  },
  mounted() {
    // 接受父组件的通知进行状态更新
    this.eventBus.$on("selected", names => {
      if (names.includes(this.name)) {
        this.open();
      } else {
        this.close();
      }
    });
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