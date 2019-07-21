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
        > {{n}} </span>
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
      deafult: true
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
      childrenLength: 0
    };
  },
  computed: {
    selectedIndex() {
      return this.names.indexOf(this.selected) || 0;
    },
    selectedName() {
      return this.selected || this.$children[0].name;
    }
  },
  methods: {
    initData() {
      this.childrenLength = this.$children.length;
      this.names = this.$children.map(child => child.name);
    },
    playAutomatically() {
      const { names } = this;
      let index = names.indexOf(this.selectedName);
      let run = () => {
        index--;
        if (index === names.length) index = 0;
        if (index === -1) index = names.length - 1;
        this.notifyParent(names[index]);
        setTimeout(run, this.duration);
      };
      setTimeout(run, this.duration);
    },
    notifyParent(selected) {
      this.$emit("update:selected", selected);
      this.notifyChild(selected);
    },
    notifyChild(selected) {
      const { names } = this;
      this.$children.forEach(child => {
        child.selected = selected;
        let newIndex = names.indexOf(selected);
        let curIndex = names.indexOf(child.name);
        child.reverse = newIndex > curIndex ? false : true;
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