<template>
  <div
    class="toast-wrapper"
    :class="toastClasses"
  >
    <div class="toast">
      <div class="message">
        <slot v-if="!enableHtml"></slot>
        <div
          v-else
          v-html="$slots.default[0]"
        ></div>
      </div>
      <div
        class="close"
        v-if="closeButton && enableButton"
        @click="onClickClose"
      >{{closeButton.text}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DToast",
  props: {
    autoClose: {
      type: [Boolean, Number],
      default: 5,
      validator(val) {
        return val === false || typeof val === "number";
      }
    },
    enableButton: {
      type: Boolean,
      default: false
    },
    closeButton: {
      type: Object,
      default() {
        return {
          text: "关闭",
          callback: null
        };
      }
    },
    enableHtml: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "top",
      validator(val) {
        return ["top", "bottom", "middle"].includes(val);
      }
    }
  },
  computed: {
    toastClasses() {
      return {
        [`position-${this.position}`]: true
      };
    }
  },
  mounted() {
    this.execAutoClose();
  },
  methods: {
    execAutoClose() {
      if (this.autoClose) {
        setTimeout(() => {
          this.close();
        }, this.autoClose * 1000);
      }
    },
    close() {
      this.$el.remove();
      this.$emit("close");
      this.$destroy();
    },
    onClickClose() {
      this.close();
      if (this.closeButton && typeof this.closeButton.callback === "function") {
        this.closeButton.callback(this);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$font-size: 14px;
$bg: rgba(0, 0, 0, 0.75);
$animte-delay: 500ms;
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.toast-wrapper {
  position: fixed;
  transform: translateX(-50%);
  left: 50%;
  width: fit-content;
  &.position-top {
    top: 0;
    .toast {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      animation: slideDown $animte-delay;
    }
  }
  &.position-bottom {
    bottom: 0;
    .toast {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      animation: slideUp $animte-delay;
    }
  }
  &.position-middle {
    top: 50%;
    transform: translate(-50%, -50%);
    .toast {
      animation: fadeIn $animte-delay;
    }
  }
  .toast {
    display: flex;
    padding: 0 16px;
    line-height: 1.8;
    font-size: $font-size;
    border-radius: 4px;
    background: $bg;
    color: #eee;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
    .message {
      word-break: break-all;
      padding: 5px 0;
    }
    .close {
      display: flex;
      align-items: center;
      margin-left: 16px;
      padding-left: 16px;
      border-left: 1px solid #ccc;
      flex-shrink: 0;
      cursor: pointer;
    }
  }
}
</style>