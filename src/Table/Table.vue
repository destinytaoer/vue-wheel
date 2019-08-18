<template>
  <div
    class="table-wrapper"
    :class="{bordered, compact}"
    ref="table"
  >
    <div class="table-header-wrapper">
      <table class="table-header">
        <colgroup>
          <col
            v-if="hasCheckbox"
            :width="widthList.checkbox"
            key="checkbox"
          />
          <col
            v-if="hasOrder"
            :width="widthList.order"
            key="order"
          />
          <col
            v-for="column in columns"
            :width="widthList[column.field]"
            :key="column.field"
          />
        </colgroup>
        <thead>
          <tr>
            <th
              v-if="hasCheckbox"
              align="center"
            >
              <div class="cell">
                <input
                  type="checkbox"
                  @change="checkAll"
                  ref="checkAll"
                  :checked="areAllChecked"
                >
              </div>
            </th>
            <th
              v-if="hasOrder"
              align="center"
            >
              <div class="cell">#</div>
            </th>
            <th
              v-for="column in columns"
              :key="column.field"
              :align="column.align"
              :ellipse="ellipse || column.ellipse"
            >
              <div class="cell">
                {{column.text}}
                <span
                  v-if="column.sort"
                  class="table-sorter"
                  title="排序"
                  @click="sortBy(column.field)"
                >
                  <d-icon
                    name="increase"
                    :class="{active: sortKeys[column.field] === 'asc'}"
                  ></d-icon>
                  <d-icon
                    name="decrease"
                    :class="{active: sortKeys[column.field] === 'desc'}"
                  ></d-icon>
                </span>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div
      class="table-body-wrapper"
      :style="{height: height}"
    >
      <table
        class="table-body"
        :class="{striped, hovered}"
      >
        <colgroup>
          <col
            v-if="hasCheckbox"
            :width="widthList.checkbox"
            key="checkbox"
          />
          <col
            v-if="hasOrder"
            :width="widthList.order"
            key="order"
          />
          <col
            v-for="column in columns"
            :width="widthList[column.field]"
            :key="column.field"
          />
        </colgroup>
        <tbody>
          <tr
            v-for="(item, index) in dataSource"
            :key="item.id"
          >
            <td
              v-if="hasCheckbox"
              align="center"
            >
              <div class="cell">
                <input
                  type="checkbox"
                  @change="checkItem(item, index, $event)"
                  :checked="checkedArr.find(i => i.id === item.id)"
                >
              </div>
            </td>
            <td
              v-if="hasOrder"
              align="center"
            >
              <div class="cell">{{index}}</div>
            </td>
            <td
              v-for="column in columns"
              :key="column.field"
              :align="column.align"
              :title="item[column.field]"
            >
              <div
                class="cell"
                :ellipse="ellipse || column.ellipse"
              >{{item[column.field]}}</div>
            </td>
          </tr>
          <!-- TODO: 没有数据时的显示 -->
        </tbody>
      </table>
      <div
        class="table-loading"
        v-show="loading"
      >
        <d-icon name="loading"></d-icon>
      </div>
    </div>
  </div>
