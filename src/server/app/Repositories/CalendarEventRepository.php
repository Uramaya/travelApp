<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface CalendarEventRepository
{  
    /**
     * get the ongoing event list
     * @param 
     * @return array
     *
     */
    public function getOngoingEvents ();

    /**
     * get the recent event list
     * @param 
     * @return array
     *
     */
    public function getRecentEvents ();

    /**
     * get the explore event list
     * @param 
     * @return array
     *
     */
    public function getExploreEvents ();

    /**
     * get the explore event list
     * @param $eventId event id
     * @return array|object
     *
     */
    public function getEventDetail ($eventId);
}