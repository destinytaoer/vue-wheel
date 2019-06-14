module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // 引入的框架，其会引入 mocha、sinon-chai，其中 sinon-chai 实际上会引入 sinon 和 chai 并将其合并，实际上我们使用的断言就是 sinon-chai 的 API，sinon 提供 spy，chai 提供 expect
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai'],
    client: {
      chai: {
        includeStack: true
      }
    },


    // 需要测试的文件
    files: [
      // /**/*.test.js 表示不管是多少层级的 .test.js 文件
      'dist/**/*.test.js',
      'dist/**/*.test.css'
    ],


    // list of files / patterns to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},


    // 测试结果的显示插件，
    // 可选的值有: 'dots', 'progress'
    // 更多的插件请查看: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // 开启的 web 服务端口
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // 需要开启的测试浏览器，ChromeHeadless 表示无头的 chrome，即隐藏的，如果使用的是 Chrome，那么在测试时会自动弹出一个浏览器，又自动关闭
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],


    // 持续集成模式
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}