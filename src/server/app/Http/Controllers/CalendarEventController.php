<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\EventService;
use App\Services\CalendarEventService;
use App\Exceptions\ResponseException;
use App\Http\Requests\CalendarEventRequest;
use DB;
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
        DB::beginTransaction();
        try {
            $this->calendarEventService->saveCalendarEvent($request);
            $eventId = $request->event_id;
            $event = $this->eventService->getEventDetail($eventId);
            DB::commit();
            return response()->json($event, 201);
        } catch (Exception $e) {
            DB::rollback();
            abort(500, $e->getMessage());
        }
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
        DB::beginTransaction();
        try {
            $calendarEventId = (int)$request->route('id');
            $eventId = $this->calendarEventService->deleteCalendarEvent($calendarEventId);
            $event = $this->eventService->getEventDetail($eventId);
            return response()->json($event, 201);
        } catch (Exception $e) {
            DB::rollback();
            abort(500, $e->getMessage());
        }
    }
}
