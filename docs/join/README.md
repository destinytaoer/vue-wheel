---
title: 参与开发
---

# 参与开发

首先，fork 本项目到你的账号中，然后 clone 下你 fork 的项目到本地。

在你完成一个模块或修复一个 bug 之后，保证代码无 bug 的前提下，提交 merge request。

## 项目启动

启动项目：
```bash
npm run start
```

项目将运行在 localhost:8000

运行测试：
```bash
npm run test
```

打包项目：
```bash
npm run build
```

> 注意：package.json 中持续测试的脚本 test:dev，但是在 windows 中不能同时运行脚本中的两个命令，需要自行分开运行

## 进行开发

### 开发规范

- 每一个组件完成之后应该抽离为一个独立的分支
- 每个组件的修改需要提交到相应的分支以及主分支中
- 细化 commit，形成 commit 即开发过程的核心思想
- 每一个组件都必须编写相应的测试用例，保证代码的可测试以及功能的完整
- 每次修改完成需要本地测试通过
- 进行相应文档的更新

commit 规范：
- 开头以方括号表示模块，如 `[button] 完成组件样式`
- 每次提交应当只提交一个模块的修改
- 一个模块中做了不同的修改，则使用序号标识，如 `[button] 1.修复 xxx bug 2. 更改样式`
- 提交信息尽量简明扼要，可以分开提交的尽量分开提交

### 文档编辑

项目必须文档化，以便让开发者使用，也便于维护。

- 更新 README 中组件进度
- 官网中相应文档的更新

主要说明一下官网文档的更新。

开启官网文档：

```bash
npm run docs:dev
```

项目将运行在 localhost:8080

以新增组件为例：

（1）添加组件文档
添加组件之后，首先在 `docs/components/` 目录下，创建相应的 md 文件，文件名与组件名一致，尽量使用小写。

（2）增加侧边栏目录

在 `docs/.vuepress/config.js` 中添加组件侧边栏目录：

```javascript
module.exports = {
  //...
  themeConfig: {
    sidebar: [
      //...
      {
        title: '组件',
        children: [
          '/components/button',
          //...添加新组件文档路径
        ]
      }
    ],
  }
};
```

> 注意：修改 config.js、新增文档组件、修改 enhanceApp.js 等文件时，一般需要重新启动才能看到效果。

（3）全局注册组件

在 `docs/.vuepress/enhanceApp.js` 中引入组件文件并注册：

```javascript
import Button from '../../src/Button/Button';
export default ({ Vue, options, router, siteData }) => {
  Vue.component('d-button', Button);
}
```

（4）编写组件文档

组件文档目录应该尽量详细，对不同的用法进行分类说明，必须具有实例和实例相应代码的展示，对需要注意的地方一定要进行说明。并且，约定写完一个组件或者写组件的同时，进行文档的编写，防止细节的遗漏。

为了美观，每一个例子应该使用 wrapper 组件包裹，一般例子直接展示组件即可，如果需要展示与数据交互等的组件，那么需要自行在 `docs/.vuepress/components/` 下创建一个组件，自行组织逻辑。

目录大致分为：
- 基本的用法
- API 的说明
  - 详细参数
  - 事件
- 其他

## npm 包的发布

### 本地测试

在发布 npm 包之前，你需要在本地自行使用组件库，测试是否存在问题。

测试时，在本项目中使用 `yarn link`，然后在测试项目中使用 `yarn link vue-wheel-1`，之后即可直接测试使用，上述命令只需要初始化一次即可。每次更新本项目中的代码，只需要重新 build 即可。

### 发布正式包

> **在发布正式包之前，必须保证本地测试代码无 bug，单元测试全部通过。**

（1）修改 package.json 中的版本号

版本号约定：

- 第三位：bug 修复
- 第二位：新功能发布
- 第一位：整体重构，大幅度调整

（2）发布 npm 包

注意如果你使用了淘宝源，需要将源修改为 npm 官方源才能进行发布。

```bash
npm publish
```

（3）建立版本分支

每一次完成发布之后，立即建立一个版本分支，这个分支作为历史，不再做修改