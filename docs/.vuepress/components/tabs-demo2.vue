<template>
  <div class="tabs-demo">
    <d-tabs :selected.sync="selectedTab">
      <d-tabs-head>
        <d-tabs-item name="woman">
          <d-icon name="settings"></d-icon>美女
        </d-tabs-item>
        <d-tabs-item name="sports">
          <d-icon name="warn"></d-icon>体育
        </d-tabs-item>
        <d-tabs-item name="it">
          <d-icon name="info"></d-icon>IT
        </d-tabs-item>
      </d-tabs-head>
      <d-tabs-body>
        <d-tabs-content name="woman">美女</d-tabs-content>
        <d-tabs-content name="sports">体育</d-tabs-content>
        <d-tabs-content name="it">IT</d-tabs-content>
      </d-tabs-body>
    </d-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedTab: "sports"
    };
  }
};
</script>
<style lang="scss" scoped>
</style>