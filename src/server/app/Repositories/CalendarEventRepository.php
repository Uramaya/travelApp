<?php

namespace App\Repositories;

use App\Http\Requests\CalendarEventRequest;

interface CalendarEventRepository
{  
    /**
     * save calendar event
     * @param CalendarEventRequest $request
     * @return array
     *
     */
    public function saveCalendarEvent (CalendarEventRequest $request);

    /**
     * delete calendar event
     * @param int $eventId
     * @return array
     *
     */
    public function deleteCalendarEvent (int $eventId);

}