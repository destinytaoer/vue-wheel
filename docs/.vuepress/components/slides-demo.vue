<template>
  <d-slides
    delay="1000"
    class="slides-demo"
  >
    <d-slides-item name="1">
      <div class="box">1</div>
    </d-slides-item>
    <d-slides-item name="2">
      <div
        class="box"
        style="background: #3485fb"
      >2</div>
    </d-slides-item>
    <d-slides-item name="3">
      <div
        class="box"
        style="background: #7ab87a"
      >3</div>
    </d-slides-item>
  </d-slides>
</template>
<script>
export default {};
</script>
<style lang="scss">
.box {
  width: 100%;
  height: 300px;
  background: #ddd;
  color: #fff;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.slides-demo {
  .slides-item.slides-enter {
    transform: none;
  }
  .slides-item.slides-enter.reverse {
    transform: none;
    // opacity: 1;
  }
  .slides-item.slides-leave-to {
    transform: none;
    // opacity: 1;
  }
  .slides-item.slides-leave-to.reverse {
    transform: none;
    // opacity: 1;
  }
}
</style>