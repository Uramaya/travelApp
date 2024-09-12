<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Pdf;

class PdfsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Pdf::class, 10)->create();
    }
}
