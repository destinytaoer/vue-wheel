<template>
  <div
    class="nav-sub-item"
    :class="{active: active, vertical}"
    @mouseenter="show"
    @mouseleave="hide"
  >
    <span
      class="nav-sub-item-title"
      @click="toggle"
    >
      <span class="title">
        {{title}}
      </span>
      <template v-if="vertical || isFirstSub">
        <d-icon
          class="down"
          :class="{active: open}"
          name="down"
        ></d-icon>
      </template>
      <template v-else>
        <d-icon
          class="right"
          :class="{active: open}"
          name="right"
        ></d-icon>
      </template>
    </span>
    <template v-if="vertical">
      <transition
        name="zoom"
        @enter="enter"
        @after-enter="afterEnter"
        @after-leave="afterLeave"
        @leave="leave"
      >
        <div
          class="nav-sub-item-popover"
          v-show="open"
        >
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-else>
      <div
        class="nav-sub-item-popover"
        v-show="open"
      >
        <slot></slot>
      </div>
    </template>

  </div>
</template>
<script>
import Icon from "../Common/Icon";
export default {
  name: "DNavSubItem",
  inject: ["eventBus", "vertical"],
  components: {
    "d-icon": Icon
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      open: false,
      active: false,
      hideTimer: null,
      hover: false
    };
  },
  methods: {
    toggle() {
      if (this.vertical) this.open = !this.open;
    },
    show() {
      if (this.vertical) return;
      this.hideTimer && window.clearTimeout(this.hideTimer);
      this.open = true;
    },
    hide() {
      if (this.vertical) return;
      this.hideTimer = window.setTimeout(() => {
        this.open = false;
      }, 300);
    },
    searchChildren(children, selected) {
      return children.some(child => {
        return (
          selected.includes(child.name) ||
          (child.$children.length &&
            this.searchChildren(child.$children, selected))
        );
      });
    },
    enter(el, done) {
      el.style.height = "auto";
      let { height } = el.getBoundingClientRect();
      el.style.height = "0";
      el.getBoundingClientRect();
      el.style.height = `${height}px`;
      el.addEventListener("transitionend", () => {
        done();
      });
    },
    afterEnter(el) {
      el.style.height = "auto";
    },
    leave(el, done) {
      let { height } = el.getBoundingClientRect();
      console.log(height);
      el.style.height = `${height}px`;
      el.getBoundingClientRect();
      el.style.height = "0";
      el.addEventListener("transitionend", () => {
        done();
      });
    },
    afterLeave(el) {
      el.style.height = "auto";
    }
  },
  computed: {
    isFirstSub() {
      return this.$parent.$options.name === "DNav";
    }
  },
  mounted() {
    this.eventBus.$on("change", selected => {
      this.active = this.searchChildren(this.$children, selected);
    });
  }
};
</script>
<style lang="scss" scoped>
@import "_var";
.nav-sub-item {
  position: relative;
  user-select: none;
  cursor: pointer;
  > .nav-sub-item-title {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.5em 1em;
    white-space: nowrap;
    .title {
      margin-right: 10px;
    }
    .icon {
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      margin-left: auto;
      font-size: 10px;
      &.down {
        transform: translateY(2px);
      }
      &.right {
        transform: translateX(-2px);
      }
      &.active {
        &.down {
          transform: rotate(-180deg) translateY(0);
        }
        &.right {
          transform: rotate(-180deg) translateX(0);
        }
      }
    }
  }
  > .nav-sub-item-popover {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    background: #fff;
    font-size: $font-size;
    min-width: 8em;
    margin-top: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    transition: all 250ms linear;
  }
  &.vertical {
    > .nav-sub-item-popover {
      position: static;
      box-shadow: none;
      margin-top: 0;
      padding-left: 10px;
      overflow: hidden;
    }
  }
  &.active {
    > .nav-sub-item-title {
      color: $color-active;
      .icon {
        fill: $color-active;
      }
      &::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        z-index: 500;
        width: 100%;
        height: 0;
        border-bottom: 2px solid $border-color-active;
      }
    }
    &.vertical {
      > .nav-sub-item-title {
        &::after {
          top: 0;
          right: -1px;
          left: auto;
          bottom: 0;
          height: 100%;
          width: 0;
          border-right: 2px solid $border-color-active;
          border-bottom: none;
        }
      }
    }
  }
  &:hover {
    > .nav-sub-item-title {
      color: $color-active;
      .icon {
        fill: $color-active;
      }
    }
  }
  & .nav-sub-item {
    > .nav-sub-item-popover {
      top: 0;
      left: 100%;
      margin-left: 5px;
      margin-top: 0;
    }
    &.active,
    &:hover {
      > .nav-sub-item-title {
        color: $color-active;
        .icon {
          fill: $color-active;
        }
        &::after {
          content: none;
        }
      }
    }
    &.active {
      > .nav-sub-item-title {
        background: $border-color-active-light;
      }
    }
    &.vertical {
      > .nav-sub-item-popover {
        margin-left: 0;
      }
      &.active {
        > .nav-sub-item-title {
          background: #fff;
          &::after {
            content: "";
            position: absolute;
            top: 0;
            right: -1px;
            z-index: 500;
            height: 100%;
            width: 0;
            border-right: 2px solid $border-color-active;
          }
        }
      }
    }
  }
}
</style>