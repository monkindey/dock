/**
 * gulp-imagemin使用：(http://www.dtao.org/archives/26)
 */
'use strict'

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('imagemin', function() {
	return gulp.src('images/*')
		.pipe(imagemin({
			// 无损压缩jpg
			progressive: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest('images/'));
});

gulp.task('default', ['imagemin']);

