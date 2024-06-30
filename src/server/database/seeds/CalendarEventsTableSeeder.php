<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\CalendarEvent;
use App\User;
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
        $users = User::all();
        $images = Image::all();
        $emails = Email::all();
        $pdfs = Pdf::all();

        factory(App\CalendarEvent::class, 80)
            ->create()
            ->each(function(CalendarEvent $calendarEvent) use ($users, $images, $emails, $pdfs) {
                $author_id = rand(1, 30);
                $calendarEvent->users()->attach([
                    $users->random()->id => ['author_id' => $author_id],
                    $users->random()->id => ['author_id' => $author_id],
                    $users->random()->id => ['author_id' => $author_id],
                    $users->random()->id => ['author_id' => $author_id],
                ]);
                $calendarEvent->images()->attach($images->random(rand(1, 3))->pluck('id')->toArray());
                $calendarEvent->emails()->attach($emails->random(rand(1, 3))->pluck('id')->toArray());
                $calendarEvent->pdfs()->attach($pdfs->random(rand(1, 3))->pluck('id')->toArray());      
            });
    }
}
