<template>
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
</template>
<script>
export default {
  name: "DToast",
  props: {
    autoClose: {
      type: Boolean,
      default: true
    },
    autoCloseDelay: {
      type: Number,
      default: 5
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
        }, this.autoCloseDelay * 1000);
      }
    },
    close() {
      this.$el.remove();
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
.toast {
  display: flex;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
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
</style>