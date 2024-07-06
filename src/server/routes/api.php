<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\MarkerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('currentUser', 'AuthController@currentUser');
Route::get('currentUser', 'AuthController@currentUser');

Route::get('events', 'EventController@index');
Route::get('event/{id}', 'EventController@detail');
Route::get('languages', 'LanguageController@index');
Route::get('markers', 'MarkerController@index');
