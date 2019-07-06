<template>
  <div class="grid-demo">
    <d-row gutter="10">
      <d-col
        span="24"
        :pad="{span: '12'}"
        :narrowPc="{span: '8'}"
        :pc="{span: '6'}"
        :widePc="{span: '4'}"
      >
        <div class="item">{{width}}</div>
      </d-col>
      <d-col
        span="24"
        :pad="{span: '12'}"
        :narrowPc="{span: '8'}"
        :pc="{span: '6'}"
        :widePc="{span: '4'}"
      >
        <div class="item">{{width}}</div>
      </d-col>
      <d-col
        span="24"
        :pad="{span: '12'}"
        :narrowPc="{span: '8'}"
        :pc="{span: '6'}"
        :widePc="{span: '4'}"
      >
        <div class="item">{{width}}</div>
      </d-col>
      <d-col
        span="24"
        :pad="{span: '12'}"
        :narrowPc="{span: '8'}"
        :pc="{span: '6'}"
        :widePc="{span: '4'}"
      >
        <div class="item">{{width}}</div>
      </d-col>
      <d-col
        span="24"
        :pad="{span: '12'}"
        :narrowPc="{span: '8'}"
        :pc="{span: '6'}"
        :widePc="{span: '4'}"
      >
        <div class="item">{{width}}</div>
      </d-col>
      <d-col
        span="24"
        :pad="{span: '12'}"
        :narrowPc="{span: '8'}"
        :pc="{span: '6'}"
        :widePc="{span: '4'}"
      >
        <div class="item">{{width}}</div>
      </d-col>
    </d-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      width: ""
    };
  },
  methods: {
    testWidth(width) {
      if (width >= 1200) {
        this.width = "4";
      } else if (width >= 992 && width < 1200) {
        this.width = "6";
      } else if (width >= 768 && width < 992) {
        this.width = "8";
      } else if (width >= 576 && width < 768) {
        this.width = "12";
      } else {
        this.width = "24";
      }
    }
  },
  mounted() {
    this.testWidth(window.innerWidth);
    window.onresize = e => {
      this.testWidth(e.target.innerWidth);
    };
  }
};
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