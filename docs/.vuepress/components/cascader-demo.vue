<template>
  <div class="cascader-demo">
    <d-cascader :source="dataSource"></d-cascader>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataSource: [
        {
          name: "广东",
          children: [
            {
              name: "广州",
              children: [
                { name: "天河" },
                { name: "越秀" },
                { name: "黄埔" },
                { name: "花都" },
                { name: "白云" },
                { name: "番禺" }
              ]
            },
            {
              name: "深圳",
              children: [
                { name: "南山" },
                { name: "罗湖" },
                { name: "福田" },
                { name: "龙华" },
                { name: "龙岗" },
                { name: "光明" },
                { name: "大鹏" },
                { name: "宝安" }
              ]
            },
            {
              name: "梅州",
              children: [
                { name: "兴宁" },
                { name: "梅县" },
                { name: "平远" },
                { name: "五华" },
                { name: "大浦" }
              ]
            }
          ]
        },
        {
          name: "安徽",
          children: [
            {
              name: "合肥",
              children: [
                { name: "天河" },
                { name: "越秀" },
                { name: "黄埔" },
                { name: "花都" },
                { name: "白云" },
                { name: "番禺" }
              ]
            },
            {
              name: "芜湖",
              children: [
                { name: "南山" },
                { name: "罗湖" },
                { name: "福田" },
                { name: "龙华" },
                { name: "龙岗" },
                { name: "光明" },
                { name: "大鹏" },
                { name: "宝安" }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
</style>