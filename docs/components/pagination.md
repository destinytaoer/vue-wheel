---
title: Pagination - 分页器
---

# 分页器

## 基本用法

### 简单分页器

<wrapper>
<d-pagination :total-page="20"></d-pagination>
</wrapper>

```html
<d-pagination :total-page="20"></d-pagination>
```

### 设置当前页

<wrapper>
<d-pagination :total-page="20" :current-page="10"></d-pagination>
</wrapper>

```html
<d-pagination :total-page="20" :current-page="10"></d-pagination>
```

### 设置只有一页时隐藏分页器

默认只有一页也会显示
<wrapper>
<d-pagination :total-page="1"></d-pagination>
</wrapper>

```html
<d-pagination :total-page="1"></d-pagination>
```

只要添加了 hideIfOnePage 属性，那么就会隐藏，效果如下：通过 display:none 进行隐藏

<wrapper>
<d-pagination :total-page="1" hide-if-one-page></d-pagination>
</wrapper>

```html
<d-pagination :total-page="1" hide-if-one-page></d-pagination>
```

### 设置页码范围

默认除首尾之外显示 5 个页码

<wrapper>
<d-pagination :total-page="20" :current-page="10"></d-pagination>
</wrapper>

```html
<d-pagination :total-page="20" :current-page="10"></d-pagination>
```

通过设置 pageRange 属性修改页码数为 3 的效果：

<wrapper>
<d-pagination :total-page="20" :page-range="3" :current-page="10"></d-pagination>
</wrapper>

```html
<d-pagination :total-page="20" :page-range="3" :current-page="10"></d-pagination>
```

## API

props：

| 名称          |        类型         | 描述                                                           |
| ------------- | :-----------------: | :------------------------------------------------------------- |
| totalPage     |  Number, required   | 总页数                                                         |
| currentPage   |   Number，默认 1    | 当前选中页                                                     |
| hideIfOnePage | Boolean，默认 false | 只有一页时，是否隐藏分页器                                     |
| pageRange     |   Number，默认 5    | 页码显示的范围，即当总页数足够多时，除首尾之外，显示多少个页码 |

事件：

| 名称               | 描述                               |
| ------------------ | :--------------------------------- |
| update:currentPage | 点击切换时触发，携带当前切换的页码 |
