---
title: Grid - 栅格系统
---
# 栅格系统

Vue Wheel 中的栅格系统划分为 24 格，

## 基本用法

<wrapper>
  <basic-grid></basic-grid>
</wrapper>

## 响应式

<wrapper>
  <response-grid></response-grid>
</wrapper>

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