<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Repositories\EventTypeRepository;
use App\EventType;

class EventTypeService implements EventTypeRepository
{

    /**
     * get event type list
     * @param 
     * @return array
     *
     */
    public function getEventTypes () 
    {
        $mainTypes = EventType::whereNull('event_type_id')->get();
        return $mainTypes->map(function ($mainType) {
            $mainTypeId = $mainType['id'];
            $childTypes = EventType::where('event_type_id', '=', $mainTypeId)->get();
            return [
                'id' => $mainTypeId,
                'title' => $mainType['title'],
                'icon' => $mainType['icon'],
                'type' => $mainType['type'],
                'color' => $mainType['color'],
                'background_color' => $mainType['background_color'],
                'childMenus' => $childTypes,
            ];
        });
    }
}