<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\CalendarEvent;
use Faker\Generator as Faker;
use Illuminate\Support\Str;
use Carbon\Carbon;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(CalendarEvent::class, function (Faker $faker) {
    return [
        'title' => Str::random(20),
        'index' => rand(1,20),
        'time_zone_name' => $faker->randomElement(['Asia/Dubai', 'Asia/Baku', 'Asia/Colombo', 'Asia/Tokyo', 'Pacific/Auckland', 'Pacific/Apia']),
        'start' => Carbon::today()->subDays(rand(-100, 180))->setTimezone('utc'),
        'end' => Carbon::today()->subDays(rand(0, 180))->setTimezone('utc')->addHours(1),
        'is_all_day' => false,
        'watch' => rand(1,400),
        'like' => rand(1,400),
        'event_type_id' => rand(1,40),
        'location_id' => rand(1,10),
        'location_from_id' => rand(1,10),
        'location_to_id' => rand(1,10),
        'description' => Str::random(200),
        'event_id' => rand(1,40),
    ];
});
