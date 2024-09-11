<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MarkerService;

class MarkerController extends Controller
{   
    protected $markerService;

    public function __construct(
        MarkerService $markerService
    )
    {
        $this->markerService = $markerService;
    }
    
    public function index () 
    {
        $markers =  $this->markerService->getMarkers();
        return response()->json($markers, 200);
    }
}
