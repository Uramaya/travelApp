<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Marker;

class MarkersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Marker::class, 50)->create();
    }
}
