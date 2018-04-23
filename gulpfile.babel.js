import gulp from 'gulp'
import gutil from 'gulp-util'
import babel from 'gulp-babel'
import gls from 'gulp-live-server'
import mocha from 'gulp-mocha'
import gulpWebpack from 'gulp-webpack'
import webpack from 'webpack'
import webpackConfig from './webpack.config.js'
import { Server } from 'karma'
import { protractor } from 'gulp-protractor'

gulp.task('transpile', () => {
	return gulp.src(['src/backend/**/*.js'])
		.pipe(babel())
		.pipe(gulp.dest('dist/backend/'))
})

gulp.task('start:watch', ['transpile'], () => {
	const server = gls.new('dist/backend/server.js')
	server.start()

	gulp.watch('src/**/*.js', ['transpile', () => {		
		server.start()
	}])
})

gulp.task('backend', () => {
	gulp.src('test/backend/**/*.js', {read: false})
		.pipe(mocha({
			compilers: 'js:babel-core/register',
			timeout: 120000,
			globals: ['recursive'],
			require: ['babel-polyfill']
		}))
})

gulp.task('frontend-components', function(done) {
	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start()
})

gulp.task('webpack', () => {
	return gulp.src(['src/frontend/**/*.js'])
		.pipe(gulpWebpack(webpackConfig, webpack))
		.pipe(gulp.dest('dist/frontend/'))
})

gulp.task('build', ['transpile', 'webpack'])

gulp.task('all', ['backend', 'frontend-all'])

gulp.task('all-non-e2e', ['backend', 'frontend-components'])