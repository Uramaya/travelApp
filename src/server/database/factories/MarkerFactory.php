<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Marker;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Marker::class, function (Faker $faker) {
    return [
        'color' => '#ffffff',
        'background_color' => $faker->hexColor,
    ];
});
