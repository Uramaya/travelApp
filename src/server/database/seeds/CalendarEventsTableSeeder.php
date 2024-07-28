<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\CalendarEvent;
use App\User;
use App\Author;
use App\Image;
use App\Email;
use App\Pdf;

class CalendarEventsTableSeeder extends Seeder
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
        $emails = Email::all();
        $pdfs = Pdf::all();

        factory(App\CalendarEvent::class, 80)
            ->create()
            ->each(function(CalendarEvent $calendarEvent) use ($authors, $users, $images, $emails, $pdfs) {
                $calendarEvent->authors()->attach($authors->random(rand(1, 3))->pluck('id')->toArray()); 
                $calendarEvent->users()->attach($users->random(rand(1, 3))->pluck('id')->toArray()); 
                $calendarEvent->images()->attach($images->random(rand(1, 3))->pluck('id')->toArray());
                $calendarEvent->emails()->attach($emails->random(rand(1, 3))->pluck('id')->toArray());
                $calendarEvent->pdfs()->attach($pdfs->random(rand(1, 3))->pluck('id')->toArray());      
            });
    }
}
