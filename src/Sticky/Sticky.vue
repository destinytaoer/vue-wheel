<template>
  <div
    class="sticky-wrapper"
    ref="stickyWrapper"
    :style="{height}"
  >
    <div
      class="sticky-inner"
      :class="classes"
      :style="{width, left, top}"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "sticky",
  props: {
    distance: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      sticky: false,
      width: undefined,
      height: undefined,
      left: undefined,
      top: undefined
    };
  },
  computed: {
    classes() {
      return {
        stickyed: this.sticky
      };
    }
  },
  methods: {
    getTop() {
      let { top } = this.$refs.stickyWrapper.getBoundingClientRect();
      // 因为页面滚动后再刷新,还是滚动的状态, 所以可能出现一开始就已经滚动了
      // 获得的是元素距离文档顶部的距离
      return top + window.scrollY;
    },
    _scrollHandler() {
      // 必须是箭头函数
      if (window.scrollY > this.stickyTop) {
        let {
          left,
          width,
          height
        } = this.$refs.stickyWrapper.getBoundingClientRect();
        this.left = left + "px";
        this.width = width + "px";
        this.height = height + "px";
        this.top = this.distance + "px";
        // 计算宽高固定之后,再进行脱离文档流, 防止出现内容空掉一块, 滚动消失问题
        this.sticky = true;
      } else {
        this.left = undefined;
        this.width = undefined;
        this.height = undefined;
        this.top = undefined;
        this.sticky = false;
      }
    }
  },
  mounted() {
    // 由于高度/宽度等可能可变的, 比如图片需要加载之后才能知道高度, 所以只能在元素 sticky 的时候, 再计算宽高
    // top 只取一次就可以了
    this.stickyTop = this.getTop() - this.distance;
    this.scrollHandler = this._scrollHandler.bind(this);
    window.addEventListener("scroll", this.scrollHandler);
  },
  beforeDestroy() {
    // 注意:绑定的事件一定要在组件销毁前移除
    window.removeEventListener("scroll", this.scrollHandler);
  }
};
</script>
<style lang="scss" scoped>
.sticky-wrapper {
  .sticky-inner.stickyed {
    background: red;
    position: fixed;
    z-index: 1000;
  }
}
</style>