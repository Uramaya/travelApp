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
// Route::group(['middleware' => ['events']], function () {
Route::group(['prefix' => 'events'], function () {
    Route::get('/', 'EventController@index');
    Route::get('/{id}', 'EventController@show');
    Route::post('/', 'EventController@store');
    Route::patch('/{id}', 'EventController@update');
    Route::delete('/{id}', 'EventController@destroy');
});

Route::group(['prefix' => 'calendarEvents'], function () {
    Route::post('/', 'CalendarEventController@store');
    Route::patch('/{id}', 'CalendarEventController@update');
    Route::delete('/{id}', 'CalendarEventController@destroy');
});

Route::get('languages', 'LanguageController@index');
Route::get('markers', 'MarkerController@index');
