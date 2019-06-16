<template>
  <div class="row">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'DRow'
}
</script>
<style lang="scss">
.row {
  display: flex;
  flex-direction: row;
}
</style>