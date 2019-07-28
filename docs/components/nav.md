---
title: Nav - 导航
---

# 导航

## 基本用法

### 简单导航

<wrapper>
  <d-nav>
    <d-nav-item name="home">首页</d-nav-item>
    <d-nav-item name="start">开始</d-nav-item>
    <d-nav-item name="about">关于</d-nav-item>
  </d-nav>
</wrapper>

```html
<d-nav>
  <d-nav-item name="home">首页</d-nav-item>
  <d-nav-item name="start">开始</d-nav-item>
  <d-nav-item name="about">关于</d-nav-item>
</d-nav>
```

### 设置默认选中值

通过传入 selected 属性，表示初始展示值，默认不选中任何项。selected 的值为每个 NavItem 的 name 属性值。

<wrapper>
  <d-nav selected="start">
    <d-nav-item name="home">首页</d-nav-item>
    <d-nav-item name="start">开始</d-nav-item>
    <d-nav-item name="about">关于</d-nav-item>
  </d-nav>
</wrapper>

```html
<d-nav>
  <d-nav-item name="home">首页</d-nav-item>
  <d-nav-item name="start">开始</d-nav-item>
  <d-nav-item name="about">关于</d-nav-item>
</d-nav>
```

还可以使用变量来表示 selected，此时可以使用 .sync 修饰符来达到同步的效果。

```html
<d-nav :selected.sync="selected">
  //...
</d-nav>
```

### 添加 Icon

<wrapper>
  <d-nav selected="start">
    <d-nav-item name="home"><span style="margin-right: 5px">首页</span><d-icon name="settings"></d-icon></d-nav-item>
    <d-nav-item name="start">开始</d-nav-item>
    <d-nav-item name="about">关于</d-nav-item>
  </d-nav>
</wrapper>

```html
<d-nav>
  <d-nav-item name="home">
    <span style="margin-right: 5px">首页</span>
    <d-icon name="settings"></d-icon>
  </d-nav-item>
  <d-nav-item name="start">开始</d-nav-item>
  <d-nav-item name="about">关于</d-nav-item>
</d-nav>
```

注意：本组件中没有对间距进行处理，所以需要自行设置间距

### 无限级导航

使用 NavSubItem 组件包裹 NavItem 设置下一级的导航菜单。可以无限级进行嵌套。

<wrapper>
  <d-nav>
    <d-nav-item name="home">首页</d-nav-item>
    <d-nav-item name="start">开始</d-nav-item>
    <d-nav-sub-item title="关于">
      <d-nav-item name="culture">企业文化</d-nav-item>
      <d-nav-item name="developers">开发团队</d-nav-item>
    </d-nav-sub-item>
  </d-nav>
</wrapper>

```html
<d-nav>
  <d-nav-item name="home">首页</d-nav-item>
  <d-nav-item name="start">开始</d-nav-item>
  <d-nav-sub-item title="关于">
    <d-nav-item name="culture">企业文化</d-nav-item>
    <d-nav-item name="developers">开发团队</d-nav-item>
  </d-nav-sub-item>
</d-nav>
```

### 竖向导航

通过添加 vertical 属性使得导航编程竖向的。

<wrapper>
  <d-nav vertical>
    <d-nav-item name="home">首页</d-nav-item>
    <d-nav-item name="start">开始</d-nav-item>
    <d-nav-sub-item title="关于">
      <d-nav-item name="culture">企业文化</d-nav-item>
      <d-nav-item name="developers">开发团队</d-nav-item>
    </d-nav-sub-item>
  </d-nav>
</wrapper>

```html
<d-nav vertical>
  <d-nav-item name="home">首页</d-nav-item>
  <d-nav-item name="start">开始</d-nav-item>
  <d-nav-sub-item title="关于">
    <d-nav-item name="culture">企业文化</d-nav-item>
    <d-nav-item name="developers">开发团队</d-nav-item>
  </d-nav-sub-item>
</d-nav>
```

竖向的导航，需要通过**点击**来展开下一级菜单。其宽度默认为自适应内容的宽度：`fit-content`，可以自行通过 CSS 进行覆盖。

### 同时展开多个

我们可以通过添加 multiple 属性设置多选，可以展开多个，默认只能展开一个。

> 由于横向导航是通过鼠标移入进行展开的，所以其行为只能是展开一个下级导航。所以这个选项只适用于竖向导航。

默认：
<wrapper>
  <d-nav vertical>
    <d-nav-item name="home">首页</d-nav-item>
    <d-nav-sub-item title="开始">
      <d-nav-item name="install">安装</d-nav-item>
      <d-nav-item name="components">组件</d-nav-item>
    </d-nav-sub-item>
    <d-nav-sub-item title="关于">
      <d-nav-item name="culture">企业文化</d-nav-item>
      <d-nav-item name="developers">开发团队</d-nav-item>
    </d-nav-sub-item>
  </d-nav>
</wrapper>

```html
<d-nav vertical>
  <d-nav-item name="home">首页</d-nav-item>
  <d-nav-sub-item title="开始">
    <d-nav-item name="install">安装</d-nav-item>
    <d-nav-item name="components">组件</d-nav-item>
  </d-nav-sub-item>
  <d-nav-sub-item title="关于">
    <d-nav-item name="culture">企业文化</d-nav-item>
    <d-nav-item name="developers">开发团队</d-nav-item>
  </d-nav-sub-item>
</d-nav>
```

添加 multiple：
<wrapper>
  <d-nav vertical multiple>
    <d-nav-item name="home">首页</d-nav-item>
    <d-nav-sub-item title="开始">
      <d-nav-item name="install">安装</d-nav-item>
      <d-nav-item name="components">组件</d-nav-item>
    </d-nav-sub-item>
    <d-nav-sub-item title="关于">
      <d-nav-item name="culture">企业文化</d-nav-item>
      <d-nav-item name="developers">开发团队</d-nav-item>
    </d-nav-sub-item>
  </d-nav>
</wrapper>

```html
<d-nav vertical multiple>
  <d-nav-item name="home">首页</d-nav-item>
  <d-nav-sub-item title="开始">
    <d-nav-item name="install">安装</d-nav-item>
    <d-nav-item name="components">组件</d-nav-item>
  </d-nav-sub-item>
  <d-nav-sub-item title="关于">
    <d-nav-item name="culture">企业文化</d-nav-item>
    <d-nav-item name="developers">开发团队</d-nav-item>
  </d-nav-sub-item>
</d-nav>
```

## API

Nav props：

| 名称     |        类型         | 描述                 |
| -------- | :-----------------: | :------------------- |
| selected |       String        | 默认选中的 item      |
| vertical | Boolean，默认 false | 是否竖向             |
| multiple | Boolean，默认 false | 是否可以同时展开多个 |

NavItem props：

| 名称 |       类型       | 描述            |
| ---- | :--------------: | :-------------- |
| name | String，required | 标识每一个 item |

NavSubItem props：

| 名称  |       类型       | 描述           |
| ----- | :--------------: | :------------- |
| title | String，required | 多级导航的标题 |

事件：

| 名称            | 描述                         |
| --------------- | :--------------------------- |
| update:selected | 选中时，传递选中的 name 属性 |