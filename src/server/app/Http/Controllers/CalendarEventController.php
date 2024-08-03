<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\EventService;
use App\Services\CalendarEventService;
use App\Exceptions\ResponseException;
use App\Http\Requests\CalendarEventRequest;
use Exception;

class CalendarEventController extends Controller
{

    protected $calendarEventService;
    protected $eventService;

    public function __construct(
        CalendarEventService $calendarEventService,
        EventService $eventService
    )
    {
        $this->calendarEventService = $calendarEventService;
        $this->eventService = $eventService;
    }
    /**
     * Store a newly created event.
     *
     * @param  \App\Http\Requests\CalendarEventRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store (CalendarEventRequest $request) 
    {
        // try {
            $this->calendarEventService->saveCalendarEvent($request);
            $eventId = $request->event_id;
            $event = $this->eventService->getEventDetail($eventId);

            return response()->json($event, 201);
        // } catch (Exception $e) {
        //     abort(500, $e->getMessage());
        // }
    }

    /**
     * update the event.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update (Request $request) 
    {
        $this->eventService->saveCalendarEvent($request);
        $eventId = $request->event_id;
        $event = $this->eventService->getEventDetail($eventId);
        return response()->json($event, 201);
    }

    /**
     * delete the event.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy (Request $request) 
    {
        $this->eventService->deleteCalendarEvent($eventId);
        return response()->json($event, 201);
    }


    public function test (CalendarEventRequest $request) 
    {
        // $events = [
        //     // get the ongoing event list
        //     'ongoing' => $this->eventService->getOngoingEvents(),

        //     // get the recent event list
        //     'recent' => $this->eventService->getRecentEvents(),

        //     // get the explore event list
        //     'explore' => $this->eventService->getExploreEvents(),
        // ];
        // return response()->json($events, 200);
        try {
            $result = $this->calendarEventService->saveCalendarEvent($request);
        } catch (Exception $e) {
            abort(500, $e->getMessage());
        }
    }
}
