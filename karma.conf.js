module.exports = (config) => {
  const configuration = {

    basePath: 'test/frontend',

    frameworks: [ 'mocha' ],

    files: [ 'all_tests.js' ],

    preprocessors: {
      'all_tests.js': [ 'webpack' ],
    },

    reporters: [ 'mocha' ],

    mochaReporter: {
			output: "full"
		},

    webpack: require('./webpack.config'),
    webpackMiddleware: {
      stats: 'errors-only'
    },

    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },

    port: 9876,
    browsers: ['Chrome'],
    singleRun: true,

    customLaunchers: {
      Chrome_travis_ci: {
           base: 'Chrome',
           flags: ['--no-sandbox']
       }
     }
  };
  if(process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
  }
  
  config.set(configuration);
}