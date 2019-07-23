<template>
  <div
    class="slides"
    @mouseenter="pause"
    @mouseleave="playAutomatically"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div
      class="slides-window"
      ref="window"
    >
      <slot></slot>
      <div class="slides-dots">
        <span
          @click="prev"
          data-index="prev"
        >
          <d-icon name="left"></d-icon>
        </span>
        <span
          v-for="n in childrenLength"
          :key="n"
          :data-index="n - 1"
          :class="{active: selectedIndex === n - 1}"
          @click="onClick(n - 1)"
        > {{n}} </span>
        <span
          @click="next"
          data-index="prev"
        >
          <d-icon name="right"></d-icon>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import DIcon from "../Common/Icon";
export default {
  name: "DSlides",
  components: {
    DIcon
  },
  props: {
    selected: {
      type: String
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number || String,
      default: 1000
    },
    transition: {
      type: String,
      default: "slide"
    }
  },
  data() {
    return {
      names: null,
      lastIndex: null,
      selectedIndex: 0,
      childrenLength: 0,
      autoTimer: null,
      selectTimer: null,
      animateTime: 1000,
      startTouch: null,
      endTouch: null,
      isClick: false
    };
  },
  computed: {
    selectedName() {
      return this.names && this.names[this.selectedIndex];
    },
    durTime() {
      return Number(this.duration) + this.animateTime;
    }
  },
  methods: {
    initData() {
      let children = this.$children.filter(child => {
        return child.$options.name === "DSlidesItem";
      });
      this.childrenLength = children.length;
      this.names = children.map(child => child.name);
      let index = this.names.indexOf(this.selected);
      this.selectedIndex = index > -1 ? index : 0;
    },
    playAutomatically() {
      if (!this.autoPlay) return;
      if (this.autoTimer) return;
      this.autoTimer = window.setTimeout(this.play, this.duration);
    },
    play() {
      let index = this.processIndex(this.selectedIndex + 1);
      this.select(index);
      this.autoTimer = window.setTimeout(this.play, this.durTime);
    },
    pause() {
      if (!this.autoPlay) return;
      this.autoTimer && window.clearTimeout(this.autoTimer);
      this.autoTimer = null;
    },
    select(index) {
      if (this.selectedIndex === index) return;
      if (!this.selectTimer) {
        this.lastIndex = this.selectedIndex;
        this.selectedIndex = index;
        this.notify(this.names[index]);
        this.selectTimer = window.setTimeout(() => {
          this.selectTimer = null;
        }, this.animateTime);
      }
    },
    onClick(index) {
      this.isClick = true;
      this.select(index);
      this.isClick = false;
    },
    prev() {
      let index = this.processIndex(this.selectedIndex - 1);
      this.select(index);
    },
    next() {
      let index = this.processIndex(this.selectedIndex + 1);
      this.select(index);
    },
    onTouchStart(e) {
      this.pause();
      // 触控点有多个，则不认为其在滑动
      if (e.touches.length > 1) return;
      this.startTouch = e.touches[0];
    },
    onTouchEnd(e) {
      this.endTouch = e.changedTouches[0];
      let { clientX: x1, clientY: y1 } = this.startTouch;
      let { clientX: x2, clientY: y2 } = this.endTouch;
      let deltaX = Math.abs(x2 - x1);
      // x 距离小于 10，则不认为滑动
      if (deltaX < 10) return;
      let deltaY = Math.abs(y2 - y1);
      let distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
      // 判断滑动角度是否大于 30 度，不大于则说明用户在上下滑动而不是左右滑动
      // 斜率 > 2 则小于 30 度
      let slope = distance / deltaY;
      if (slope < 2) return;
      if (x2 > x1) {
        this.prev();
      } else {
        this.next();
      }
      setTimeout(() => {
        this.playAutomatically();
      }, this.animateTime);
    },
    diff(oldIndex, newIndex) {
      if (oldIndex == null) return false;
      let len = this.names.length;
      if (!this.isClick) {
        // 无缝轮播，只有 dots click 时，才不是无缝轮播
        if (oldIndex === len - 1 && newIndex === 0) {
          return false;
        }
        if (newIndex === len - 1 && oldIndex === 0) {
          return true;
        }
      }
      return newIndex < oldIndex;
    },
    processIndex(index) {
      const { names } = this;
      if (index === names.length) return 0;
      if (index === -1) return names.length - 1;
      return index;
    },
    notify(selected) {
      this.notifyParent(selected);
      this.notifyChild(selected);
    },
    notifyParent(selected) {
      this.$emit("update:selected", selected);
    },
    notifyChild(selected) {
      const { names } = this;
      let reverse = this.diff(this.lastIndex, this.selectedIndex);
      this.$children.forEach(child => {
        if (child.$options.name === "DSlidesItem") {
          child.reverse = reverse;
          child.selected = selected;
        }
      });
    }
  },
  mounted() {
    this.initData();
    this.notifyChild(this.selectedName);
    this.playAutomatically();
  }
};
</script>
<style lang="scss" scoped>
.slides {
  &-window {
    position: relative;
    overflow: hidden;
  }
  &-dots {
    padding: 4px 0;
    display: flex;
    justify-content: center;
    > span {
      display: inline-flex;
      width: 1.2em;
      height: 1.2em;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 1px solid #ddd;
      margin: 0 0.2em;
      background: #ddd;
      &:hover {
        cursor: pointer;
        background: #bbb;
      }
      &.active {
        background: black;
        color: #fff;
        &:hover {
          cursor: default;
        }
      }
      > .icon {
        transform: scale(0.8);
      }
    }
  }
}
</style>