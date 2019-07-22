<template>
  <div
    class="slides"
    @mouseenter="pause"
    @mouseleave="playAutomatically"
  >
    <div
      class="slides-window"
      ref="window"
    >
      <slot></slot>
      <div class="slides-dots">
        <span
          v-for="n in childrenLength"
          :key="n"
          :class="{active: selectedIndex === n - 1}"
          @click="select(n - 1)"
        > {{n}} </span>
      </div>
    </div>
  </div>
</template>
<script>
import { clearTimeout } from "timers";
export default {
  name: "DSlides",
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
      clickTimer: null,
      animateTime: 1000
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
      this.childrenLength = this.$children.length;
      this.names = this.$children.map(child => child.name);
      this.selectedIndex = this.names.indexOf(this.selectedName) || 0;
    },
    playAutomatically() {
      if (!this.autoPlay) return;
      if (this.autoTimer) return;
      this.autoTimer = window.setTimeout(this.play, this.duration);
    },
    play() {
      const { names } = this;
      let index = this.selectedIndex + 1;
      if (index === names.length) index = 0;
      if (index === -1) index = names.length - 1;
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
      if (!this.clickTimer) {
        this.lastIndex = this.selectedIndex;
        this.selectedIndex = index;
        this.notify(this.names[index]);
        this.clickTimer = window.setTimeout(() => {
          this.clickTimer = null;
        }, this.animateTime);
      }
    },
    diff(oldIndex, newIndex) {
      if (oldIndex == null) return false;
      let len = this.names.length;
      if (this.autoTimer) {
        if (oldIndex === len - 1 && newIndex === 0) {
          return false;
        }
        if (newIndex === len - 1 && oldIndex === 0) {
          return true;
        }
      }
      return newIndex < oldIndex;
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
        child.reverse = reverse;
        child.selected = selected;
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
}
</style>