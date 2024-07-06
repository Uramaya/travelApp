<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\EventService;

class EventController extends Controller
{
    
    public function index () 
    {
        $eventService = new EventService();
        $events = [
            // get the ongoing event list
            'ongoing' => $eventService->getOngoingEvents(),

            // get the recent event list
            'recent' => $eventService->getOngoingEvents(),

            // get the explore event list
            'explore' => $eventService->getOngoingEvents(),
        ];
        return response()->json($events, 200);
    }

    public function detail (Request $request) 
    {
        $eventService = new EventService();
        $eventId = $request->route('id');
        $event = $eventService->getEventDetail($eventId);
        return response()->json($event, 200);
    }
}
