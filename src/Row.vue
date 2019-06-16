<template>
  <div
    class="row"
    :style="rowStyle"
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
    }
  },
  computed: {
    rowStyle() {
      return {
        marginLeft: -gutter/2 + 'px',
        marginRight: -gutter/2 + 'px'
      }
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
}
</style>