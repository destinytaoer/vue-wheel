---
title: Cascader - 级联选择器
---
# 级联选择器

## 基本用法

### 简单级联选择

<wrapper>
  <cascader-demo></cascader-demo>
</wrapper>

```html
<d-cascader :source="source" placeholder="请选择省市区" :selected.sync="selected"></d-cascader>
```

```js
export default {
  data() {
    return {
      source: [...],
      selected: []
    };
  }
};
```

### 弹出框高度修改

弹出框默认高度为 200px，可以使用优先级覆盖进行修改。

```css
.cascader .popover {
  height: 300px!important;
}
.wrapper .cascader .popover {
  height: 300px;
}
```

### 动态加载

<wrapper>
  <cascader-dynamic></cascader-dynamic>
</wrapper>

```html
<d-cascader
  :source.sync="source"
  placeholder="请选择省市区"
  :selected.sync="selected"
  :load-data="loadData"
></d-cascader>
```

```js
export default {
  data() {
    return {
      source: [],
      selected: []
    };
  },
  methods: {
    loadData(item, updateSource) {
      // 这里的 id 根据你的请求所需数据决定
      ajax(item.id).then(result => {
        updateSource(result);
      });
    }
  },
  created() {
    ajax(0).then(result => {
      this.source = result;
    });
  }
};
```

## API

props：

| 名称         |      类型       | 描述                                                                                        |
| ------------ | :-------------: | :------------------------------------------------------------------------------------------ |
| source       | Array, required | 级联列表数据                                                                                |
| selected     | Array, required | 级联列表选中的数据                                                                          |
| placeholder  |     String      | 占位符                                                                                      |
| loading-data |    Function     | 获取数据的函数，参数为：item 当前点击项，updateSource: 更新数据的函数，需要传入获取到的结果 |
| split        |     String      | 选中结果显示的分隔符，默认为 /                                                              |

事件：

| 名称            |                类型                 | 描述             |
| --------------- | :---------------------------------: | :--------------- |
| hide            |               String                | 弹出框隐藏时触发 |
| show            |               String                | 弹出框显示时触发 |
| update:selected | 选中元素时触发，一般使用 .sync 代替 |