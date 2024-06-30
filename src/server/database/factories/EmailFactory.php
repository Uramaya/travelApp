<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Email;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Email::class, function (Faker $faker) {
    return [
        'subject' => Str::random(20),
        'from_name' => $faker->name,
        'from_mail' => $faker->email,
        'to_name' => $faker->name,
        'to_mail' => $faker->email,
        'body' => Str::random(30),
    ];
});
