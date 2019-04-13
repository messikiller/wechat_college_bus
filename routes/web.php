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

Auth::routes();

Route::get('/', function () { return view('welcome'); });
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/admin', 'AdminController@index')->name('admin');

Route::group([
    'namespace' => 'Api',
    'prefix' => 'api'
], function () {
    Route::get('/through/bus/index', 'ThroughBusController@index');
    Route::get('/through/bus/view', 'ThroughBusController@view');
    Route::post('/through/bus/buy', 'ThroughBusController@buy');
});

Route::group([
    'middleware' => ['admin'],
    'namespace' => 'Admin',
    'prefix' => 'admin/api'
], function () {
    Route::get('/through/bus/list', 'ThroughBusController@list');
    Route::get('/through/bus/view', 'ThroughBusController@view');
    Route::post('/through/bus/add', 'ThroughBusController@add');
    Route::post('/through/bus/edit', 'ThroughBusController@edit');
});
