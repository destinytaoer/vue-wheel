<template>
  <div>
    <d-input v-model="message"></d-input>
    {{message}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "Vue Wheel"
    };
  }
};
</script>
<style lang="scss" scoped>
</style>