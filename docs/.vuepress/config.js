module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  dest: './dist',
  themeConfig: {
    nav: [{ text: '开始', link: '/getStart/' }],
    sidebar: [
      {
        title: '入门',
        children: ['/install/', '/getStart/']
      },
      {
        title: '组件',
        children: ['/components/icon', '/components/button']
      }
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
