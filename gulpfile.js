var gulp = require('gulp');
var browserify = require('browserify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserSync = require('browser-sync').create();
var babelify = require('babelify');

var bundle = function(bundler) {
 //entrypoint into app
   return bundler
   //converts JSX to javascript, also ES6 functionality
     .transform(babelify)
     .bundle()
     .on('error', function(e){
       gutil.log(e);
     })
     //bundle will be named bundle.js
     .pipe(source('bundle.js'))
     //bundle will be located at dist/js
     .pipe(gulp.dest('public/'))
     //lets browserSync know when there is a new version
     .pipe(browserSync.stream());

};

gulp.task('watch', function(){
  
  var watcher = watchify(browserify('./client/App.js', watchify.args));

  bundle(watcher);
  //on update, run browserify again
  watcher.on('update', function(){
    bundle(watcher);
  });

  //logs information to the console
  watcher.on('log', gutil.log);

  browserSync.init({
    server: "./public",
    logFileChanges: false
  });
});

gulp.task('browserify', function() {
  return bundle(browserify('./client/App.js'));
});

gulp.task('default',['watch']);

gulp.task('bundle', ['browserify']);
