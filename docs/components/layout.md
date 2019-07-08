---
title: Layout - 布局
---
# 布局

Vue Wheel 中，可以使用 Layout 布局组件轻松完成一些常见的布局。

布局组件有：

- d-layout 容器
- d-header 页头
- d-content 内容
- d-sider 侧边栏
- d-footer 页脚

## 经典布局

<wrapper>
  <layout1></layout1>
</wrapper>

```html
<d-layout style="height: 300px">
  <d-header></d-header>
  <d-content></d-content>
  <d-footer></d-footer>
</d-layout>
```

## 侧边栏布局1

<wrapper>
  <layout2></layout2>
</wrapper>

```html
<d-layout style="height: 300px">
  <d-header></d-header>
  <d-layout>
    <d-sider></d-sider>
    <d-content></d-content>
  </d-layout>
  <d-footer></d-footer>
</d-layout>
```

如果侧边栏在右边，只需要调换 d-sider 和 d-content 的顺序即可。

```html
<d-layout>
  <!-- ... -->
  <d-layout>
    <d-content></d-content>
    <d-sider></d-sider>
  </d-layout>
</d-layout>
```

## 侧边栏布局2

<wrapper>
  <layout3></layout3>
</wrapper>

```html
<d-layout style="height: 300px">
  <d-sider></d-sider>
  <d-layout>
    <d-header></d-header>
    <d-content></d-content>
    <d-footer></d-footer>
  </d-layout>
</d-layout>
```

如果侧边栏在右边，只需要将 d-sider 放到后面即可。

## 侧边栏布局3

<wrapper>
  <layout4></layout4>
</wrapper>

```html
<d-layout style="height: 300px">
  <d-header></d-header>
  <d-layout>
    <d-sider></d-sider>
    <d-layout>
      <d-content></d-content>
      <d-footer></d-footer>
    </d-layout>
  </d-layout>
</d-layout>
```

## 圣杯布局

<wrapper>
  <layout5></layout5>
</wrapper>

```html
<d-layout style="height: 300px">
  <d-header></d-header>
  <d-layout>
    <d-sider></d-sider>
    <d-content></d-content>
    <d-sider></d-sider>
  </d-layout>
  <d-footer></d-footer>
</d-layout>
```