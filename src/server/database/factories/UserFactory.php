<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

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

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'language_id' => rand(1,20),
        'icon_url' => $faker->imageUrl,
        'time_zone_name' => $faker->randomElement(['Asia/Dubai', 'Asia/Baku', 'Asia/Colombo', 'Asia/Tokyo', 'Pacific/Auckland', 'Pacific/Apia']),
        'email_verified_at' => now(),
        'remember_token' => Str::random(10),
        'deleted_at' => null,
    ];
});
