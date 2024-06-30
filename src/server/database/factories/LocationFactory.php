<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Location;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Location::class, function (Faker $faker) {
    return [
        'google_map_url' => $faker->URL,
        'google_map_json' => "[
            { 'long_name': '48', 'short_name': '48', 'types': ['street_number'] },
            {
                'long_name': 'Pirrama Road',
                'short_name': 'Pirrama Rd',
                'types': ['route'],
            },
            {
                'long_name': 'Pyrmont',
                'short_name': 'Pyrmont',
                'types': ['locality', 'political'],
            },
            {
                'long_name': 'City of Sydney',
                'short_name': 'City of Sydney',
                'types': ['administrative_area_level_2', 'political'],
            },
            {
                'long_name': 'New South Wales',
                'short_name': 'NSW',
                'types': ['administrative_area_level_1', 'political'],
            },
            {
                'long_name': 'Japan',
                'short_name': 'JP',
                'types': ['country', 'political'],
            },
            {
                'long_name': '2009',
                'short_name': '2009',
                'types': ['postal_code'],
            },
        ]",
    ];
});
