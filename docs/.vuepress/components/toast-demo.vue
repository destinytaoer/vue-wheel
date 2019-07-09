<template>
  <div class="toast-demo">
    <d-button @click="showToast('top')">show toast top</d-button>
    <d-button @click="showToast('bottom')">show toast bottom</d-button>
    <d-button @click="showToast('middle')">show toast middle</d-button>
  </div>
</template>
<script>
export default {
  name: "toast-demo",
  methods: {
    showToast(position) {
      this.$toast(`Toast ${position}`, {
        autoClose: 1,
        position,
        enableButton: true
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>