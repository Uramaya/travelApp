<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Repositories\EventRepository;
use App\Services\AuthService;
use App\Event;
use App\CalendarEvent;
use App\Location;
use App\User;
use App\Image;
use App\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

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
        
        $events = $user_events->where('start', '>=', Carbon::today()->addMonths(1)->format('Y-m-d'))
        ->orWhere('start', '<=', Carbon::today()->subMonths(1)->format('Y-m-d'))
        ->get();

        if ($events->count() > 20) {
            $events = $events->random(20);
        }
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
        $users = User::where('id', '!=', $userId)->get();
        if ($users->count() > 20) {
            $users = $users->random(20);
        }
        foreach ($users as $user){
            $user_event = $user->user_events()->get();
            if (!isset($user_event)) {
                return [];
            }
            $user_event_array = $this->generateEvents($user_event)->toArray();
            $user_events = array_merge($user_events, $user_event_array);
            if (count($user_events) > 30) {
                $user_events = array_slice($user_events , 0, 30);
            }
        }   
        return $user_events;
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
            $locations = $this->getLocations($event->locations()->get() ?? []);
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
        $locations = $this->getLocations($event->locations()->get() ?? []);

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
            $marker = $calendarEvent->marker()->get() ?? null;
            $authors = $calendarEvent->authors()->get() ?? [];
            $users = $calendarEvent->users()->get() ?? [];
            $images = $calendarEvent->images()->get() ?? [];
            $event_type = $calendarEvent->event_type()->first() ?? [];
            $location = $this->getLocation($calendarEvent->location()->get()->toArray() ?? null);
            $location_from = $this->getLocation($calendarEvent->location_from()->get()->toArray() ?? null);
            $location_to = $this->getLocation($calendarEvent->location_to()->get()->toArray() ?? null);
            $emails = $calendarEvent->emails()->get() ?? [];
            $pdfs = $calendarEvent->pdfs()->get() ?? [];
            
            return [
                'id' => $calendarEvent->id,
                'title' => $calendarEvent->title,
                'marker' => $marker, 
                'time_zone_name' => $calendarEvent->time_zone_name,
                'start' => $calendarEvent->start,
                'end' => $calendarEvent->end,
                'is_all_day' => $calendarEvent->is_all_day,
                'watch' => $calendarEvent->watch,
                'like' => $calendarEvent->like,
                'event_type' => $event_type,
                'location' => $location,
                'location_from' => $location_from,
                'location_to' => $location_to,
                'description' => $calendarEvent->description,
                'users' => $users,
                'images' => $images,
                'authors' => $authors,
                'emails' => $emails,
                'pdfs' => $pdfs,
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

    /**
     * get location object
     * @param array $locations
     * @return array
     *
     */
    private function getLocations ($locations)
    {
        if (count($locations)) {
            $locations = $locations->map(function ($location) {
                return (object)[
                    'id' => $location->id,
                    'google_map_url' => $location->google_map_url,
                    'google_map_json' => json_decode($location->google_map_json),
                ];
            });
        } else {
            return [];
        }
    }

    /**
    * get location object
    * @param array $location
    * @return object
    *
    */
   private function getLocation ($location)
   {
        if (isset($location) && count($location)) {
            return (object)[
                'id' => $location[0]["id"],
                'google_map_url' => $location[0]["google_map_url"],
                'google_map_json' => json_decode($location[0]["google_map_json"]),
            ];
       } else {
           return null;
       }
   }

    /**
     * save events
     * @param Request $request
     * @return boolean
     *
     */
    private function saveEvent ($request)
    {
        $validation_event = Validator::make($request->input('event'), Event::$rules);

        
        if ($validation_event->fails()) {
            return $validation->messages()->all();
        } else {
            $event = Event::find($request->input('event')->id);
            if(isEmpty($event)) {
                $event = new Event();
            }

            $event->title = $request->input('title');
            $event->time_zone_name = $request->input('time_zone_name');
            $event->start = $request->input('start');
            $event->end = $request->input('end');
            $event->watch = $request->input('watch');
            $event->like = $request->input('like');
            $event->description = $request->input('description');

            $event->users()->attach($request->input('user_ids'));
            $event->authors()->attach($request->input('author_ids'));

            $event->save();

            $location = new Location;
            $location->google_map_url = $request->input('google_map_url');
            $location->google_map_json = $request->input('google_map_json');
            $location->save();

            $event->location_id = $location->id;
            $event->save();

            
            $imageAttachedIds = [];
            foreach($request->input('images') as $imageItem){
                $image = new Image;
                $image->image_url = $imageItem->image_url;  
                $image->image_key = $imageItem->image_key;
                $image->save();
                array_push($imageAttachedIds, $image->id);
            }
            $event->images()->attach($imageAttachedIds); 
            $event->save();
        }
    }

    /**
     * delete events
     * @param $eventId event id
     * @return boolean
     *
     */
    private function deleteEvent ($eventId)
    {
        $event = Event::find($eventId);

        if (isEmpty($event)) {
            return false;
        } else {

            $userIds = $user->users()->pluck('id')->all();
            $event->users()->detach($userIds);

            $authorIds = $user->authors()->pluck('id')->all();
            $event->authors()->detach($authorIds);

            $imageIds = $event->images()->pluck('id')->all();
            $event->images()->sync([]);
            foreach($imageIds as $imageId) {
                $image = Image::find($imageId);
                $image->delete();
            }

            $emailIds = $event->emails()->pluck('id')->all();
            $event->emails()->sync([]);
            foreach($emailIds as $emailId) {
                $email = Email::find($emailId);
                $email->delete();
            }

            $pdfIds = $event->pdfs()->pluck('id')->all();
            $event->pdfs()->sync([]);
            foreach($pdfIds as $pdfId) {
                $pdf = Pdf::find($pdfId);
                $pdf->delete();
            }

            $locationIds = $event->locations()->pluck('id')->all();
            $event->locations()->sync([]);
            foreach($locationIds as $locationId) {
                $location = Location::find($pdfId);
                $location->delete();
            }

            $pdfIds = $event->calendarEvents()->pluck('id')->all();
            $event->calendarEvents()->sync([]);
            foreach($calendarEventIds as $calendarEventId) {
                $calendarEvent = CalendarEvent::find($calendarEventId);
                $calendarEvent->delete();
            }

            $event->delete();
        }
    }

}