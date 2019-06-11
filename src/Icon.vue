<template>
  <svg class="icon">
    <use :xlink:href="`#i-${name}`"></use>
  </svg>
</template>
<script>
export default {
  props: ["name"]
};
</script>
<style lang="scss">
</style>