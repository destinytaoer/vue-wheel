<template>
  <div
    class="popover"
    @click="onClick"
    ref="popover"
  >
    <div
      class="popover-content-wrapper"
      ref="content"
      :class="{[`position-${position}`]: true}"
      v-show="visible"
    >
      <slot name="content"></slot>
    </div>
    <div class="trigger-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "DPopover",
  props: {
    position: {
      type: String,
      default: "top",
      validator(val) {
        return ["top", "bottom", "left", "right"].includes(val);
      }
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    eventHandler(e) {
      const { popover, content } = this.$refs;
      if (popover && (popover === e.target || popover.contains(e.target))) {
        return;
      }
      if (content && (content === e.target || content.contains(e.target))) {
        return;
      }
      this.hide();
    },
    positionContent() {
      const { popover, content } = this.$refs;
      const position = this.position;
      let { width, height, top, left } = popover.getBoundingClientRect();
      let { height: contentHeight } = content.getBoundingClientRect();
      let positions = {
        top: {
          left: left + window.scrollX,
          top: top + window.scrollY
        },
        bottom: {
          left: left + window.scrollX,
          top: top + height + window.scrollY
        },
        left: {
          left: left + window.scrollX,
          top: top + window.scrollY + (height - contentHeight) / 2
        },
        right: {
          left: left + window.scrollX + width,
          top: top + window.scrollY + (height - contentHeight) / 2
        }
      };
      content.style.left = positions[position].left + "px";
      content.style.top = positions[position].top + "px";
    },
    hide() {
      this.visible = false;
      document.removeEventListener("click", this.eventHandler);
    },
    show() {
      this.visible = true;
      this.$nextTick(() => {
        this.positionContent();
        document.addEventListener("click", this.eventHandler);
      });
    },
    onClick(e) {
      const { popover } = this.$refs;
      if (popover && (popover === e.target || popover.contains(e.target))) {
        if (this.visible) {
          this.hide();
        } else {
          this.show();
        }
      }
    }
  },
  mounted() {
    document.body.appendChild(this.$refs.content);
  }
};
</script>
<style lang="scss" scoped>
$border-color: #333;
$border-radius: 4px;
.popover {
  display: inline-block;
}
.popover-content-wrapper {
  position: absolute;
  max-width: 20em;
  word-break: break-all;
  padding: 0.5em 1em;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  background: #fff;
  // box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
  &::before,
  &::after {
    content: "";
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border: 10px solid transparent;
  }
  &.position-top {
    margin-top: -10px;
    transform: translateY(-100%);
    &::before,
    &::after {
      left: 10px;
      border-bottom: none;
    }
    &::before {
      border-top-color: $border-color;
      top: 100%;
    }
    &::after {
      border-top-color: #fff;
      top: calc(100% - 1px);
    }
  }
  &.position-bottom {
    margin-top: 10px;
    &::before,
    &:after {
      left: 10px;
      border-top: none;
    }
    &::before {
      border-bottom-color: $border-color;
      bottom: 100%;
    }
    &::after {
      border-bottom-color: #fff;
      bottom: calc(100% - 1px);
    }
  }
  &.position-right {
    margin-left: 10px;
    &::before,
    &::after {
      border-left: none;
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      border-right-color: $border-color;
      right: 100%;
    }
    &::after {
      border-right-color: #fff;
      right: calc(100% - 1px);
    }
  }
  &.position-left {
    margin-left: -10px;
    transform: translateX(-100%);
    &::before,
    &::after {
      top: 50%;
      border-right: none;
      transform: translateY(-50%);
    }
    &::before {
      border-left-color: $border-color;
      left: 100%;
    }
    &::after {
      border-left-color: #fff;
      left: calc(100% - 1px);
    }
  }
}
</style>