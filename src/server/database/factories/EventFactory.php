<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Event;
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

$factory->define(Event::class, function (Faker $faker) {
    return [
        'title' => Str::random(20),
        'time_zone_name' => $faker->randomElement(['Asia/Dubai', 'Asia/Baku', 'Asia/Colombo', 'Asia/Tokyo', 'Pacific/Auckland', 'Pacific/Apia']),
        'start' => Carbon::today()->subDays(rand(-100, 180))->setTimezone('utc'),
        'end' => Carbon::today()->subDays(rand(0, 180))->setTimezone('utc')->addHours(1),
        'watch' => rand(1,400),
        'like' => rand(1,400),
        'description' => Str::random(200),
    ];
});
