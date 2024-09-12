<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Event;
use App\User;
use App\Author;
use App\Image;
use App\Location;


class EventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $authors = Author::all();
        $users = User::all();
        $images = Image::all();
        $locations = Location::all();
        
        factory(App\Event::class, 40)
            ->create()
            ->each(function(Event $event) use ($authors, $users, $images, $locations) {
                $event->authors()->attach($authors->random(rand(1, 3))->pluck('id')->toArray()); 
                $event->users()->attach($users->random(rand(1, 3))->pluck('id')->toArray()); 
                $event->images()->attach($images->random(rand(1, 3))->pluck('id')->toArray()); 
                $event->locations()->attach($locations->random(rand(1, 3))->pluck('id')->toArray()); 
            });
    }
}
