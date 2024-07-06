<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Repositories\MarkerRepository;
use App\Services\AuthService;
use App\Marker;

class MarkerService implements MarkerRepository
{

    /**
     * get marker list
     * @param 
     * @return Collection
     *
     */
    public function getMarkers () 
    {
        return Marker::all();  
    }
}