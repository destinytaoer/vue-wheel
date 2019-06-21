<template>
  <div
    class="popover"
    @click="onClick"
  >
    <div
      class="content-wrapper"
      ref="content"
      v-show="visible"
    >
      <slot name="content"></slot>
    </div>
    <div
      class="trigger-wrapper"
      ref="trigger"
    >
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
    onClick(e) {
      const trigger = this.$refs.trigger;
      const content = this.$refs.content;
      if (trigger && trigger.contains(e.target)) {
        this.visible = !this.visible;
        if (this.visible) {
          this.$nextTick(() => {
            let { top, left } = trigger.getBoundingClientRect();
            content.style.left = left + window.scrollX + "px";
            content.style.top = top + window.scrollY + "px";
          });
        }
      }
    }
  },
  created() {
    document.addEventListener("click", e => {
      const trigger = this.$refs.trigger;
      const content = this.$refs.content;
      if (
        (content && content.contains(e.target)) ||
        (trigger && trigger.contains(e.target))
      )
        return;
      if (this && this.visible) this.visible = false;
    });
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