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

    Route::post('/charter/bus/add', 'CharterBusController@add');
});

Route::group([
    'middleware' => ['admin'],
    'namespace' => 'Admin',
    'prefix' => 'admin/api'
], function () {
    Route::get('/auth/me', 'AuthController@me');
    Route::post('/auth/logout', 'AuthController@logout');

    Route::get('/user/list', 'UserController@list');
    Route::post('/user/add', 'UserController@add');
    Route::post('/user/reset/password', 'UserController@resetPassword');

    Route::get('/member/list', 'MemberController@list');
    Route::post('/member/set/manager', 'MemberController@setManager');

    Route::get('/order/list', 'OrderController@list');

    Route::get('/through/bus/list', 'ThroughBusController@list');
    Route::get('/through/bus/view', 'ThroughBusController@view');
    Route::post('/through/bus/add', 'ThroughBusController@add');
    Route::post('/through/bus/edit', 'ThroughBusController@edit');

    Route::get('/charter/bus/list', 'CharterBusController@list');
    Route::post('/charter/bus/offer', 'CharterBusController@offer');

    Route::post('/raise/address/add', 'RaiseAddressController@add');
    Route::get('/raise/address/list', 'RaiseAddressController@list');
});
