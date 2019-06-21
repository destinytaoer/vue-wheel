<template>
  <div
    class="popover"
    @click="onClick"
    ref="popover"
  >
    <div
      class="content-wrapper"
      ref="content"
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
      let { top, left } = popover.getBoundingClientRect();
      content.style.left = left + window.scrollX + "px";
      content.style.top = top + window.scrollY + "px";
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
.popover {
  display: inline-block;
}
.content-wrapper {
  position: absolute;
  background: #fff;
  border: 1px solid red;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  transform: translateY(-100%);
}
</style>