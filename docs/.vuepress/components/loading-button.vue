<template>
  <div>
    <d-button
      :loading='loading1'
      @click="loading1 = !loading1"
    >点击 loading</d-button>
    <d-button
      icon="settings"
      :loading='loading2'
      @click="loading2 = !loading2"
    >点击 loading</d-button>
    <d-button
      icon="settings"
      icon-pos="right"
      :loading='loading3'
      @click="loading3 = !loading3"
    >点击 loading</d-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading1: false,
      loading2: false,
      loading3: false
    };
  }
};
</script>
<style lang="scss" scoped>
</style>