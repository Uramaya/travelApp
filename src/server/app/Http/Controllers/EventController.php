<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\EventService;
use App\Exceptions\ResponseException;
use App\Http\Requests\EventRequest;
use App\Http\Requests\EventTitleRequest;
use DB;

class EventController extends Controller
{
    
    protected $eventService;

    public function __construct(
        EventService $eventService
    )
    {
        $this->eventService = $eventService;
    }
    /**
     * get the event list.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index () 
    {
        $events = $this->eventService->getEvents();
        return response()->json($events, 200);
    }

    public function getUserEvents () 
    {
        $events = $this->eventService->getCurrentUserAllEvents();
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
        $eventId = (int)$request->route('id');
        $event = $this->eventService->getEventDetail($eventId);
        return response()->json($event, 200);
    }

    /**
     * Store a newly created event.
     *
     * @param  \App\Http\Requests\EventRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store (EventRequest $request) 
    {
        DB::beginTransaction();
        try {
            $result = $this->eventService->saveEvent($request);
            DB::commit();
            return response()->json($result, 201);
        } catch (Exception $e) {
            DB::rollback();
            abort(500, $e->getMessage());
        }
    }

    /**
     * update the event.
     *
     * @param  \App\Http\Requests\EventTitleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function updateTitle (EventTitleRequest $request) 
    {
        DB::beginTransaction();
        try {
            $this->eventService->saveEventTitle($request);
            $event = $this->eventService->getEventDetail($request->id);
            if(empty($event)) {
                abort(404, 'The updated event is not found');
            }
            DB::commit();
            return response()->json($event, 201);
        } catch (Exception $e) {
            DB::rollback();
            abort(500, $e->getMessage());
        }
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
            $eventId = (int)$request->route('id');
            $this->eventService->deleteEvent($eventId);
            DB::commit();
            $events = $this->eventService->getEvents();
            return response()->json($events, 201);
        } catch (Exception $e) {
            abort(500, $e->getMessage());
        }
    }
}
