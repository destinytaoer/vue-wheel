<template>
  <div class="table-wrapper">
    <table
      class="table"
      :class="{bordered, compact, striped}"
    >
      <thead>
        <tr>
          <th v-if="hasCheckbox"><input
              type="checkbox"
              @change="checkAll"
              ref="checkAll"
              :checked="areAllChecked"
            ></th>
          <th v-if="hasOrder">#</th>
          <th
            v-for="column in columns"
            :key="column.field"
          >
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
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in dataSource"
          :key="item.id"
        >
          <th v-if="hasCheckbox">
            <input
              type="checkbox"
              @change="checkItem(item, index, $event)"
              :checked="checkedArr.find(i => i.id === item.id)"
            >
          </th>
          <td v-if="hasOrder">{{index}}</td>
          <td
            v-for="column in columns"
            :key="column.field"
          >{{item[column.field]}}</td>
        </tr>
      </tbody>
    </table>
    {{checkedArr}}
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
    hasCheckbox: {
      type: Boolean,
      default: false
    },
    checkedItems: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      checkedArr: JSON.parse(JSON.stringify(this.checkedItems)),
      sortKeys: {}
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
    }
  },
  created() {
    this.columns
      .filter(item => item.sort)
      .forEach(item => {
        this.sortKeys[item.field] = null;
      });
  }
};
</script>
<style lang="scss" scoped>
@import "_var";
.table-wrapper {
  .table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-top: 1px solid $border-color-light;
    td,
    th {
      border-bottom: 1px solid $border-color-light;
      text-align: left;
      padding: 8px;
      color: $color;
    }
    &.striped {
      tbody {
        > tr {
          &:nth-child(odd) {
            background: $bg-disabled;
          }
        }
      }
    }
    &.bordered {
      border: 1px solid $border-color-light;
      td,
      th {
        border-right: 1px solid $border-color-light;
      }
    }
    &.compact {
      td,
      th {
        padding: 4px;
      }
    }
    &-sorter {
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
}
</style>