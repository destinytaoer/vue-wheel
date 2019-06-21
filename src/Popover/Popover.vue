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
    onClick(event) {
      if (this.$refs.trigger.contains(event.target)) {
        this.visible = !this.visible;
        if (this.visible) {
          setTimeout(() => {
            let { top, left } = this.$refs.trigger.getBoundingClientRect();
            this.$refs.content.style.left = left + window.scrollX + "px";
            this.$refs.content.style.top = top + window.scrollY + "px";
            let eventHandler = e => {
              if (this.$refs.content && this.$refs.content.contains(e.target)) {
              } else {
                console.log("hide");
                this.visible = false;
                console.log("close eventHandler");
                document.removeEventListener("click", eventHandler);
              }
            };
            document.addEventListener("click", eventHandler);
          });
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