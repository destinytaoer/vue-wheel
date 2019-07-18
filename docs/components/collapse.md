---
title: Collapse - 手风琴
---
# 手风琴

## 基本用法

### 简单手风琴

<wrapper>
  <collapse-demo1></collapse-demo1>
</wrapper>

```html
<d-collapse :selected.sync="selected">
  <d-collapse-item title="标题1" name="1">内容1</d-collapse-item>
  <d-collapse-item title="标题2" name="2">内容2</d-collapse-item>
  <d-collapse-item title="标题3" name="3">内容3</d-collapse-item>
</d-collapse>
```

每一个 item 必须具有 name 属性，作为其唯一标识。selected 为选中项，是一个数组，其每一个元素的值就是该选中项的 name 属性。

默认全部闭合，如果需要默认打开某一项，请自行设置 selected 的值

### 只能打开一个

<wrapper>
  <collapse-demo2></collapse-demo2>
</wrapper>

```html
<d-collapse :selected.sync="selected" single>
  <d-collapse-item title="标题1" name="1">内容1</d-collapse-item>
  <d-collapse-item title="标题2" name="2">内容2</d-collapse-item>
  <d-collapse-item title="标题3" name="3">内容3</d-collapse-item>
</d-collapse>
```

## API

Collapse props：

| 名称     |      类型       | 描述                         |
| -------- | :-------------: | :--------------------------- |
| selected | Array, required | 选中项的集合                 |
| single   |     Boolean     | 是否只能选中一项，默认 false |

CollapseItem props：

| 名称  |       类型       | 描述             |
| ----- | :--------------: | :--------------- |
| name  | String, required | 每一项的唯一标识 |
| title | String, required | 每一项的文本内容 |

事件：

| 名称            |                类型                 | 描述 |
| --------------- | :---------------------------------: | :--- |
| update:selected | 选中元素时触发，一般使用 .sync 代替 |