<?php

namespace App\Repositories;

use App\Http\Requests\EventRequest;
use App\Http\Requests\EventTitleRequest;

interface EventRepository
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

    /**
     * save event
     * @param EventRequest $request
     * @return array|object
     *
     */
    public function saveEvent (EventRequest $request);

    /**
     * save event
     * @param EventTitleRequest $request
     * @return array|object
     *
     */
    public function saveEventTitle (EventTitleRequest $request);

    /**
     * save event
     * @param int $eventId
     * @return array|object
     *
     */
    public function deleteEvent (int $eventId);
}