<template>
  <d-table
    :columns='columns'
    :data-source="dataSource"
    :bordered="bordered"
    :compact="compact"
    :striped="striped"
    :hovered="hovered"
    :hasCheckbox="hasCheckbox"
    :hasOrder="hasOrder"
    :loading="loading"
    :ellipse="ellipse"
    :height="height"
  ></d-table>
</template>
<script>
export default {
  props: {
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
      columns: [
        { text: "姓名", field: "name" },
        { text: "分数", field: "score" },
        { text: "住址", field: "address" },
        { text: "联系方式", field: "contact" }
      ],
      dataSource: [
        {
          id: 1,
          name: "小明",
          score: 40,
          contact: "13509234456",
          address: "广东省深圳市南山区粤海街道"
        },
        {
          id: 2,
          name: "小红",
          score: 20,
          contact: "13509234456",
          address: "湖北省武汉市洪山区光谷广场"
        },
        { id: 3, name: "小张", score: 15, address: "广东省梅州市兴宁市福兴镇" },
        {
          id: 4,
          name: "小李",
          score: 30,
          contact: "13509234456",
          address: "广东省惠州市博罗县博罗汽车总站"
        },
        {
          id: 5,
          name: "小王",
          score: 60,
          contact: "13509234456",
          address: "湖北省武汉市洪山区武昌火车站"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.table-wrapper {
  table {
    margin: 0;
    border: none;
    display: table;
    overflow: auto;
  }
  th,
  td,
  tr {
    border: none;
    padding: 0;
  }
  tr:nth-child(2n) {
    background: none;
  }
}
</style>