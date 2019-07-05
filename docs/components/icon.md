---
title: Icon
---
# Icon

本 UI 组件库带有默认的字体图标，通过 svg 来展示字体图标，并封装了 Icon 组件。

## 使用

默认的图标：

<wrapper>
  <d-icon name="settings"></d-icon>
</wrapper>

```html
<d-icon name="settings"></d-icon>
```

图标是一个 svg 元素，具有默认类名 icon，你也可以给图标设置特定的类名：
<wrapper>
  <iconlist-item name="settings" :hasTitle="false"></iconlist-item>
</wrapper>

```html
<d-icon class="personalClass" name="settings"></d-icon>
```

通过类名可以控制其大小等

```css
.personalClass {
  width: 40px;
  height: 40px;
}
```

## 字体图标列表

<wrapper>
  <iconlist-item name="settings"></iconlist-item>
  <iconlist-item name="loading"></iconlist-item>
  <iconlist-item name="up"></iconlist-item>
  <iconlist-item name="down"></iconlist-item>
  <iconlist-item name="left"></iconlist-item>
  <iconlist-item name="right"></iconlist-item>
  <iconlist-item name="download"></iconlist-item>
  <iconlist-item name="warn"></iconlist-item>
  <iconlist-item name="info"></iconlist-item>
  <iconlist-item name="thumbs-up"></iconlist-item>
</wrapper>