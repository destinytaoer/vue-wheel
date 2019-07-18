<template>
  <d-collapse
    :selected.sync="selected"
    single
  >
    <d-collapse-item
      title="标题1"
      name="1"
    >内容1</d-collapse-item>
    <d-collapse-item
      title="标题2"
      name="2"
    >内容2</d-collapse-item>
    <d-collapse-item
      title="标题3"
      name="3"
    >内容3</d-collapse-item>
  </d-collapse>
</template>
<script>
export default {
  data() {
    return {
      selected: []
    };
  }
};
</script>
<style lang="scss" scoped>
</style>