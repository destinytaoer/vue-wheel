<template>
  <div class="col" :class="`col-${span}`">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'DCol',
  props: {
    span: {
      type: [Number, String]
    }
  }
}
</script>
<style lang="scss" scoped>
.col {
  height: 100px;
  width: 100%;
  border: 1px solid #ccc;

  $class-prefix: col-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      width: ($n / 24) * 100%;
    }
  }
}
</style>
