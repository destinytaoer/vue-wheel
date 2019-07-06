<template>
  <div class="grid-demo">
    <d-row gutter="10">
      <d-col span="8">
        <div class="item">8</div>
      </d-col>
      <d-col span="8">
        <div class="item">8</div>
      </d-col>
      <d-col span="8">
        <div class="item">8</div>
      </d-col>
    </d-row>
    <d-row gutter="10">
      <d-col span="6">
        <div class="item">6</div>
      </d-col>
      <d-col span="6">
        <div class="item">6</div>
      </d-col>
      <d-col span="6">
        <div class="item">6</div>
      </d-col>
      <d-col span="6">
        <div class="item">6</div>
      </d-col>
    </d-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.row {
  margin-bottom: 10px;
  .col {
    .item {
      border: 1px solid #ddd;
      height: 50px;
      text-align: center;
      line-height: 50px;
    }
  }
}
</style>