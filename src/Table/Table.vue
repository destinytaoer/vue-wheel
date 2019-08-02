<template>
  <div class="table-wrapper">
    <table
      class="table"
      :class="{bordered, compact, striped}"
    >
      <thead>
        <tr>
          <th
            v-if="hasCheckbox"
            @change="checkAll"
          ><input type="checkbox"></th>
          <th v-if="hasOrder">#</th>
          <th
            v-for="(column, index) in columns"
            :key="`head-${index}`"
          >{{column.text}}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in dataSource"
          :key="`body-${index}`"
        >
          <th v-if="hasCheckbox">
            <input
              type="checkbox"
              @change="checkItem(item, index, $event)"
              :checked="checkedArr.find(i => i.id === item.id) ? true : false"
            >
          </th>
          <td v-if="hasOrder">{{index}}</td>
          <td
            v-for="(column, index) in columns"
            :key="index"
          >{{item[column.field]}}</td>
        </tr>
      </tbody>
    </table>
    {{checkedArr}}
  </div>
</template>
<script>
export default {
  name: "DTable",
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
      checkedArr: this.checkedItems
    };
  },
  methods: {
    checkItem(item, index, e) {
      let selected = e.target.checked;
      if (selected) {
        this.checkedArr.push(item);
      } else {
        let index = this.checkedArr.findIndex(i => i.id === item.id);
        this.checkedArr.splice(index, 1);
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
  }
}
</style>