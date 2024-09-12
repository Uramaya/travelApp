<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\EventType;

class EventTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Group stay
        EventType::create([
            'title' => 'Stay',
            'icon'  => 'bed',
            'type'  => 'main',
            'color'  => '#2D2D2D',
            'background_color'  => '',
            'event_type_id'  => null,
        ]);
        EventType::create([
            'title' => 'Stay',
            'icon'  => 'hotel',
            'type'  => 'stay',
            'color'  => '#39635E',
            'background_color'  => '#E9F5F5',
            'event_type_id'  => 1,
        ]);
        EventType::create([
            'title' => 'Guest House',
            'icon'  => 'shop',
            'type'  => 'stay',
            'color'  => '#39635E',
            'background_color'  => '#E9F5F5',
            'event_type_id'  => 1,
        ]);
        EventType::create([
            'title' => 'Airbnb',
            'icon'  => "fa-brands fa-airbnb",
            'type'  => 'stay',
            'color'  => '#39635E',
            'background_color'  => '#E9F5F5',
            'event_type_id'  => 1,
        ]);
        EventType::create([
            'title' => 'Hostel',
            'icon'  => 'bed',
            'type'  => 'stay',
            'color'  => '#39635E',
            'background_color'  => '#E9F5F5',
            'event_type_id'  => 1,
        ]);

        // Group commute
        EventType::create([
            'title' => 'Commute',
            'icon'  => 'plane',
            'type'  => 'main',
            'color'  => '#2D2D2D',
            'background_color'  => '',
            'event_type_id'  => null,
        ]);
        EventType::create([
            'title' => 'Flight',
            'icon'  => 'plane',
            'type'  => 'commute',
            'color'  => '#F88029',
            'background_color'  => '#FFEED5',
            'event_type_id'  => 6,
        ]);
        EventType::create([
            'title' => 'Train',
            'icon'  => 'train',
            'type'  => 'commute',
            'color'  => '#F88029',
            'background_color'  => '#FFEED5',
            'event_type_id'  => 6,
        ]);
        EventType::create([
            'title' => 'MRT',
            'icon'  => 'train-subway',
            'type'  => 'commute',
            'color'  => '#F88029',
            'background_color'  => '#FFEED5',
            'event_type_id'  => 6,
        
        ]);
        EventType::create([
            'title' => 'Bus',
            'icon'  => 'bus',
            'type'  => 'commute',
            'color'  => '#F88029',
            'background_color'  => '#FFEED5',
            'event_type_id'  => 6,
        ]);
        EventType::create([
            'title' => 'Bike',
            'icon'  => 'motorcycle',
            'type'  => 'commute',
            'color'  => '#F88029',
            'background_color'  => '#FFEED5',
            'event_type_id'  => 6,
        ]);
        EventType::create([
            'title' => 'Bicycle',
            'icon'  => 'bicycle',
            'type'  => 'commute',
            'color'  => '#F88029',
            'background_color'  => '#FFEED5',
            'event_type_id'  => 6,
        ]);
        EventType::create([
            'title' => 'Car',
            'icon'  => 'car-side',
            'type'  => 'commute',
            'color'  => '#F88029',
            'background_color'  => '#FFEED5',
            'event_type_id'  => 6,
        ]);
        EventType::create([
            'title' => 'Rental Car',
            'icon'  => 'car',
            'type'  => 'commute',
            'color'  => '#F88029',
            'background_color'  => '#FFEED5',
            'event_type_id'  => 6,
        ]);
        EventType::create([
            'title' => 'Walk',
            'icon'  => 'person-walking',
            'type'  => 'commute',
            'color'  => '#F88029',
            'background_color'  => '#FFEED5',
            'event_type_id'  => 6,
        ]);
        EventType::create([
            'title' => 'Taxi',
            'icon'  => 'taxi',
            'type'  => 'commute',
            'color'  => '#F88029',
            'background_color'  => '#FFEED5',
            'event_type_id'  => 6,
        ]);
        EventType::create([
            'title' => 'Boat',
            'icon'  => 'ship',
            'type'  => 'commute',
            'color'  => '#F88029',
            'background_color'  => '#FFEED5',
            'event_type_id'  => 6,
        ]);
        EventType::create([
            'title' => 'Ferry',
            'icon'  => 'ferry',
            'type'  => 'commute',
            'color'  => '#F88029',
            'background_color'  => '#FFEED5',
            'event_type_id'  => 6,
        ]);

        // Group activity
        EventType::create([
            'title' => 'Activity',
            'icon'  => 'archway',
            'type'  => 'main',
            'color'  => '#2D2D2D',
            'background_color'  => '',
            'event_type_id'  => null,
        ]);
        EventType::create([
            'title' => 'Tourist Attraction',
            'icon'  => 'archway',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Airport',
            'icon'  => 'plane-departure',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Shopping',
            'icon'  => 'cart-shopping',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Outdoor Activity',
            'icon'  => 'tree',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Mountain Climbing',
            'icon'  => 'mountain',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Beach',
            'icon'  => 'umbrella-beach',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Photo',
            'icon'  => 'camera-retro',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Work',
            'icon'  => 'briefcase',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Rest',
            'icon'  => 'heart',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Rest Room',
            'icon'  => 'restroom',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Swimming',
            'icon'  => 'person-swimming',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Sports',
            'icon'  => 'futbol',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Skiing',
            'icon'  => 'person-skiing',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Concert',
            'icon'  => 'fa-music',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Net Surfing',
            'icon'  => 'laptop',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Study',
            'icon'  => 'book-open-reader',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Smoking',
            'icon'  => 'smoking',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);
        EventType::create([
            'title' => 'Pray',
            'icon'  => 'person-praying',
            'type'  => 'activity',
            'color'  => '#D84949',
            'background_color'  => '#FFEBE8',
            'event_type_id'  => 19,
        ]);

        // Group utensils
        EventType::create([
            'title' => 'Eat',
            'icon'  => 'utensils',
            'type'  => 'main',
            'color'  => '#2D2D2D',
            'background_color'  => '',
            'event_type_id'  => null,
        ]);
        EventType::create([
            'title' => 'Cafe',
            'icon'  => 'mug-saucer',
            'type'  => 'eat',
            'color'  => '#7C3823',
            'background_color'  => '#EEDECB',
            'event_type_id'  => 38,
        ]);
        EventType::create([
            'title' => 'Restaurant',
            'icon'  => 'utensils',
            'type'  => 'eat',
            'color'  => '#7C3823',
            'background_color'  => '#EEDECB',
            'event_type_id'  => 38,
        ]);
        EventType::create([
            'title' => 'Bar',
            'icon'  => 'martini-glass-citrus',
            'type'  => 'eat',
            'color'  => '#7C3823',
            'background_color'  => '#EEDECB',
            'event_type_id'  => 38,
        ]);
        EventType::create([
            'title' => 'Food Stand',
            'icon'  => 'store',
            'type'  => 'eat',
            'color'  => '#7C3823',
            'background_color'  => '#EEDECB',
            'event_type_id'  => 38,
        ]);

        // Group other
        EventType::create([
            'title' => 'Other',
            'icon'  => 'angles-right',
            'type'  => 'main',
            'color'  => '#2D2D2D',
            'background_color'  => '#EEDECB',
        ]);
    }
}
