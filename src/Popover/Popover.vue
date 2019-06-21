<template>
  <div
    class="popover"
    @click.stop="onClick"
  >
    <div
      class="content-wrapper"
      v-show="visible"
      @click.stop
    >
      <slot name="content"></slot>
    </div>
    <slot></slot>
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
    }
  },
  created() {
    document.addEventListener("click", () => {
      if (this && this.visible) this.visible = false;
    });
  }
};
</script>
<style lang="scss" scoped>
.popover {
  display: inline-block;
  position: relative;
  > .content-wrapper {
    position: absolute;
    bottom: 100%;
    background: #fff;
    border: 1px solid red;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  }
}
</style>