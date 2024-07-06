<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MarkerService;

class MarkerController extends Controller
{   
    public function index () 
    {
        $markerService = new MarkerService();
        $markers =  $markerService->getMarkers();
        return response()->json($markers, 200);
    }
}
