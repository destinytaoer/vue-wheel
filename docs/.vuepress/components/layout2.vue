<template>
  <d-layout style="height: 300px">
    <d-header>
      <div class="demo-header">header</div>
    </d-header>
    <d-layout>
      <d-sider>
        <div class="demo-sider">sider</div>
      </d-sider>
      <d-content>
        <div class="demo-content">content</div>
      </d-content>
    </d-layout>
    <d-footer>
      <div class="demo-footer">footer</div>
    </d-footer>
  </d-layout>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.demo-header,
.demo-footer,
.demo-content,
.demo-sider {
  border: 1px solid #ddd;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.demo-header {
  margin-bottom: 10px;
}
.demo-sider,
.demo-content {
  height: 100%;
}
.demo-sider {
  margin-right: 10px;
  width: 100px;
}
.demo-footer {
  margin-top: 10px;
}
</style>