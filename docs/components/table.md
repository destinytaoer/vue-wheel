---
title: Table - 表格
---

# 表格

## 基本用法

### 默认表格
<wrapper>
  <table-demo1></table-demo1>
</wrapper>

```html
<d-table
  :columns='columns'
  :data-source="dataSource"
></d-table>
```
两个必传属性：columns 和 DataSource.
- columns 是一个对象数组，表示表头，每一个对象必须具有 text 和 field 属性，text 表示表头展示文本，field 表示 dataSource 中相应的字段
- dataSource 也是一个对象数组，表示所有数据，每一个对象必须具有 id 属性，用来标识每一行。

> 表格是不带分页的，分页器需要自行添加

### 加上边框

<wrapper>
  <table-demo1 bordered></table-demo1>
</wrapper>

```html
<d-table
  :columns='columns'
  :data-source="dataSource"
  bordered
></d-table>
```

### 去掉斑马线
<wrapper>
  <table-demo1 bordered :striped="false"></table-demo1>
</wrapper>

```html
<d-table
  :columns='columns'
  :data-source="dataSource"
  bordered
  :striped="false"
></d-table>
```

### 紧凑模式
<wrapper>
  <table-demo1 compact></table-demo1>
</wrapper>

```html
<d-table
  :columns='columns'
  :data-source="dataSource"
  compact
></d-table>
```

紧凑模式会适当减少每一格中的 padding 

### 增加 hover 效果
<wrapper>
  <table-demo1 hovered></table-demo1>
</wrapper>

```html
<d-table
  :columns='columns'
  :data-source="dataSource"
  hovered
></d-table>
```

### 单元格溢出省略
<wrapper>
  <table-demo1 ellipse></table-demo1>
</wrapper>

```html
<d-table
  :columns='columns'
  :data-source="dataSource"
  ellipse
></d-table>
```

默认值是 false，可以通过设置为 true 统一添加溢出省略号。如果只需要单独的设置某一列具有这个特性，可以在 columns 中添加 ellipse 属性为 true

### 具有序号
<wrapper>
  <table-demo1 has-order></table-demo1>
</wrapper>

```html
<d-table
  :columns='columns'
  :data-source="dataSource"
  has-order
></d-table>
```

### 具有 checkbox

<wrapper>
  <table-demo1 has-checkbox></table-demo1>
</wrapper>

```html
<d-table
  :columns='columns'
  :data-source="dataSource"
  has-checkbox
  :checkItems.sync="checked"
></d-table>
```

也可以监听 update:checkItems 来处理点击 check 事件

### 排序的表格

首先需要在 columns 开启某一列的 sort，即添加 sort 属性为 true。然后监听 sort 事件，这个事件会传递两个参数 key 和 direction，要排序的属性和方向

<wrapper>
  <table-demo2></table-demo2>
</wrapper>

```html
<d-table
  :columns='columns'
  :data-source="dataSource"
  @sort="sort"
></d-table>
```

```js
methods: {
  sort(key, direction) {
    
  }
}
```

sort 控件通过整体点击进行切换，为了适应移动端，所以没有控制小箭头的点击，而是整体进行点击切换。主要有三个状态，表示三个方向：

- null：上下三角都不高亮
- asc 升序：上三角高亮
- desc 降序：下三角高亮

### 请求 loading

通过 loading 属性可以控制 loading 的显示隐藏

<wrapper>
  请点击排序查看 loading 效果
  <table-demo3></table-demo3>
</wrapper>

```html
<d-table
  :columns='columns'
  :data-source="dataSource"
  @sort="sort"
  :loading="loading"
></d-table>
```

```js
sort(key, direction) {
  this.loading = true;
  setTimeout(() => {
    // ...
    this.loading = false;
  }, 1000);
}
```

### 固定表头

<wrapper>
  <table-demo1 bordered height="100px"></table-demo1>
</wrapper>

```html
<d-table
  :columns='columns'
  :data-source="dataSource"
  bordered
  height="100px"
></d-table>
```

## API

props：

| 名称        |        类型         | 描述                  |
| ----------- | :-----------------: | :-------------------- |
| columns     |   Array，required   | 表头信息              |
| dataSource  |   Array，required   | 表格数据              |
| bordered    | Boolean，默认 false | 是否添加边框          |
| striped     | Boolean，默认 true  | 是否添加斑马线        |
| hovered     | Boolean，默认 false | 是否移入效果          |
| compact     | Boolean，默认 false | 是否开启紧凑模式      |
| ellipse     | Boolean，默认 false | 是否单元格移除隐藏    |
| loading     | Boolean，默认 false | 是否开启 loading 状态 |
| hasOrder    | Boolean，默认 false | 是否添加序号列        |
| hasCheckbox | Boolean，默认 false | 是否添加 checkbox 列  |
| height      |       String        | 设置 tbody 的高度     |

事件：

| 名称              | 描述                                      |
| ----------------- | :---------------------------------------- |
| sort              | 点击排序控件时触发，返回 key 和 direction |
| update:checkItems | 点击 checkbox 时触发， 返回 items         |

columns 属性：

| 名称    |  类型   | 描述                             |
| ------- | :-----: | :------------------------------- |
| text    | String  | 该列表头展示文本                 |
| field   | String  | 该列表头展示字段                 |
| align   | String  | 该列的对齐方式                   |
| ellipse | Boolean | 该列是否单元格溢出省略           |
| width   | String  | 该列列宽，可以是数字、px、百分比 |
| sort    | Boolean | 该列是否开始排序功能             |
