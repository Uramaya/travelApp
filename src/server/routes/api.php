<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CalendarEventController;
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
Route::middleware('cors')->get('currentUser', 'AuthController@currentUser');
// Route::group(['middleware' => ['events']], function () {
Route::group([
    'middleware' => ['cors'],
    'prefix' => 'events'
], function () {
    Route::post('/updateTitle', 'EventController@updateTitle');
    Route::post('/', 'EventController@store');
    Route::delete('/{id}', 'EventController@destroy');
    Route::get('/userEvents', 'EventController@getUserEvents');
    Route::get('/{id}', 'EventController@show');
    Route::get('/', 'EventController@index');
});

Route::group([
    'middleware' => ['cors'],
    'prefix' => 'calendarEvents'
], function () {
    Route::delete('/{id}', 'CalendarEventController@destroy');
    Route::post('/', 'CalendarEventController@store');
});

Route::middleware('cors')->get('languages', 'LanguageController@index');
Route::middleware('cors')->get('markers', 'MarkerController@index');
Route::middleware('cors')->get('eventTypes', 'EventTypeController@index');
