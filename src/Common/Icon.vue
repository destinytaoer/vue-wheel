<template>
  <svg
    class="icon"
    @click="$emit('click', $event)"
  >
    <use :xlink:href="`#i-${name}`"></use>
  </svg>
</template>
<script>
import("./svg").then(module => {});
export default {
  name: "DIcon",
  props: ["name"]
};
</script>
<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
}
</style>