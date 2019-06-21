<template>
  <div
    class="popover"
    @click.stop="onClick"
  >
    <div
      class="content-wrapper"
      ref="content"
      v-show="visible"
      @click.stop
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
    onClick() {
      this.visible = !this.visible;
      this.$nextTick(() => {
        let { top, left } = this.$refs.trigger.getBoundingClientRect();
        this.$refs.content.style.left = left + "px";
        this.$refs.content.style.top = top + "px";
      });
    }
  },
  created() {
    document.addEventListener("click", () => {
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