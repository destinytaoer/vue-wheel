<template>
  <div
    class="popover"
    ref="popover"
  >
    <div
      class="popover-content-wrapper"
      ref="content"
      :class="{[`position-${position}`]: true}"
      v-show="visible"
    >
      <slot
        name="content"
        :hide='hide'
      ></slot>
    </div>
    <div
      class="trigger-wrapper"
      ref="triggerWrapper"
    >
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
    },
    trigger: {
      type: String,
      default: "click",
      validator(val) {
        return ["click", "hover"].includes(val);
      }
    }
  },
  data() {
    return {
      visible: false,
      timer: null
    };
  },
  methods: {
    eventHandler(e) {
      this.timer && window.clearTimeout(this.timer);
      const { popover, content } = this.$refs;
      if (popover && (popover === e.target || popover.contains(e.target))) {
        return;
      }
      if (content && (content === e.target || content.contains(e.target))) {
        return;
      }
      if (this.trigger === "click") {
        this.hide();
      } else {
        this.timer = window.setTimeout(() => {
          this.hide();
        }, 200);
      }
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
      if (!this.visible) return;
      this.visible = false;
      this.$emit("hide");
      if (this.trigger === "click") {
        document.removeEventListener("click", this.eventHandler);
      }
    },
    show() {
      if (this.visible) return;
      this.visible = true;
      this.$emit("show");
      this.$nextTick(() => {
        this.positionContent();
        if (this.trigger === "click") {
          document.addEventListener("click", this.eventHandler);
        }
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
    },
    addPopoverListeners() {
      const { popover } = this.$refs;
      if (this.trigger === "click") {
        popover.addEventListener("click", this.onClick);
      } else {
        popover.addEventListener("mouseenter", this.show);
        document.addEventListener("mouseover", this.eventHandler);
      }
    },
    removePopoverListeners() {
      const { popover } = this.$refs;
      if (this.trigger === "click") {
        popover.removeEventListener("click", this.onClick);
      } else {
        popover.removeEventListener("mouseenter", this.show);
        document.removeEventListener("mouseover", this.eventHandler);
      }
    },
    putBackContent() {
      const { content, popover } = this.$refs;
      if (!content) return;
      popover.appendChild(content);
    }
  },
  mounted() {
    document.body.appendChild(this.$refs.content);
    this.addPopoverListeners();
  },
  beforeDestroy() {
    this.putBackContent();
    this.removePopoverListeners();
  }
};
</script>
<style lang="scss" scoped>
@import "_var";
$margin: 13px;
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
  z-index: 1000;
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
    margin-top: -$margin;
    transform: translateY(-100%);
    &::before,
    &::after {
      left: 10px;
      border-bottom-width: 4px;
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
    margin-top: $margin;
    &::before,
    &:after {
      left: 10px;
      border-top-width: 4px;
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
    margin-left: $margin;
    &::before,
    &::after {
      border-left-width: 4px;
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
    margin-left: -$margin;
    transform: translateX(-100%);
    &::before,
    &::after {
      border-right-width: 4px;
      top: 50%;
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