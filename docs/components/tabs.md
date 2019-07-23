---
title: Tabs - 选项卡
---
# 选项卡

## 基本用法

### 基本选项卡

<wrapper>
  <tabs-demo1></tabs-demo1>
</wrapper>

```html
<d-tabs :selected.sync="selectedTab">
  <d-tabs-head>
    <d-tabs-item name="woman">美女</d-tabs-item>
    <d-tabs-item name="sports">体育</d-tabs-item>
    <d-tabs-item name="it">IT</d-tabs-item>
  </d-tabs-head>
  <d-tabs-body>
    <d-tabs-content name="woman">美女</d-tabs-content>
    <d-tabs-content name="sports">体育</d-tabs-content>
    <d-tabs-content name="it">IT</d-tabs-content>
  </d-tabs-body>
</d-tabs>
```

```js
export default {
  data() {
    return {
      selectedTab: "sports"
    };
  }
};
```

在选中时，默认会触发一个 `update:selected` 事件，所以可以使用 `.sync` 修饰符。需要注意的是，绑定的变量必须是 `selected`。

### 添加 Icon

<wrapper>
  <tabs-demo2></tabs-demo2>
</wrapper>

```html
<!-- ... -->
<d-tabs-head>
  <d-tabs-item name="woman">
    <d-icon name="settings"></d-icon>美女
  </d-tabs-item>
  <d-tabs-item name="sports">
    <d-icon name="warn"></d-icon>体育
  </d-tabs-item>
  <d-tabs-item name="it">
    <d-icon name="info"></d-icon>IT
  </d-tabs-item>
</d-tabs-head>
```

### 额外的按钮

<wrapper>
  <tabs-demo3></tabs-demo3>
</wrapper>

```html
<!-- ... -->
<d-tabs-head>
  <d-tabs-item name="woman">美女</d-tabs-item>
  <d-tabs-item name="sports">体育</d-tabs-item>
  <d-tabs-item name="it">IT</d-tabs-item>
  <template slot="actions">
    <d-button>extra button</d-button>
  </template>
</d-tabs-head>
```

## API

Tabs props:

| 名称     |  类型  | 描述                                       |
| -------- | :----: | :----------------------------------------- |
| selected | String | 默认选中的项，值为 TabsItem 的 name 属性值 |

TabsItem props:

| 名称     |  类型   | 描述                                       |
| -------- | :-----: | :----------------------------------------- |
| name     | String  | TabsItem 的唯一标记，与 TabsContent 相对应 |
| disabled | Boolean | 是否不可选中，默认 false                   |

TabsContent props:

| 名称 | 描述                                       |
| ---- | :----------------------------------------- |
| name | TabsContent 的唯一标记，与 TabsItem 相对应 |