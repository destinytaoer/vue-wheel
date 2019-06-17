<template>
  <div
    class="row"
    :style="rowStyle"
    :class="rowClass"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "DRow",
  props: {
    gutter: {
      type: [Number, String]
    },
    align: {
      type: String,
      validator(val) {
        return ["left", "right", "center"].includes(val);
      }
    }
  },
  computed: {
    rowStyle() {
      return {
        marginLeft: -this.gutter / 2 + "px",
        marginRight: -this.gutter / 2 + "px"
      };
    },
    rowClass() {
      let { align } = this;
      return [align && `align-${align}`];
    }
  },
  mounted() {
    console.log(this.$children);
    this.$children.forEach(vm => {
      vm.gutter = this.gutter;
    });
  }
};
</script>
<style lang="scss">
.row {
  display: flex;
  flex-wrap: wrap;
  &.align-left {
    justify-content: flex-start;
  }
  &.align-right {
    justify-content: flex-end;
  }
  &.align-center {
    justify-content: center;
  }
}
</style>