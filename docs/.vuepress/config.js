module.exports = {
  title: 'Vue Wheel',
  description: '基于 Vue 开发的 UI 组件库',
  base: '/vue-wheel/',
  head: [['link', { rel: 'icon', href: '/logo.png', type: 'image/png' }]],
  themeConfig: {
    nav: [{ text: '开始', link: '/getStart/' }],
    sidebar: [
      {
        title: '入门',
        children: ['/install/', '/getStart/']
      },
      {
        title: '组件',
        children: [
          '/components/icon',
          '/components/button',
          '/components/input',
          '/components/grid',
          '/components/layout',
          '/components/toast',
          '/components/tabs',
          '/components/popover',
          '/components/collapse'
        ]
      },
      '/join/'
    ],
    sidebarDepth: 2,
    repo: 'destinytaoer/vue-wheel',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '编辑此页面',
    lastUpdated: '上次更新时间'
  },
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  }
};
