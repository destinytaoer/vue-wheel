---
title: Popover - 弹出框
---

# 弹出框

## 基本用法

### 默认 click 触发
<wrapper>
  <d-popover>
    <template slot="content">
      <div>
        popover 内容
      </div>
    </template>
    <d-button>上</d-button>
  </d-popover>
  <d-popover position="bottom">
    <template slot="content">
      <div>
        popover 内容
      </div>
    </template>
    <d-button>下</d-button>
  </d-popover>
  <d-popover position="left">
    <template slot="content">
      <div>
        popover 内容
      </div>
    </template>
    <d-button>左</d-button>
  </d-popover>
  <d-popover position="right">
    <template slot="content">
      <div>
        popover 内容
      </div>
    </template>
    <d-button>右</d-button>
  </d-popover>
</wrapper>

```html
<d-popover position="bottom">
  <template slot="content">
    <div>
      popover 内容
    </div>
  </template>
  <d-button>下</d-button>
</d-popover>
```

Popover 提供了两个插槽，默认插槽是触发器，而 content 插槽是内容，默认是隐藏的，点击触发器才会出现内容。

通过 position 可以控制弹窗出现的位置，默认为 top。

### hover 触发显示内容

Popover 默认是通过 click 事件来控制内容的显示隐藏，通过 trigger 属性可以修改为 hover，通过鼠标移动来可控制。

<wrapper>
  <d-popover trigger="hover">
    <template slot="content">
      <div>
        popover 内容
      </div>
    </template>
    <d-button>上</d-button>
  </d-popover>
  <d-popover trigger="hover" position="bottom">
    <template slot="content">
      <div>
        popover 内容
      </div>
    </template>
    <d-button>下</d-button>
  </d-popover>
  <d-popover trigger="hover" position="left">
    <template slot="content">
      <div>
        popover 内容
      </div>
    </template>
    <d-button>左</d-button>
  </d-popover>
  <d-popover trigger="hover" position="right">
    <template slot="content">
      <div>
        popover 内容
      </div>
    </template>
    <d-button>右</d-button>
  </d-popover>
</wrapper>

```html
<d-popover trigger="hover">
  <template slot="content">
    <div>
      popover 内容
    </div>
  </template>
  <d-button>上</d-button>
</d-popover>
```

## API

props：

| 名称     |               类型               | 描述                         |
| -------- | :------------------------------: | :--------------------------- |
| position | String: top、bottom、left、right | 弹出框出现的位置             |
| trigger  |       String: click、hover       | 弹窗框的显示和隐藏的触发方式 |

事件：

| 名称 |  类型  | 描述           |
| ---- | :----: | :------------- |
| hide | String | 内容隐藏时触发 |
| show | String | 内容显示时触发 |
