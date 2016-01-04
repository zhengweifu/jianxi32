var gulp = require('gulp');

var sass = require('gulp-sass');

var notify = require('gulp-notify');

var rename = require('gulp-rename');

var minifycss = require('gulp-minify-css');

var jshint = require('gulp-jshint');

var uglify = require('gulp-uglify');

var cache = require('gulp-cache');

var imagemin = require('gulp-imagemin');

gulp.task('styles-sass', function() {
	gulp.src(["src/basic/sass/jx.scss", "src/basic/sass/jx2d.scss", "src/basic/sass/jxindex.scss"])
	.pipe(sass())
	//给文件添加.min后缀
	.pipe(rename({suffix: '.min'}))
	//保存未压缩文件到我们指定的目录下面
	.pipe(gulp.dest("dist/basic/css"))

	//压缩样式文件
	.pipe(minifycss())
	//输出压缩文件到指定目录
	.pipe(gulp.dest("dist/basic/css"))
	//提醒任务完成
	.pipe(notify({message: "Styles sass task complete"}));
});

gulp.task('styles-css', function() {
	gulp.src('src/**/css/*')
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest("dist/"))
});

gulp.task("scripts", function() {
	gulp.src('src/**/js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(uglify())
	.pipe(gulp.dest('dist/'))
	.pipe(notify({message: 'Scripts cass task complete'}));
});

// Images
gulp.task('images', function() {
	gulp.src('src/**/imgs/*')
	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	.pipe(gulp.dest('dist/'))
	.pipe(notify({message: 'Images task complete'}));
});

// Copys
gulp.task('copys', function() {
	gulp.src('src/**/fonts/*')
	.pipe(rename({ suffix: '' }))
	.pipe(gulp.dest('dist/'))
	.pipe(notify({message: 'Copys task complete'}));
});

// Default task
gulp.task('default', function() {
	gulp.start('styles-sass', 'styles-css', 'scripts', 'images', 'copys');
});

gulp.task('watch', function() {
	gulp.watch('src/**/sass/*.scss', ['styles-sass']);
	gulp.watch('src/**/js/*.js', ['scripts']);
	gulp.watch('src/**/css/*.css', ['styles-css']);
	gulp.watch('src/**/imgs/*', ['images']);
	gulp.watch('src/**/fonts/*', ['copys']);
});
