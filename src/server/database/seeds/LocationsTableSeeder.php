<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Location;

class LocationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Location::class, 30)->create();
    }
}
