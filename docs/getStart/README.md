---
title: 快速上手
---
# 快速上手

## 样式设置

使用本 UI 组件库前，你需要在 CSS 中开启 border-box：
```css
*,
*::after,
*::before {
  box-sizing: border-box;
}
```
IE8 及以上浏览器支持此样式。

## 引入 UI 组件库
```javascript
import { Button } from 'vue-wheel-1'
import 'vue-wheel-1/dist/index.css'

export defult {
  components: {
    'd-button': Button
  }
}
```

## 使用组件
```html
<d-buttton>按钮<d-button>
```