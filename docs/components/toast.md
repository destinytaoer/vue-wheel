---
title: Toast - 消息提示
---
# 消息提示

Toast （吐司：类似吐司机一样烤完后把面包吐出来），在 Vue Wheel 中实际上应该称为 Message 更加合适，Toast 的称呼更多的是应用于移动端的组件。

## 基本用法

这个组件并不是使用组件本身元素，而是利用其它元素作为触发器，如 button。Toast 组件本身是那个消息弹窗。

Vue Wheel 提供了一个插件 plugin.js，你需要这样使用它：

```js
import Vue from 'vue;';
import toast from './Toast/plugin';
Vue.use(toast);
```

之后，你就可以在 Vue 实例中使用 $toast 方法进行弹窗。

<wrapper>
  <toast-demo></toast-demo>
</wrapper>

```html
<d-button @click="showToast('top')">show toast top</d-button>
<d-button @click="showToast('bottom')">show toast bottom</d-button>
<d-button @click="showToast('middle')">show toast middle</d-button>
```

```js
//...
showToast(position) {
  this.$toast(`Toast ${position}`, {
    autoClose: 1,
    position,
    enableButton: true
  });
}
```

## API

$toast 接受两个参数：msg 消息 以及 传递给 Toast 的数据 propsData

Toast 组件的 propsData:

| 名称         |            类型             | 描述                                                  |
| ------------ | :-------------------------: | :---------------------------------------------------- |
| autoClose    |      Boolean or Number      | 是否自动关闭，数值时为自动关闭时间，默认为 5          |
| enableButton |           Boolean           | 是否需要关闭按钮，默认 false                          |
| closeButton  |   Object{text, callback}    | 关闭按钮的文字以及点击时的回调，默认文字为中文 “关闭” |
| enableHtml   |           Boolean           | 是否支持 HTML，默认 false                             |
| position     | String：top、middle、bottom | 消息弹出位置，默认 top                                |

事件：

| 名称  | 描述                                          |
| :---- | :-------------------------------------------- |
| close | 当消息弹窗关闭时，Toast 会触发一个 close 事件 |