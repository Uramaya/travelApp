<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\EventService;
use App\Exceptions\ResponseException;

class EventController extends Controller
{
    
    public function index () 
    {
        $eventService = new EventService();
        $events = [
            // get the ongoing event list
            'ongoing' => $eventService->getOngoingEvents(),

            // get the recent event list
            'recent' => $eventService->getRecentEvents(),

            // get the explore event list
            'explore' => $eventService->getExploreEvents(),
        ];
        return response()->json($events, 200);
    }

    /**
     * Display the event detail.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show (Request $request) 
    {
        $eventService = new EventService();
        $eventId = $request->route('id');
        $event = $eventService->getEventDetail($eventId);
        return response()->json($event, 200);
    }

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
            $eventService->saveEvent($request);
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
        $eventService->saveEvent($request);
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
        $eventService->deleteEvent($eventId);
        return response()->json($event, 201);
    }
}
