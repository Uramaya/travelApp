<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Location;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Location::class, function (Faker $faker) {
    return [
        'google_map_json' => '
            {
                "lat": 35.6879961,
                "lng": 139.5995882,
                "name": "Kugayama Station",
                "formatted_address": "Japan, 〒168-0082 Tokyo, Suginami City, Kugayama, 4-chōme−1, 東京都杉並区久我山４丁目１−１１"
            }',
    ];
});
