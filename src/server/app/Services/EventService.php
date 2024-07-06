<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Repositories\EventRepository;
use App\Services\AuthService;
use App\Event;
use App\User;
use Carbon\Carbon;

class EventService implements EventRepository
{

    /**
     * get the ongoing event list
     * @param 
     * @return array
     *
     */
    public function getOngoingEvents ()
    {
        $user_events = $this->getCurrentUserEvents();
        $events = $user_events->where([
            ['start', '>=', Carbon::today()->format('Y-m-d')],
        ])->get();

        return $this->generateEvents($events);     
    }

    /**
     * get the recent event list
     * @param 
     * @return array
     *
     */
    public function getRecentEvents () 
    {
        $user_events = $this->getCurrentUserEvents();
        
        $events = $user_events->where([
            ['start', '>=', Carbon::today()->addMonths(1)->format('Y-m-d')],
            ['start', '<=', Carbon::today()->subMonths(1)->format('Y-m-d')],
        ])->get()->random(20);

        return $this->generateEvents($events);  
    }

    /**
     * get the explore event list
     * @param 
     * @return array
     *
     */
    public function getExploreEvents () 
    {
        $authService = new AuthService();
        $userId = $authService->getCurrentLoginUser()->id;
        $user_events = [];
        $users = User::where(['id', '!=', $userId])->all()->random(20);
        foreach ($users as $user){
            $events = $user->user_events();
            $user_events = array_merge($user_events, $events);
        }   
        $events = $user_events->get()->random(20);

        return $this->generateEvents($events);
    }

    /**
     * generate event list for the page
     * @param $events
     * @return array|object
     *
     */
    private function generateEvents ($events) 
    {
        return $events->map(function ($event) {
            $authors = $event->authors()->get() ?? [];
            $locations = $event->locations()->get() ?? [];
            $users = $event->users()->get() ?? [];
            $images = $event->images()->get() ?? [];
            return [
                'id' => $event->id,
                'title' => $event->title,
                'start' => $event->start,
                'end' => $event->end,
                'authors' => $authors,
                'watch' => $event->watch,
                'like' => $event->like,
                'locations' => $locations,
                'users' => $users,
                'images' => $images,
            ];
        });
    }

    /**
     * get the explore event list
     * @param $eventId event id
     * @return array|object
     *
     */
    public function getEventDetail ($eventId)
    {
        $event = Event::find($eventId)->first();

        $authors = $event->authors()->get() ?? [];
        $locations = $event->locations()->get() ?? [];
        $users = $event->users()->get() ?? [];
        $images = $event->images()->get() ?? [];
        $event_detail = [
            'id' => $event->id,
            'title' => $event->title,
            'start' => $event->start,
            'end' => $event->end,
            'authors' => $authors,
            'watch' => $event->watch,
            'like' => $event->like,
            'locations' => $locations,
            'users' => $users,
            'images' => $images,
        ];
        return [
            'event' => $event_detail,
            'calendar_events' => $this->generateCalendarEvent($event),
        ];
    }

    /**
     * generate event detail for the page
     * @param $events
     * @return array|object
     *
     */
    private function generateCalendarEvent ($event)
    {
        $calendarEvents = $event->calendarEvents()->get() ?? [];

        return $calendarEvents->map(function ($calendarEvent) {
            $authors = $calendarEvent->authors()->get() ?? [];
            $users = $calendarEvent->users()->get() ?? [];
            $images = $calendarEvent->images()->get() ?? [];
            return [
                'id' => $calendarEvent->id,
                'title' => $calendarEvent->title,
                'marker_id' => $calendarEvent->marker_id, 
                'time_zone_name' => $calendarEvent->time_zone_name,
                'start' => $calendarEvent->start,
                'end' => $calendarEvent->end,
                'is_all_day' => $calendarEvent->is_all_day,
                'watch' => $calendarEvent->watch,
                'like' => $calendarEvent->like,
                'event_type_id' => $calendarEvent->event_type_id,
                'location_id' => $calendarEvent->location_id,
                'location_from_id' => $calendarEvent->location_from_id,
                'location_to_id' => $calendarEvent->location_to_id,
                'event_id' => $calendarEvent->event_id,
                'description' => $calendarEvent->description,
                'users' => $users,
                'images' => $images,
                'authors' => $authors,
            ]; 
        });  
    }

    /**
     * get current user events
     * @return array|object
     *
     */
    private function getCurrentUserEvents ()
    {
        $authService = new AuthService();
        return $authService->getCurrentLoginUser()->user_events();
    }
}