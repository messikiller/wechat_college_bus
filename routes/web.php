<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () { return view('welcome'); });
Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/admin', 'AdminController@index')->name('admin');

Route::group([
    'middleware' => ['admin'],
    'namespace' => 'Admin',
    'prefix' => 'admin/api'
], function () {
    Route::get('/through/bus/list', 'ThroughBusController@list');
    Route::post('/through/bus/add', 'ThroughBusController@add');
    Route::post('/through/bus/edit', 'ThroughBusController@edit');
});
