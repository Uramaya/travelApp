<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface MarkerRepository
{  
    /**
     * get the marker list
     * @param 
     * @return array
     *
     */
    public function getMarkers ();
}