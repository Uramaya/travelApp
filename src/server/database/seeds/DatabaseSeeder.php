<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(LanguagesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(LocationsTableSeeder::class);
        $this->call(MarkersTableSeeder::class);
        $this->call(ImagesTableSeeder::class);
        $this->call(PdfsTableSeeder::class);
        $this->call(EmailsTableSeeder::class);
        $this->call(EventTypesTableSeeder::class);
        $this->call(EventsTableSeeder::class);
        $this->call(CalendarEventsTableSeeder::class);
    }
}
