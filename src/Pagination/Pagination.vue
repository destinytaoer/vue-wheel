<template>
  <div
    class="pagination"
    :class="{hide: hideIfOnePage && totalPage === 1}"
  >
    <span
      class="pagination-nav"
      :class="{disabled: current === 1}"
      data-index="prev"
      @click="changePage(current - 1)"
    >
      <d-icon name="left"></d-icon>
    </span>
    <ul
      class="pagination-list"
      v-if="totalPage <= pageRange"
    >
      <li
        class="pagination-list-item"
        :class="{active: current === index}"
        v-for="index in totalPage"
        :key="index"
        :data-index="index"
        @click="changePage(index)"
      >{{index}}</li>
    </ul>
    <ul
      class="pagination-list"
      v-else
    >
      <li
        v-if="numArr[0] > 1"
        class="pagination-list-item"
        :data-index="1"
        @click="changePage(1)"
      >1</li>
      <li
        v-if="numArr[0] > 2"
        class="pagination-list-separator"
      >
        <d-icon name="dots"></d-icon>
      </li>
      <li
        class="pagination-list-item"
        :class="{active: current === index}"
        v-for="index in numArr"
        :key="index"
        :data-index="index"
        @click="changePage(index)"
      >{{index}}</li>
      <li
        v-if="numArr[numArr.length - 1] < totalPage - 1"
        class="pagination-list-separator"
      >
        <d-icon name="dots"></d-icon>
      </li>
      <li
        v-if="numArr[numArr.length - 1] < totalPage"
        class="pagination-list-item"
        :data-index="totalPage"
        @click="changePage(totalPage)"
      >{{totalPage}}</li>
    </ul>
    <span
      class="pagination-nav"
      :class="{disabled: current === totalPage}"
      @click="changePage(current + 1)"
      data-index="next"
    >
      <d-icon name="right"></d-icon>
    </span>
  </div>
</template>
<script>
import Icon from "../Common/Icon";
export default {
  name: "DPagination",
  components: {
    "d-icon": Icon
  },
  props: {
    totalPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      default: 1
    },
    hideIfOnePage: {
      type: Boolean,
      default: false
    },
    pageRange: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      current: this.currentPage,
      l: Math.ceil((this.pageRange - 1) / 2),
      r: Math.floor((this.pageRange - 1) / 2)
    };
  },
  computed: {
    numArr() {
      const { current, totalPage, l, r, pageRange, range } = this;
      let start = current - l;
      let end = current + r;
      if (start < 1) {
        start = 1;
        end = start + pageRange - 1;
      }
      if (end > totalPage) {
        end = totalPage;
        start = totalPage - pageRange + 1;
      }
      return range(start, end);
    }
  },
  methods: {
    range(min, max) {
      return Array.apply(null, { length: max - min + 1 }).map(
        (v, i) => min + i
      );
    },
    changePage(index) {
      if (index < 1 || index > this.totalPage) return;
      this.current = index;
      this.$emit("update:currentPage", index);
    }
  }
};
function unique(arr) {
  const obj = {};
  arr.forEach(num => {
    obj[num] = num;
  });
  return Object.values(obj);
}
</script>
<style lang="scss" scoped>
@import "_var";
$width: 28px;
$height: 28px;
.pagination {
  display: flex;
  font-size: $font-size;
  user-select: none;
  &.hide {
    display: none;
  }
  &-list .pagination-list-item,
  &-list .pagination-list-separator,
  &-nav {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: top;
    height: $height;
    min-width: $width;
    padding: 0 8px;
    margin: 0 4px;
    border-radius: $border-radius;
    color: $color;
    .icon {
      fill: $color;
    }
  }
  &-list {
    margin: 0;
    padding: 0;
    list-style: none;
    &-item {
      border: 1px solid $border-color;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: $border-color-active;
        color: $color-active;
      }
      &.active {
        cursor: default;
      }
    }
  }
  &-nav {
    border: 1px solid $border-color;
    cursor: pointer;
    &:hover {
      border-color: $border-color-active;
      color: $color-active;
      .icon {
        fill: $color-active;
      }
    }
    &.disabled {
      border-color: lighten($border-color, 30%);
      color: $color;
      cursor: not-allowed;
      .icon {
        fill: darken($bg-disabled, 30%);
      }
    }
  }
}
</style>