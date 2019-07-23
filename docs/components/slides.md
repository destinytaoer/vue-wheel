---
title: Slides - 轮播
---

# 轮播

## 基本用法

### 简单轮播

<wrapper>
  <d-slides>
    <d-slides-item name="1">
      <div class="box">1</div>
    </d-slides-item>
    <d-slides-item name="2">
      <div class="box">2</div>
    </d-slides-item>
    <d-slides-item name="3">
      <div class="box">3</div>
    </d-slides-item>
  </d-slides>
</wrapper>

```html
<d-slides>
  <d-slides-item name="1">
    <div class="box">1</div>
  </d-slides-item>
  <d-slides-item name="2">
    <div class="box">2</div>
  </d-slides-item>
  <d-slides-item name="3">
    <div class="box">3</div>
  </d-slides-item>
</d-slides>
```

### 设置初始展示 item

通过传入 selected 属性，表示初始展示值，默认第一个元素。selected 的值为每个 SlidesItem 的 name 属性值。

<wrapper>
  <d-slides selected="2" :auto-play="false">
    <d-slides-item name="1">
      <div class="box">1</div>
    </d-slides-item>
    <d-slides-item name="2">
      <div class="box">2</div>
    </d-slides-item>
    <d-slides-item name="3">
      <div class="box">3</div>
    </d-slides-item>
  </d-slides>
</wrapper>

```html
<d-slides selected="2" :auto-play="false">
  //...
</d-slides>
```

还可以使用变量来表示 selected，此时可以使用 .sync 修饰符来达到同步的效果。

```html
<d-slides :selected.sync="selected">
  //...
</d-slides>
```

### 取消自动轮播和设置轮播时长

Slides 默认自动轮播，轮播时长为 1000ms，可以通过设置 auto-play 属性来决定是否自动轮播，设置 delay 属性来定义默认时长，单位 ms

取消轮播效果：
<wrapper>
  <d-slides :auto-play="false">
    <d-slides-item name="1">
      <div class="box">1</div>
    </d-slides-item>
    <d-slides-item name="2">
      <div class="box">2</div>
    </d-slides-item>
    <d-slides-item name="3">
      <div class="box">3</div>
    </d-slides-item>
  </d-slides>
</wrapper>

```html
<d-slides :auto-play="false">
  //...
</d-slides>
```

设置延时为 2000ms 效果：
<wrapper>
  <d-slides selected="2" delay="2000">
    <d-slides-item name="1">
      <div class="box">1</div>
    </d-slides-item>
    <d-slides-item name="2">
      <div class="box">2</div>
    </d-slides-item>
    <d-slides-item name="3">
      <div class="box">3</div>
    </d-slides-item>
  </d-slides>
</wrapper>

```html
<d-slides selected="2" delay="2000">
  //...
</d-slides>
```

> 需要注意的是：默认动画时长 animateTime 为 1000ms，组件中 delay 时长自动加上了动画时长以展现真实的等待时长。如果你修改了动画时长，那么就必须自行传入一个正确的 animateTime

### 去掉左右箭头和小圆圈

可以通过 enabledDots、enabledArrows 属性，控制小圆圈和左右箭头的显示。

<wrapper>
  <d-slides :enabledDots="false">
    <d-slides-item name="1">
      <div class="box">1</div>
    </d-slides-item>
    <d-slides-item name="2">
      <div class="box">2</div>
    </d-slides-item>
    <d-slides-item name="3">
      <div class="box">3</div>
    </d-slides-item>
  </d-slides>
</wrapper>

```html
<d-slides :enabledDots="false">
  //...
</d-slides>
```

### 修改轮播动画

组件内部只集成了一个动画效果：slides。本组件不提供其他额外的动画效果，也不提供传入 transition 动画名称，如果需要修改轮播动画，请自行覆盖 slides 的相应动画类的 CSS 样式。

如简单的淡入淡出：

<wrapper>
  <slides-demo></slides-demo>
</wrapper>

```css
.slides-enter-active,
.slides-leave-active {
  transition: all 1s linear;
}
.slides-enter {
  transform: none;
}
.slides-enter.reverse {
  transform: none;
}
.slides-leave-to {
  transform: none;
}
.slides-leave-to.reverse {
  transform: none;
}
```

源 Slides 动画样式为: 

```css
.slides-leave-active {
  position: absolute;
  top: 0;
  left: 0;
}
.slides-enter-active,
.slides-leave-active {
  transition: all 1s linear;
}
.slides-enter {
  transform: translateX(100%) scale(0);
}
.slides-enter.reverse {
  transform: translateX(-100%) scale(0);
  opacity: 0;
}
.slides-leave-to {
  transform: translateX(-100%) scale(0);
  opacity: 0;
}
.slides-leave-to.reverse {
  transform: translateX(100%) scale(0);
  opacity: 0;
}
```

## API

Slides props：

| 名称          |             类型              | 描述                                                     |
| ------------- | :---------------------------: | :------------------------------------------------------- |
| selected      |            String             | 默认展示的 item                                          |
| auto-play     |      Boolean，默认 true       | 是否自动轮播                                             |
| delay         | String  & Number，默认 1000ms | 轮播间隔                                                 |
| animateTime   | String  & Number，默认 1000ms | 动画时长，一般不应该进行设置，除非你修改了默认动画的时长 |
| enabledDots   |      Boolean，默认 true       | 是否展示小圆圈                                           |
| showDotsNum   |      Boolean，默认 true       | 是否展示小圆圈中的数字                                   |
| enabledArrows |      Boolean，默认 true       | 是否展示左右箭头                                         |

SlidesItem props：

| 名称 |       类型       | 描述            |
| ---- | :--------------: | :-------------- |
| name | String，required | 标识每一个 item |

事件：

| 名称            | 描述                         |
| --------------- | :--------------------------- |
| update:selected | 选中时，传递选中的 name 属性 |