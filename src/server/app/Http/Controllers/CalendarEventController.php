<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\EventService;
use App\Exceptions\ResponseException;

class EventController extends Controller
{
    /**
     * Store a newly created event.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store (Request $request) 
    {
        // try {
            $eventService = new EventService();
            $eventService->saveCalendarEvent($request);
            return response()->json($event, 201);
        // } catch (Exception $e) {
        //     $responseException; 
        //     $e->getMessage();
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
        $eventService = new EventService();
        $eventService->saveCalendarEvent($request);
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
        $eventService = new EventService();
        $eventService->deleteCalendarEvent($eventId);
        return response()->json($event, 201);
    }
}
