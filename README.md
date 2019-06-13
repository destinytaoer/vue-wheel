<p align="center">
  <a href="https://github.com/destinytaoer/vue-wheel" target="_blank" rel="noopener noreferrer">
    <img width="100" src="https://lccdn.phphub.org/assets/images/twemoji/snowflake.png" alt="Vue Wheel logo">
  </a>
</p>

<p align="center">
  <a href="https://www.travis-ci.org/destinytaoer/vue-wheel" target="_blank">
    <img src="https://www.travis-ci.org/destinytaoer/vue-wheel.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://npmcharts.com/compare/vue-wheel-1?minimal=true" target="_blank">
    <img src="https://img.shields.io/npm/dm/vue-wheel-1.svg" alt="Downloads">
  </a>
  <a href="https://www.npmjs.com/package/vue-wheel-1" target="_blank">
    <img src="https://img.shields.io/github/package-json/v/destinytaoer/vue-wheel/master.svg" alt="Version">
  </a>
  <a href="./LICENSE" target="_blank">
    <img src="https://img.shields.io/npm/l/vue-wheel-1.svg?registry_uri=https%3A%2F%2Fregistry.npmjs.com" alt="License">
  </a>
</p>

<h2 align="center">Vue Wheel -- 一个用 Vue 写的 UI 组件库</h2>

这是学习 Vue 时，通过一个[视频教程](https://xiedaimala.com/courses/6d63da67-6eea-4711-aeb4-0c3a949341dc#/common)构建的，对自己帮助非常大，也希望对你有所帮助。

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
    'd-button': Button
  }
}
```

### 使用组件
```html
<d-buttton>按钮<d-button>
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