<template>
  <div class="slides">
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
        {{selectedName}}
      </div>
    </div>
  </div>
</template>
<script>
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
      default: 2000
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
      clickTimer: null
    };
  },
  computed: {
    selectedName() {
      return this.names && this.names[this.selectedIndex];
    },
    durTime() {
      return Number(this.duration) + 1000;
    }
  },
  methods: {
    initData() {
      this.childrenLength = this.$children.length;
      this.names = this.$children.map(child => child.name);
      this.selectedIndex = this.names.indexOf(this.selectedName) || 0;
    },
    playAutomatically() {
      this.autoTimer = setTimeout(this.play, this.durTime);
    },
    play() {
      const { names } = this;
      let index = this.selectedIndex + 1;
      if (index === names.length) index = 0;
      if (index === -1) index = names.length - 1;
      this.select(index);
    },
    select(index) {
      this.autoTimer && window.clearTimeout(this.autoTimer);
      if (!this.clickTimer) {
        this.lastIndex = this.selectedIndex;
        this.selectedIndex = index;
        this.notify(this.names[index]);
        this.clickTimer = setTimeout(() => {
          this.clickTimer = null;
        }, 1000);
      }
      if (this.autoPlay) this.autoTimer = setTimeout(this.play, this.durTime);
    },
    diff(oldIndex, newIndex) {
      if (oldIndex == null) return false;
      let diff = newIndex - oldIndex;
      let len = this.names.length;

      if (diff === len - 1) {
        return true;
      } else if (diff === 1 - len) {
        return false;
      } else {
        return diff < 0;
      }
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
    if (this.autoPlay) this.playAutomatically();
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
    > span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid #ddd;
      &.active {
        background: red;
      }
    }
  }
}
</style>