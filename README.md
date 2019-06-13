# Vue-Wheel

Vue 实现的 UI 组件库，本项目[官方文档](https://destinytaoer.github.io/vue-wheel/)👀

## 开始使用

### 安装

```bash
npm install vue-wheel-1
```

### 样式设置

使用本 UI 组件库前，你需要在 CSS 中开启 border-box：
```css
*,
*::after,
*::before {
  box-sizing: border-box;
}
```
IE8 及以上浏览器支持此样式。

### 引入 UI 组件库
```javascript
import { Button } from 'vue-wheel-1'
import 'vue-wheel-1/dist/index.css'

export defult {
  components: {
    'g-button': Button
  }
}
```

### 使用组件
```html
<g-buttton>按钮<g-button>
```

## 组件进度

- Button
- Icon
- ButtonGroup

计划中：

- Input
- InputGroup

## Issues

欢迎提[Issue](https://github.com/destinytaoer/vue-wheel/issues)

## 参与开发

### 项目启动

clone 下本项目之后，你可以运行一下命令：

启动项目：
```bash
npm run start
```

运行测试：
```bash
npm run test
```

打包项目：
```bash
npm run build
```

> 注意：package.json 中持续测试的脚本 test:dev，但是在 windows 中不能同时运行脚本中的两个命令，需要自行分开运行

### 开发规范

- 每个组件的修改需要提交到相应的分支中
- 细化 commit，形成 commit 即开发过程的核心思想
- 每次修改完成需要本地测试通过
- 进行特定文档的更新

### 本地测试

在本项目中使用 `yarn link`，然后在测试项目中使用 `yarn link vue-wheel-1`，之后即可直接测试使用，上述命令只需要初始化一次即可。每次更新本项目中的代码，只需要重新 build 即可。

## 代码贡献

感谢以下代码贡献者🤝：

<a href="https://github.com/destinytaoer/vue-wheel/graphs/contributors">
  <img src="https://avatars3.githubusercontent.com/u/27852774?s=460&v=4" width="40" />
</a>

## 许可证

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, destiny