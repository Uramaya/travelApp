<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface EventTypeRepository
{  
    /**
     * get the event type list
     * @param 
     * @return array
     *
     */
    public function getEventTypes ();
}