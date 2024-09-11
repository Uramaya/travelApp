<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\EventTypeService;

class EventTypeController extends Controller
{   
    
    protected $eventTypeService;
    
    public function __construct(
        EventTypeService $eventTypeService
    )
    {
        $this->eventTypeService = $eventTypeService;
    }
    
    public function index () 
    {
        $eventTypes =  $this->eventTypeService->getEventTypes();
        return response()->json($eventTypes, 200);
    }
}
