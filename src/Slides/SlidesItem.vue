<template>
  <div>
    <template v-if="animationEnabled">
      <transition name="slide">
        <div
          class="slides-item"
          v-show="show"
          :class="{reverse}"
        >
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-else>
      <div
        class="slides-item"
        v-show="show"
        :class="{reverse}"
      >
        <slot></slot>
      </div>
    </template>
  </div>

</template>
<script>
export default {
  name: "DSlidesItem",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selected: null,
      reverse: false,
      animationEnabled: false
    };
  },
  updated() {
    this.animationEnabled = true;
  },
  computed: {
    show() {
      return this.name === this.selected;
    }
  }
};
</script>
<style lang="scss" scoped>
.slides-item {
  width: 100%;
  height: 100%;
}
.slide-leave-active {
  position: absolute;
  top: 0;
  left: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 1s linear;
}
.slide-enter {
  transform: translateX(100%) scale(0);
}
.slide-enter.reverse {
  transform: translateX(-100%) scale(0);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-100%) scale(0);
  opacity: 0;
}
.slide-leave-to.reverse {
  transform: translateX(100%) scale(0);
  opacity: 0;
}
</style>