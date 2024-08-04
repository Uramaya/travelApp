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
use App\Author;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\EventRequest;
use App\Http\Requests\EventTitleRequest;

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
        $events = [];
        $user_events = $this->getCurrentUserEvents();
        $author_events = $this->getCurrentAuthorEvents();

        if (!empty($user_events)) {
            $user_events = $user_events->where([
                ['start', '>=', Carbon::today()->format('Y-m-d')],
            ])->get();
            $events = $this->generateEvents($user_events)->toArray();
        }

        if(!empty($author_events)) {
            $author_events = $author_events->where([
                ['start', '>=', Carbon::today()->format('Y-m-d')],
            ])->get();
            $author_events = $this->generateEvents($author_events)->toArray();
            $events = array_merge($events, $author_events);
        }
        return $events;
    }

    /**
     * get the recent event list
     * @param 
     * @return array
     *
     */
    public function getRecentEvents () 
    {
        $events = [];
        $user_events = $this->getCurrentUserEvents();
        $author_events = $this->getCurrentAuthorEvents();

        if (!empty($user_events)) {
            $user_events = $user_events->where('start', '>=', Carbon::today()->addMonths(1)->format('Y-m-d'))
            ->orWhere('start', '<=', Carbon::today()->subMonths(1)->format('Y-m-d'))->get();
            $events = $this->generateEvents($user_events)->toArray();
        }

        if(!empty($author_events)) {
            $author_events = $author_events->where('start', '>=', Carbon::today()->addMonths(1)->format('Y-m-d'))
            ->orWhere('start', '<=', Carbon::today()->subMonths(1)->format('Y-m-d'))->get();
            $author_events = $this->generateEvents($author_events)->toArray();
            $events = array_merge($events, $author_events);
        }
        return $events;
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
            $user_event = $user->events()->get();
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
    private function generateEvents ($events, $mergeEvents = []) 
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
        
        $event = Event::where('id', '=', (int)$eventId)->first();

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
            'description' => $event->description,
        ];
        return [
            'event' => $event_detail,
            'calendar_events' => $this->generateCalendarEvent($event->id, $event),
        ];
    }

    /**
     * generate event detail for the page
     * @param $events
     * @return array|object
     *
     */
    private function generateCalendarEvent ($eventId, $event)
    {
        $calendarEvents = $event->calendarEvents()->get() ?? [];

        return $calendarEvents->map(function ($calendarEvent) use ($eventId) {
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
            $is_all_day = (int)$calendarEvent->is_all_day;
            
            return [
                'id' => $calendarEvent->id,
                'title' => $calendarEvent->title,
                'marker' => $marker, 
                'time_zone_name' => $calendarEvent->time_zone_name,
                'start' => $calendarEvent->start,
                'end' => $calendarEvent->end,
                'is_all_day' => $is_all_day,
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
                'event_id' => $eventId,
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
        $user = $authService->getCurrentLoginUser();
        if (empty($user)) {
            abort(404, 'current user is not found');
        }
        return $authService->getCurrentLoginUser()->events();
    }

    /**
     * get current user events
     * @return array|object
     *
     */
    private function getCurrentAuthorEvents ()
    {
        $authService = new AuthService();
        $user = $authService->getCurrentLoginUser();
        if (empty($user)) {
            abort(404, 'current user is not found');
        }
        $author = Author::where('id', $user->id)->first();
        if (empty($author)) {
            return null;
        }
        return $author->events();
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
     * @param EventRequest $request
     * @return array|object
     *
     */
    public function saveEvent (EventRequest $request)
    {
        try {
            $validation_event = $request->validated();

            $isNew = false;
            if(empty($request->id)) {
                $event = new Event();
                $isNew = true;
            } else {
                $event = Event::where('id', '=', (int)$request->id)->first();
                if(empty($event)) {
                    $event = new Event();
                    $isNew = true;
                }
            }

            $event->title = $request->title;
            $event->time_zone_name = $request->time_zone_name;
            $event->start = new Carbon($request->start);
            $event->end = new Carbon($request->end);
            $event->watch = $request->watch ?? 0;
            $event->like = $request->like ?? 0;
            $event->description = $request->description;
            $event->save();
    
            // get current author
            $authService = new AuthService();
            $currentAuthorId = $authService->getCurrentLoginUser()->id;
            if(empty($currentAuthorId)) {
                abort(404, 'The current user is not found');
            }
    
            // save authors pivot
            $authorIds = [];
            if (count($request->authors)) {
                $authorIds = array_map(function ($author)
                {
                    return $author['id'];
                }, $request->authors);
    
                if (!in_array($currentAuthorId, $authorIds)) {
                    array_push($authorIds, $currentAuthorId);
                }
                $event->authors()->sync($authorIds);
            }else {
                $event->authors()->sync([$currentAuthorId]);
            }
    
            // save users pivot
            $userIds = [];
            if (count($request->users)) {
                $userIds = array_map(function ($user)
                {
                    return $user['id'];
                }, $request->users);
                $event->users()->sync($userIds);
            } else {
                $event->users()->sync([]);
            }

            // save location pivot
            if (count($request->locations)) {
                $locationIds = $event->locations()->pluck('location.id')->all() ?? [];
                foreach ($request->locations as $key => $locationItem) {
                    $location = Location::where('id', '=', (int)$locationItem['id'])->first();
                    if(!$image) {
                        $location = new Location;
                        $location->google_map_url = $locationItem['google_map_url'];
                        $location->google_map_json = $locationItem['google_map_json'];
                        $location->save();
                    }
                    if (!in_array($location->id, $locationIds)) {
                        array_push($locationIds, $location->id);
                    }
                }
                $event->locations()->sync($locationIds);
            } else {
                $event->locations()->sync([]);
            }
    
            // save images pivot
            if (count($request->images)) {
                $imageIds = $event->images()->pluck('images.id')->all() ?? [];
                foreach ($request->images as $key => $imageItem) {
                    $image = Image::where('id', '=', (int)$imageItem['id'])->first();
                    if(!$image) {
                        $image = new Image;
                        $image->image_url = $imageItem['image_url'];
                        $image->image_key = $imageItem['image_key'];
                        $image->save();
                    }
                    if (!in_array($image->id, $imageIds)) {
                        array_push($imageIds, $image->id);
                    }
                }
                $event->images()->sync($imageIds);
            } else {
                $event->images()->sync([]);
            }
            return (object)[
                'event_id' => $event->id
            ];
        } catch (Exception $e) {
            abort(500, $e->getMessage());
        }   
    }

        /**
     * save events
     * @param EventTitleRequest $request
     * @return array|object
     *
     */
    public function saveEventTitle (EventTitleRequest $request)
    {
        try {
            $validation_event = $request->validated();

            $event = Event::where('id', '=', (int)$request->id)->first();
            if(empty($event)) {
                abort(404, 'The current event is not found');
            }
    
            $event->title = $request->title;
            $event->save();
        } catch (Exception $e) {
            abort(500, $e->getMessage());
        }
    }

    /**
     * delete events
     * @param $eventId event id
     * @return void
     *
     */
    public function deleteEvent ($eventId)
    {
        $event = Event::where('id', '=', (int)$eventId)->first();

        if (empty($event)) {
            return false;
        } else {

            $userIds = $user->users()->pluck('id')->all();
            $event->users()->detach($userIds);

            $authorIds = $user->authors()->pluck('id')->all();
            $event->authors()->detach($authorIds);

            $imageIds = $event->images()->pluck('id')->all();
            $event->images()->sync([]);
            foreach($imageIds as $imageId) {
                $image = Image::where('id', '=', (int)$imageId)->first();
                $image->delete();
            }

            $emailIds = $event->emails()->pluck('id')->all();
            $event->emails()->sync([]);
            foreach($emailIds as $emailId) {
                $email = Email::where('id', '=', (int)$emailId)->first();
                $email->delete();
            }

            $pdfIds = $event->pdfs()->pluck('id')->all();
            $event->pdfs()->sync([]);
            foreach($pdfIds as $pdfId) {
                $pdf = Pdf::where('id', '=', (int)$pdfId)->first();
                $pdf->delete();
            }

            $locationIds = $event->locations()->pluck('id')->all();
            $event->locations()->sync([]);
            foreach($locationIds as $locationId) {
                $location = Location::where('id', '=', (int)$pdfId)->first();
                $location->delete();
            }

            $pdfIds = $event->calendarEvents()->pluck('id')->all();
            $event->calendarEvents()->sync([]);
            foreach($calendarEventIds as $calendarEventId) {
                $calendarEvent = CalendarEvent::where('id', '=', (int)$calendarEventId)->first();
                $calendarEvent->delete();
            }

            $event->delete();
        }
    }

}