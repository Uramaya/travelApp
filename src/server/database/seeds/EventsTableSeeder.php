<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Event;
use App\User;
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
        $users = User::all();
        $images = Image::all();
        $locations = Location::all();
        
        factory(App\Event::class, 40)
            ->create()
            ->each(function(Event $event) use ($users, $images, $locations) {
                $author_id = rand(1, 30);
                $event->users()->attach([
                    $users->random()->id => ['author_id' => $author_id],
                    $users->random()->id => ['author_id' => $author_id],
                    $users->random()->id => ['author_id' => $author_id],
                    $users->random()->id => ['author_id' => $author_id],
                ]);
                $event->images()->attach($images->random(rand(1, 3))->pluck('id')->toArray()); 
                $event->locations()->attach($locations->random(rand(1, 3))->pluck('id')->toArray()); 
            });
    }
}
