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
      <div
        class="slides-dots"
        v-if="enabledDots"
      >
        <span
          v-for="n in childrenLength"
          :key="n"
          class="dot"
          :data-index="n - 1"
          :class="{active: selectedIndex === n - 1}"
          @click="onClick(n - 1)"
        > {{showDotsNum ? n : ''}} </span>
      </div>
      <div
        class="slides-arrows"
        v-if="enabledArrows"
      >
        <span
          @click="prev"
          class="arrow"
          data-index="prev"
        >
          <d-icon name="left"></d-icon>
        </span>
        <span
          @click="next"
          class="arrow"
          data-index="next"
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
    delay: {
      type: Number | String,
      default: 1000
    },
    animateTime: {
      type: String | Number,
      default: 1000
    },
    enabledDots: {
      type: Boolean,
      default: true
    },
    showDotsNum: {
      type: Boolean,
      default: true
    },
    enabledArrows: {
      type: Boolean,
      default: true
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
      return Number(this.delay) + Number(this.animateTime);
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
      this.autoTimer = window.setTimeout(this.play, this.delay);
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
        }, Number(this.animateTime));
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
      }, Number(this.animateTime));
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
    &:hover {
      .slides-arrows {
        display: block;
      }
    }
  }
  &-dots {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    padding: 5px 0;
    > .dot {
      display: inline-flex;
      width: 1.2em;
      height: 1.2em;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 1px solid #ddd;
      margin: 0 0.2em;
      background: #eee;
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
    }
  }
  &-arrows {
    display: none;
    > .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1em;
      height: 1.2em;
      font-size: 40px;
      background: rgba(0, 0, 0, 0.2);
      cursor: pointer;
      .icon {
        fill: #eee;
      }
      &:first-child {
        left: 0;
      }
      &:last-child {
        right: 0;
      }
    }
  }
}
</style>