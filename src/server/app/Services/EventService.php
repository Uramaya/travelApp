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
            if (count($locations)) {
                $locations = $locations->map(function ($location) {
                    $str = str_replace("'", '"', $location->google_map_json);
                    return (object)[
                        'id' => $location->id,
                        'google_map_url' => $location->google_map_url,
                        'google_map_json' => json_decode($location->google_map_json),
                    ];
                });
            }
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
                $image->image_url =  $imageItem->image_url;  
                $image->image_key =  $imageItem->image_key;
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

    /**
     * save calendar events
     * @param Request $request
     * @return boolean
     *
     */
    private function saveCalendarEvent ($request)
    {
        $validation_calendar_event = Validator::make($request->input('calendar_event'), CalendarEvent::$rules);

        
        if ($validation_calendar_event->fails()) {
            return $validation->messages()->all();
        } else {
            $event = Event::find($request->input('calendar_event')->event_id);
            if(isEmpty($event)) {
                // if event doesn't exist, stop the save process
                return false;
            }

            $calendar_event = CalendarEvent::find($request->input('calendar_event')->id);
            if(isEmpty($calendar_event)) {
                $calendar_event = new CalendarEvent();
            }

            $calendarEventAttachedIds = [];
            foreach($request->input('calendar_event') as $calendarEventItem){

                $calendarEvent = CalendarEvent::find($calendarEventItem->id);
                if (!$calendarEvent) {
                    $calendarEvent = new CalendarEvent;
                }
                
                $calendarEvent->title =  $calendarEventItem->title;
                $calendarEvent->index =  $calendarEventItem->index;
                $calendarEvent->time_zone_name =  $calendarEventItem->time_zone_name;
                $calendarEvent->start =  $calendarEventItem->start;
                $calendarEvent->end =  $calendarEventItem->end;
                $calendarEvent->is_all_day =  $calendarEventItem->is_all_day;
                $calendarEvent->watch =  $calendarEventItem->watch;
                $calendarEvent->like =  $calendarEventItem->like;
                $calendarEvent->event_type_id =  $calendarEventItem->event_type_id;
                $calendarEvent->location_id =  $calendarEventItem->location_id;
                $calendarEvent->location_from_id =  $calendarEventItem->location_from_id;
                $calendarEvent->location_to_id =  $calendarEventItem->location_to_id;
                $calendarEvent->event_id =  $calendarEventItem->event_id;
                $calendarEvent->description =  $calendarEventItem->description;

                $calendarEvent->save();
                array_push($calendarEventAttachedIds, $calendarEvent->id);
            }
            $event->calendarEvents()->attach($calendarEventAttachedIds); 
            $event->save();
        }
    }

    /**
     * delete events
     * @param $eventId event id
     * @return boolean
     *
     */
    private function deleteCalendarEvent ($calendarEventId)
    {
        $calendarEvent = CalendarEvent::find($calendarEventId);

        if (isEmpty($calendarEvent)) {
            return false;
        } else {

            $userIds = $user->users()->pluck('id')->all();
            $calendarEvent->users()->detach($userIds);

            $authorIds = $user->authors()->pluck('id')->all();
            $calendarEvent->authors()->detach($authorIds);

            $imageIds = $event->images()->pluck('id')->all();
            $calendarEvent->images()->sync([]);
            foreach($imageIds as $imageId) {
                $image = Image::find($imageId);
                $image->delete();
            }

            $emailIds = $event->emails()->pluck('id')->all();
            $calendarEvent->emails()->sync([]);
            foreach($emailIds as $emailId) {
                $email = Email::find($emailId);
                $email->delete();
            }

            $pdfIds = $event->pdfs()->pluck('id')->all();
            $calendarEvent->pdfs()->sync([]);
            foreach($pdfIds as $pdfId) {
                $pdf = Email::find($pdfId);
                $pdf->delete();
            }

            $calendarEvent->delete();
        }
    }
}