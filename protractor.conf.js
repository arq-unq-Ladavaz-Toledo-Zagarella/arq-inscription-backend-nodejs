exports.config = {
 framework: 'mocha',
 mochaOpts: {
   timeout: 300000
 },
 seleniumAddress: process.env.WEBDRIVER_URL || 'http://localhost:4444/wd/hub',
 baseUrl: process.env.SERVER_URL,
 onPrepare: function () {
   require("babel-register");
 },
 specs: ['test/e2e/*.test.js']
};