</template>
<script>
import DIcon from "../Common/Icon";
export default {
  name: "DTable",
  components: {
    DIcon
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    dataSource: {
      type: Array,
      required: true,
      validator(arr) {
        return !arr.find(item => item.id == undefined);
      }
    },
    hasOrder: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    compact: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: true
    },
    hovered: {
      type: Boolean,
      deafult: false
    },
    hasCheckbox: {
      type: Boolean,
      default: false
    },
    checkedItems: {
      type: Array,
      default() {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    ellipse: {
      type: Boolean,
      default: false
    },
    height: {
      type: String
    }
  },
  data() {
    return {
      checkedArr: JSON.parse(JSON.stringify(this.checkedItems)),
      sortKeys: {},
      widthList: {},
      colObj: {}
    };
  },
  computed: {
    areAllChecked() {
      let dataIds = this.dataSource
        .map(item => item.id)
        .sort((a, b) => a.id - b.id);
      let checkedIds = this.checkedArr
        .map(item => item.id)
        .sort((a, b) => a.id - b.id);
      if (dataIds.length !== checkedIds.length) return false;
      return (
        dataIds.length > 0 &&
        dataIds.every((item, index) => item === checkedIds[index])
      );
    }
  },
  watch: {
    checkedArr() {
      if (
        this.checkedArr.length > 0 &&
        this.checkedArr.length < this.dataSource.length
      ) {
        this.$refs.checkAll.indeterminate = true;
      } else {
        this.$refs.checkAll.indeterminate = false;
      }
    }
  },
  methods: {
    sortBy(key) {
      let sortDirection = this.sortKeys[key];
      switch (sortDirection) {
        case null: {
          sortDirection = "asc";
          break;
        }
        case "asc": {
          sortDirection = "desc";
          break;
        }
        case "desc": {
          sortDirection = null;
          break;
        }
      }
      // 对象需要重新赋值为其他地址，才能会触发更新
      let copy = {};
      for (let field in this.sortKeys) {
        copy[field] = null;
      }
      copy[key] = sortDirection;
      this.sortKeys = copy;
      this.$emit("sort", key, sortDirection);
    },
    checkItem(item, index, e) {
      let selected = e.target.checked;
      if (selected) {
        this.checkedArr.push(item);
      } else {
        this.checkedArr = this.checkedArr.filter(i => i.id !== item.id);
      }
      this.$emit("update:checkedItems", this.checkedArr);
    },
    checkAll(e) {
      let selected = e.target.checked;
      let newChecked = selected
        ? JSON.parse(JSON.stringify(this.dataSource))
        : [];
      this.checkedArr = newChecked;
      this.$emit("update:checkedItems", newChecked);
    },
    updateWidth() {
      this.widthList = this.calcWidth();
    },
    calcWidth() {
      let totalWidth = this.$refs.table.offsetWidth;
      let totalPercent = 100;

      let pxCol = this.colObj.pxCol;
      let percentCol = this.colObj.percentCol;

      let calcWidth = {};

      pxCol.forEach(function(item) {
        totalWidth -= item.width;
        calcWidth[item.field] = item.width;
      });

      // checkbox 固定为 50px
      if (this.hasCheckbox) {
        totalWidth -= 50;
        calcWidth.checkbox = 50;
      }
      // order 固定为 60px
      if (this.hasOrder) {
        totalWidth -= 60;
        calcWidth.order = 60;
      }

      percentCol.forEach((item, index) => {
        var width = Math.floor((item.width / totalPercent) * totalWidth);
        totalPercent -= item.width;
        if (index === percentCol.length - 1) {
          width = totalWidth;
        }
        calcWidth[item.field] = width;
        totalWidth -= width;
      });
      return calcWidth;
    },
    resolveColumns() {
      let { px, percent, blank } = this.divideCol();

      let totalPercent = percent.reduce(function(prev, cur) {
        return prev + cur.width;
      }, 0);

      // 处理百分比总和超过 100% 的情况
      this.resolvePercent(totalPercent, percent);

      this.dividePercent(totalPercent, blank);
      percent = percent.concat(blank); // 合并空和百分比

      this.colObj = {
        pxCol: px,
        percentCol: percent
      };
    },
    divideCol() {
      // 将 col 中的 width 划分 px、% 和 undefined
      let px = [];
      let percent = [];
      let blank = [];
      this.columns.forEach((item, index) => {
        if (this.isPercent(item.width)) {
          percent.push({
            field: item.field,
            width: Number(item.width.replace("%", ""))
          });
          return;
        }
        if (this.isBlank(item.width)) {
          blank.push({
            field: item.field,
            width: undefined
          });
          return;
        }
        if (this.isNumber(item.width)) {
          px.push({
            field: item.field,
            width: +item.width
          });
          return;
        }
        if (this.isPx(item.width)) {
          px.push({
            field: item.field,
            width: Number(item.width.replace("px", ""))
          });
          return;
        }
        throw new Error(`column ${index} is illegal width value`);
      });
      return {
        px,
        percent,
        blank
      };
    },
    dividePercent(total, blank) {
      // blank 平分剩余百分比
      if (total < 100) {
        let restPercent = 100 - total;
        blank.forEach(function(item) {
          item.width = restPercent / blank.length;
        });
      }
    },
    resolvePercent(total, percent) {
      // overTimes 为比例值，用于防止百分比总和超过 100%
      let overTimes = total / 100;
      overTimes = overTimes > 1 ? overTimes : 1;

      percent.forEach(function(item) {
        item.width = item.width / overTimes;
      });
    },
    isNumber(str) {
      return !Number.isNaN(Number(str));
    },
    isPx(str) {
      if (typeof str !== "string") return false;
      var flag = /px$/.test(str);
      str = str.replace("px", "");
      return flag && this.isNumber(str);
    },
    isPercent(str) {
      if (typeof str !== "string") return false;
      var flag = /%$/.test(str);
      str = str.replace("%", "");
      return flag && this.isNumber(str);
    },
    isBlank(val) {
      return val == null;
    }
  },
  created() {
    this.resolveColumns();
    this.columns
      .filter(item => item.sort)
      .forEach(item => {
        this.sortKeys[item.field] = null;
      });
  },
  mounted() {
    this.updateWidth();
    this.onWindowResize = e => {
      this.updateWidth();
    };
    window.addEventListener("resize", this.onWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
  }
};
</script>
<style lang="scss" scoped>
@import "_var";
@import "animate";
$even-color: #eee; // 偶数行颜色
$odd-color: #fff; // 奇数行颜色
$hover-color: #f1f8fb; // hover 颜色
$selected-color: #f39c12; // 选中颜色
$scrollbarWidth: 6px; // 滚动条宽度

.table-wrapper {
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-top: 1px solid $border-color-light;
  border-bottom: 1px solid $border-color-light;
  background-color: $bg;
  font-size: $font-size;

  .cell {
    padding: 8px;
    text-align: left;
    padding: 8px;
    color: $color;
    line-height: 20px;
    word-break: break-all;
  }

  // 添加边框
  &.bordered {
    border-right: 1px solid $border-color-light;
    td,
    th {
      border-left: 1px solid $border-color-light;
    }
  }
  // 紧凑模式
  &.compact {
    .cell {
      padding: 4px;
    }
  }

  .table-header,
  .table-body,
  .table-footer {
    width: 100%;
    table-layout: fixed;
    word-wrap: break-word;
    text-align: left;
    border-collapse: collapse;
  }

  .table-body-wrapper {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;

    .table-body {
      /* 斑马条纹表格，需要 JS 通过配置增加 stripe-table 类 */
      &.striped {
        tbody > tr {
          &:nth-child(odd) {
            background-color: $odd-color;
          }

          &:nth-child(even) {
            background-color: $even-color;
          }
        }
      }

      tr:not(:last-child) {
        border-bottom: 1px solid $border-color-light;
      }

      /* hover 高亮表格，需要 JS 通过配置增加 hover-table 类 */
      &.hovered {
        tbody > tr:hover {
          background-color: $hover-color;
        }
      }
    }

    .table-loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.8);
      .icon {
        width: 50px;
        height: 50px;
        animation: spin 1.5s linear infinite;
      }
    }

    /* 滚动条样式 */
    &::-webkit-scrollbar {
      background: transparent;
      width: $scrollbarWidth;
      height: $scrollbarWidth;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #e1e1e1;
      width: $scrollbarWidth;
      height: $scrollbarWidth;
    }

    &::-webkit-scrollbar-track {
      border-radius: 5px;
      background-color: #fafafa;
    }

    &::-webkit-scrollbar-track-piece {
      display: none;
    }
  }

  .table-header-wrapper {
    .table-header {
      border-bottom: 1px solid $border-color-light;
    }
    .table-sorter {
      display: inline-flex;
      flex-direction: column;
      vertical-align: middle;
      cursor: pointer;
      .icon {
        width: 8px;
        height: 8px;
        fill: $btn-disabled-bg;
        &.active {
          fill: #000;
        }
      }
    }
  }

  [align="center"] {
    text-align: center;
  }

  [ellipse="true"] {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  [ellipse="false"] {
    word-break: break-all;
  }

  // TODO: 修改为通用的 checkbox 样式
  /* checkbox 样式 */
  // .checkbox {
  //   position: relative;
  //   display: inline-block;
  //   vertical-align: middle;
  //   white-space: nowrap;
  //   font-size: 0;
  //   color: #606266;
  //   user-select: none;
  //   cursor: pointer;

  //   .checkbox-inner {
  //     display: inline-block;
  //     width: 16px;
  //     height: 16px;
  //     vertical-align: middle;
  //     cursor: pointer;
  //     background: url("../img/checkbox.png") #fff no-repeat;
  //     background-size: auto 100%;
  //   }

  //   &.checked .checkbox-inner {
  //     background-position: -35px 0;
  //   }

  //   &:not(.checked):hover .checkbox-inner {
  //     background-position: -17.5px 0;
  //   }

  //   .checkbox-origin {
  //     opacity: 0;
  //     outline: none;
  //     position: absolute;
  //     margin: 0;
  //     width: 0;
  //     height: 0;
  //     z-index: -1;
  //   }
  // }
}
</style>