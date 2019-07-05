<template>
  <d-input
    v-model="message"
    @input="validate"
    :error="error"
  ></d-input>
</template>
<script>
export default {
  data() {
    return {
      message: "vue",
      error: "不能少于 6 个字"
    };
  },
  methods: {
    validate(val) {
      if (val.length > 6) {
        this.error = "";
      } else {
        this.error = "不能少于 6 个字";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>