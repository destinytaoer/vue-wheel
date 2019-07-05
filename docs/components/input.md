---
title: Input - 输入框
---
# 输入框

## 基本用法

### 默认输入框

<wrapper>
  <d-input></d-input>
</wrapper>

```html
<d-input></d-input>
```

设置默认值

<wrapper>
  <d-input value="Vue Wheel"></d-input>
</wrapper>

```html
<d-input value="Vue Wheel"></d-input>
```

### 禁用输入框

<wrapper>
  <d-input disabled></d-input>
</wrapper>

```html
<d-input disabled></d-input>
```

### 验证提示

<wrapper>
  <d-input value="Vue" error="不能少于 6 个字"></d-input>
</wrapper>

```html
<d-input value="Vue" error="不能少于 6 个字"></d-input>
```

我们可以与 input 或者 blur 等事件相结合来实现动态提示：

<wrapper>
  <validate-input></validate-input>
</wrapper>

```html
<template>
  <d-input
    v-model="message"
    @input="validate"
    :error="error"
  ></d-input>
</template>
<script>
export default {
  data() {
    return {
      message: "vue",
      error: "不能少于 6 个字"
    };
  },
  methods: {
    validate(val) {
      if (val.length > 6) {
        this.error = "";
      } else {
        this.error = "不能少于 6 个字";
      }
    }
  }
};
</script>
```

### 支持双向绑定

<wrapper>
  <model-input></model-input>
</wrapper>

## API

props：

| 名称     |  类型   | 描述               |
| -------- | :-----: | :----------------- |
| value    | String  | 输入框的值         |
| disabled | Boolean | 是否禁用输入框     |
| readonly | Boolean | 输入框是否只读     |
| error    | String  | 显示的错误提示信息 |

事件：

| 名称   | 描述                 |
| :----- | :------------------- |
| change | 值改变时触发         |
| input  | 输入时触发           |
| focus  | 输入框获得聚焦时触发 |
| blur   | 输入框失焦时触发     |