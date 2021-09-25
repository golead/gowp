const gulp = require( 'gulp' );
const { src, dest } = require( 'gulp' );
const cssmin = require( 'gulp-cssmin' );
const babel = require( 'gulp-babel' );
const uglify = require( 'gulp-uglify' );
const rename = require( 'gulp-rename' );

exports.default = function () {
    return src( 'src/js/*.js' )
        .pipe( babel() )
        .pipe( dest( 'dist/' ) )
        .pipe( uglify() )
        .pipe( rename( { extname: '.min.js' } ) )
        .pipe( dest( 'dist/' ) );
};

gulp.task( 'css', function () {
    return src( 'src/css/plugin.css' )
        .pipe( dest( 'dist' ) )
        .pipe( cssmin() )
        .pipe( rename( { extname: '.min.css' } ) )
        .pipe( gulp.dest( 'dist' ) );
} );