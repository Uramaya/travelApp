<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Pdf;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Pdf::class, function (Faker $faker) {
    return [
        'pdf_url' => $faker->URL,
        'pdf_key' => Str::random(20),
    ];
});
