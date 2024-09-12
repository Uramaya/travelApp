<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Author;

class AuthorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Author::class, 30)->create();
    }
}
