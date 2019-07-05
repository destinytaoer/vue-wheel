---
title: Button - 按钮
---
# 按钮

## 普通按钮

<wrapper>
  <d-button>按钮</d-button>
</wrapper> 

```html
<d-button>按钮</d-button>
```

## disabled 状态按钮

<wrapper>
  <d-button disabled>disabled 按钮</d-button>
  <d-button readonly>readonly 按钮</d-button>
</wrapper> 

```html
<d-button disabled>disabled 按钮</d-button>
<d-button readonly>readonly 按钮</d-button>
```

## 给按钮添加 icon

<wrapper>
  <d-button icon="settings">设置</d-button>
  <d-button
    icon="settings"
    icon-pos="right"
  >设置</d-button>
</wrapper> 

```html
<d-button icon="settings">设置</d-button>
<!-- 通过 icon-pos 控制 icon 位置 -->
<d-button icon="settings" icon-pos="right">设置</d-button>
```
    
## loading 状态按钮

<wrapper>
  <d-button :loading='true'>按钮</d-button>
</wrapper>

```html
<d-button :loading='true'>按钮</d-button>
```

我们可以控制 loading 的显示：

<wrapper>
  <loading-button></loading-button>
</wrapper>

```html
<d-button :loading='loading1' @click="loading1 = !loading1">点击 loading</d-button>

<d-button
  icon="settings"
  :loading='loading2'
  @click="loading2 = !loading2"
>点击 loading</d-button>

<d-button
  icon="settings"
  icon-pos="right"
  :loading='loading3'
  @click="loading3 = !loading3"
>点击 loading</d-button>
```

## 按钮组

<wrapper>
  <d-button-group>
    <d-button icon='left'>上一页</d-button>
    <d-button icon='right' icon-pos="right">下一页</d-button>
  </d-button-group>
</wrapper>

```html
<d-button-group>
  <d-button icon='left'>上一页</d-button>
  <d-button icon='right' icon-pos="right">下一页</d-button>
</d-button-group>
```
    