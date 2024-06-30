<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Image;

class ImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Image::class, 10)->create();
    }
}
