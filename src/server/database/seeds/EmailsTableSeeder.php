<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Email;

class EmailsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Email::class, 80)->create();
    }
}
