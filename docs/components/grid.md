---
title: Grid - 栅格系统
---

# 栅格系统

Vue Wheel 中的栅格系统划分为 24 格

## 基本用法

<wrapper>
  <basic-grid></basic-grid>
</wrapper>

```html
<d-row gutter="10">
  <d-col span="8"><div>8</div></d-col>
  <d-col span="8"><div>8</div></d-col>
  <d-col span="8"><div>8</div></d-col>
</d-row>
<d-row gutter="10">
  <d-col span="6"><div>6</div></d-col>
  <d-col span="6"><div>6</div></d-col>
  <d-col span="6"><div>6</div></d-col>
  <d-col span="6"><div>6</div></d-col>
</d-row>
```

## 响应式

<wrapper>
  <response-grid></response-grid>
</wrapper>

```html
<d-row gutter="10">
  <d-col span="24" :pad="{span: '12'}"
    :narrowPc="{span: '8'}" :pc="{span: '6'}" :widePc="{span: '4'}">
    <div>{{width}}</div>
  </d-col>
  <d-col span="24" :pad="{span: '12'}"
    :narrowPc="{span: '8'}" :pc="{span: '6'}" :widePc="{span: '4'}">
    <div>{{width}}</div>
  </d-col>
  <d-col span="24" :pad="{span: '12'}"
    :narrowPc="{span: '8'}" :pc="{span: '6'}" :widePc="{span: '4'}">
    <div>{{width}}</div>
  </d-col>
  <d-col span="24" :pad="{span: '12'}"
    :narrowPc="{span: '8'}" :pc="{span: '6'}" :widePc="{span: '4'}">
    <div>{{width}}</div>
  </d-col>
  <d-col span="24" :pad="{span: '12'}"
    :narrowPc="{span: '8'}" :pc="{span: '6'}" :widePc="{span: '4'}">
    <div>{{width}}</div>
  </d-col>
  <d-col span="24" :pad="{span: '12'}"
    :narrowPc="{span: '8'}" :pc="{span: '6'}" :widePc="{span: '4'}">
    <div>{{width}}</div>
  </d-col>
</d-row>
```

```js
export default {
  data() {
    return {
      width: ''
    };
  },
  methods: {
    testWidth(width) {
      if (width >= 1200) {
        this.width = '4';
      } else if (width >= 992 && width < 1200) {
        this.width = '6';
      } else if (width >= 768 && width < 992) {
        this.width = '8';
      } else if (width >= 576 && width < 768) {
        this.width = '12';
      } else {
        this.width = '24';
      }
    }
  },
  mounted() {
    this.testWidth(window.innerWidth);
    window.onresize = e => {
      this.testWidth(e.target.innerWidth);
    };
  }
};
```

像素基准:

| 名称            |     像素范围      |
| --------------- | :---------------: |
| phone - 手机    |      <576px       |
| pad - 平板      | >=576px & <768px  |
| narrowPc - 窄屏 | >=768px & <992px  |
| pc - 正常屏     | >=992px & <1200px |
| widePc - 宽屏   |     >=1200px      |

## API

Row props:

| 名称   |              类型               | 描述               |
| ------ | :-----------------------------: | :----------------- |
| gutter |        String or Number         | Col 中间的间隙     |
| align  | String: 'left' 'right' 'center' | Col 的水平对齐方式 |

Col props:

| 名称     |         类型         | 描述                                |
| -------- | :------------------: | :---------------------------------- |
| span     |   String or Number   | Col 占据的位置大小（手机）          |
| offset   |   String or Number   | Col 的偏移大小（手机）              |
| pad      | Object{span, offset} | Col 占据的位置大小和偏移（平板）    |
| narrowPc | Object{span, offset} | Col 占据的位置大小和偏移（窄屏 PC） |
| pc       | Object{span, offset} | Col 占据的位置大小和偏移（正常 PC） |
| widePc   | Object{span, offset} | Col 占据的位置大小和偏移（大屏 PC） |
