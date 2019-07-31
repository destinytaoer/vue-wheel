<template>
  <div class="pagination">
    <d-icon
      class="pagination-item"
      name="left"
    ></d-icon>
    <template v-for="(page, index) in pages">
      <template v-if="current === page">
        <span
          class="pagination-item active"
          :key="index"
        >{{page}}</span>
      </template>
      <template v-else-if="page === '...'">
        <d-icon
          name="left"
          :key="index"
        ></d-icon>
      </template>
      <template v-else>
        <a
          href="javascript:;"
          class="pagination-item"
          :key="index"
        >{{page}}</a>
      </template>
    </template>
    <d-icon
      class="pagination-item"
      name="right"
    ></d-icon>
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
    current: {
      type: Number,
      required: true
    },
    hideIfOnePage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let pages = [
      1,
      this.totalPage,
      this.current - 1,
      this.current - 2,
      this.current + 1,
      this.current + 2
    ];
    pages = unique(pages);
    pages.sort((a, b) => a - b);
    pages = pages.reduce((prev, cur, index) => {
      prev.push(cur);
      pages[index + 1] !== undefined &&
        pages[index + 1] - prev[index] > 1 &&
        prev.push("...");
      return prev;
    }, []);
    return {
      pages: pages
    };
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
.pagination {
  a {
    text-decoration: none;
  }
  &-item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: top;
    height: 20px;
    min-width: 20px;
    padding: 0 4px;
    margin: 0 4px;
    color: $color;
    font-size: $font-size;
    border: 1px solid $border-color;
    border-radius: $border-radius;
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
</style>