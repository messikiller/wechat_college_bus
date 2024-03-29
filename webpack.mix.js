let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

 mix.react('resources/assets/js/admin.js', 'public/js/admin.js')
    .sass('resources/assets/sass/app.scss', 'public/css/app.css');

mix.js('resources/assets/js/home.js', 'public/js/home.js');
 mix.js('resources/assets/js/app.js', 'public/js/app.js');
