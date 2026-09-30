// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {},
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/fresh17'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    // Keep the Chrome test window alive when it is minimized or in the background:
    // stop Chrome from throttling the idle tab, and give Karma a long grace period
    // before it treats a quiet browser as disconnected.
    browsers: ['ChromeKeepAlive'],
    customLaunchers: {
      ChromeKeepAlive: {
        base: 'Chrome',
        flags: [
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding'
        ]
      }
    },
    browserNoActivityTimeout: 24 * 60 * 60 * 1000,
    browserDisconnectTimeout: 60 * 1000,
    browserDisconnectTolerance: 10,
    captureTimeout: 5 * 60 * 1000,
    restartOnFileChange: true
  });
};
