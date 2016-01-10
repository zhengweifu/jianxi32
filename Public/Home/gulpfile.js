var gulp = require('gulp');

var plumber = require('gulp-plumber');

var sass = require('gulp-sass');

var notify = require('gulp-notify');

var rename = require('gulp-rename');

var minifycss = require('gulp-minify-css');

var jshint = require('gulp-jshint');

var uglify = require('gulp-uglify');

var cache = require('gulp-cache');

var imagemin = require('gulp-imagemin');

var buildSass = function(src, dist, message) {
	gulp.src(src)
	.pipe(plumber())
	.pipe(sass())
	//给文件添加.min后缀
	.pipe(rename({suffix: '.min'}))
	//保存未压缩文件到我们指定的目录下面
	// .pipe(gulp.dest("dist/"))

	//压缩样式文件
	.pipe(minifycss())
	//输出压缩文件到指定目录
	.pipe(gulp.dest(dist))
	//提醒任务完成
	.pipe(notify({message: message}));
};

gulp.task('styles-basic-sass', function() {
	buildSass(["src/basic/sass/*.scss", "!src/basic/sass/jxvariables.scss"], "dist/basic/css", "Styles basic sass task complete")
});

gulp.task('styles-2d-sass', function() {
	buildSass(["src/2d/sass/*.scss"], "dist/2d/css", "Styles 2d sass task complete");
});

gulp.task('styles-3d-sass', function() {
	buildSass(["src/3d/sass/*.scss"], "dist/3d/css", "Styles 3d sass task complete");
});

gulp.task('styles-css', function() {
	gulp.src('src/**/css/*')
	.pipe(plumber())
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest("dist/"))
});

gulp.task("scripts", function() {
	gulp.src('src/**/js/*.js')
	.pipe(plumber())
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(uglify())
	.pipe(gulp.dest('dist/'))
	.pipe(notify({message: 'Scripts cass task complete'}));
});

// Images
gulp.task('images', function() {
	gulp.src('src/**/imgs/**/*')
	.pipe(plumber())
	//.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	.pipe(gulp.dest('dist/'))
	.pipe(notify({message: 'Images task complete'}));
});

// Copys
gulp.task('copys', function() {
	gulp.src('src/**/fonts/*')
	.pipe(plumber())
	.pipe(rename({ suffix: '' }))
	.pipe(gulp.dest('dist/'))
	.pipe(notify({message: 'Copys task complete'}));
});

// Default task
gulp.task('default', function() {
	gulp.start('styles-basic-sass', 'styles-2d-sass', 'styles-3d-sass', 'styles-css', 'scripts', 'images', 'copys');
});

gulp.task('watch', function() {
	gulp.watch('src/**/sass/*.scss', ['styles-basic-sass', 'styles-2d-sass', 'styles-3d-sass']);
	gulp.watch('src/**/js/*.js', ['scripts']);
	gulp.watch('src/**/css/*.css', ['styles-css']);
	gulp.watch('src/**/imgs/*', ['images']);
	gulp.watch('src/**/fonts/*', ['copys']);
});
