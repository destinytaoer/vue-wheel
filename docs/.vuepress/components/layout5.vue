<template>
  <d-layout style="height: 300px">
    <d-header>
      <div class="demo-header">header</div>
    </d-header>
    <d-layout>
      <d-sider>
        <div class="demo-sider1">sider</div>
      </d-sider>
      <d-content>
        <div class="demo-content">content</div>
      </d-content>
      <d-sider>
        <div class="demo-sider2">sider</div>
      </d-sider>
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
.demo-sider1,
.demo-sider2 {
  border: 1px solid #ddd;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.demo-header {
  margin-bottom: 10px;
}
.demo-sider1,
.demo-sider2,
.demo-content {
  height: 100%;
}
.demo-sider1 {
  margin-right: 10px;
  width: 100px;
}
.demo-sider2 {
  margin-left: 10px;
  width: 100px;
}
.demo-footer {
  margin-top: 10px;
}
</style>