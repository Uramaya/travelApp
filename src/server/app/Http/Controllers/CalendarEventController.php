<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\EventService;
use App\Services\CalendarEventService;
use App\Exceptions\ResponseException;
use Exception;

class CalendarEventController extends Controller
{
    /**
     * Store a newly created event.
     *
     * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
     */
    public function store (Request $request) 
    {
        try {
            $calendarEventService = new CalendarEventService();
            $eventService = new EventService();
            $result = $calendarEventService->saveCalendarEvent($request);
            if($result->status !== 200) {
                abort($result->status, $result->message);
            }
            
            $eventId = $request->event_id;
            $event = $eventService->getEventDetail($eventId);

            if($result->status !== 200) {
                abort($result->status, $result->message);
            }
            return response()->json($event, 201);
        } catch (Exception $e) {
            abort($e->getStatusCode(), $e->getMessage());
        }
    }

    /**
     * update the event.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update (Request $request) 
    {
        $eventService = new EventService();
        $eventService->saveCalendarEvent($request);
        $eventId = $request->event_id;
        $event = $eventService->getEventDetail($eventId);
        return response()->json($event, 201);
    }

    /**
     * delete the event.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy (Request $request) 
    {
        $eventService = new EventService();
        $eventService->deleteCalendarEvent($eventId);
        return response()->json($event, 201);
    }


    public function test () 
    {
        try {
            $request =  json_decode('{
                "id": 37,
                "title": "7RLSsdeFGjqTZhjrcJYs",
                "marker": [],
                "time_zone_name": "Asia/Tokyo",
                "start": "2024-07-18T00:00:00.000Z",
                "end": "2024-07-19T00:00:00.000Z",
                "is_all_day": 0,
                "watch": 25,
                "like": 190,
                "event_type": {
                    "id": 18,
                    "title": "Ferry",
                    "icon": "ferry",
                    "type": "commute",
                    "color": "#F88029",
                    "background_color": "#FFEED5",
                    "event_type_id": 6,
                    "created_at": "2024-07-28 03:10:11",
                    "updated_at": "2024-07-28 03:10:11"
                },
                "location": {
                    "id": 4,
                    "google_map_url": "http://torphy.com/ut-ex-sit-id-aspernatur",
                    "google_map_json": [
                        {
                            "long_name": 48,
                            "short_name": 48,
                            "types": [
                                "street_number"
                            ]
                        },
                        {
                            "long_name": "Pirrama Road",
                            "short_name": "Pirrama Rd",
                            "types": [
                                "route"
                            ]
                        },
                        {
                            "long_name": "Pyrmont",
                            "short_name": "Pyrmont",
                            "types": [
                                "locality",
                                "political"
                            ]
                        },
                        {
                            "long_name": "City of Sydney",
                            "short_name": "City of Sydney",
                            "types": [
                                "administrative_area_level_2",
                                "political"
                            ]
                        },
                        {
                            "long_name": "New South Wales",
                            "short_name": "NSW",
                            "types": [
                                "administrative_area_level_1",
                                "political"
                            ]
                        },
                        {
                            "long_name": "Japan",
                            "short_name": "JP",
                            "types": [
                                "country",
                                "political"
                            ]
                        },
                        {
                            "long_name": 2009,
                            "short_name": 2009,
                            "types": [
                                "postal_code"
                            ]
                        }
                    ]
                },
                "location_from": {
                    "id": 6,
                    "google_map_url": "http://www.moore.com/illum-et-id-quo-nam-minus.html",
                    "google_map_json": [
                        {
                            "long_name": 48,
                            "short_name": 48,
                            "types": [
                                "street_number"
                            ]
                        },
                        {
                            "long_name": "Pirrama Road",
                            "short_name": "Pirrama Rd",
                            "types": [
                                "route"
                            ]
                        },
                        {
                            "long_name": "Pyrmont",
                            "short_name": "Pyrmont",
                            "types": [
                                "locality",
                                "political"
                            ]
                        },
                        {
                            "long_name": "City of Sydney",
                            "short_name": "City of Sydney",
                            "types": [
                                "administrative_area_level_2",
                                "political"
                            ]
                        },
                        {
                            "long_name": "New South Wales",
                            "short_name": "NSW",
                            "types": [
                                "administrative_area_level_1",
                                "political"
                            ]
                        },
                        {
                            "long_name": "Japan",
                            "short_name": "JP",
                            "types": [
                                "country",
                                "political"
                            ]
                        },
                        {
                            "long_name": 2009,
                            "short_name": 2009,
                            "types": [
                                "postal_code"
                            ]
                        }
                    ]
                },
                "location_to": {
                    "id": 7,
                    "google_map_url": "http://www.gleichner.com/",
                    "google_map_json": [
                        {
                            "long_name": 48,
                            "short_name": 48,
                            "types": [
                                "street_number"
                            ]
                        },
                        {
                            "long_name": "Pirrama Road",
                            "short_name": "Pirrama Rd",
                            "types": [
                                "route"
                            ]
                        },
                        {
                            "long_name": "Pyrmont",
                            "short_name": "Pyrmont",
                            "types": [
                                "locality",
                                "political"
                            ]
                        },
                        {
                            "long_name": "City of Sydney",
                            "short_name": "City of Sydney",
                            "types": [
                                "administrative_area_level_2",
                                "political"
                            ]
                        },
                        {
                            "long_name": "New South Wales",
                            "short_name": "NSW",
                            "types": [
                                "administrative_area_level_1",
                                "political"
                            ]
                        },
                        {
                            "long_name": "Japan",
                            "short_name": "JP",
                            "types": [
                                "country",
                                "political"
                            ]
                        },
                        {
                            "long_name": 2009,
                            "short_name": 2009,
                            "types": [
                                "postal_code"
                            ]
                        }
                    ]
                },
                "description": "<p>dCIj2LjjddUYdfFOSeapcBUU11pESZGmF3dWoJ69mUfQVdOIeAOxVJLyVc3RpTjVyy4rmhPx84kv5k7Qp9MY7P3YTrNIAcEUcHHREMtZkjvGGiAm1K7sXlrUtAjwFvztFDWyiiXp5Tm2F9J8X2HOP8WApD0bcdA11aMRbs9N4uLPChFGUfLq3Xon0HXIdb4r5SMypUQP</p>",
                "users": [
                    {
                        "id": 1,
                        "name": "Vince Brown",
                        "email": "tbaumbach@example.net",
                        "language_id": 6,
                        "icon_url": "https://via.placeholder.com/640x480.png/006677?text=dolores",
                        "time_zone_name": "Pacific/Auckland",
                        "email_verified_at": "2024-07-28 03:10:10",
                        "created_at": "2024-07-28 03:10:10",
                        "updated_at": "2024-07-28 03:10:10",
                        "deleted_at": null,
                        "pivot": {
                            "calendar_event_id": 37,
                            "user_id": 1,
                            "created_at": "2024-07-28 03:10:13",
                            "updated_at": "2024-07-28 03:10:13"
                        }
                    },
                    {
                        "id": 25,
                        "name": "Freeda King",
                        "email": "nelson.reynolds@example.com",
                        "language_id": 3,
                        "icon_url": "https://via.placeholder.com/640x480.png/00dd22?text=non",
                        "time_zone_name": "Pacific/Apia",
                        "email_verified_at": "2024-07-28 03:10:10",
                        "created_at": "2024-07-28 03:10:10",
                        "updated_at": "2024-07-28 03:10:10",
                        "deleted_at": null,
                        "pivot": {
                            "calendar_event_id": 37,
                            "user_id": 25,
                            "created_at": "2024-07-28 03:10:13",
                            "updated_at": "2024-07-28 03:10:13"
                        }
                    }
                ],
                "images": [
                    {
                        "id": 3,
                        "image_url": "https://via.placeholder.com/640x480.png/00dd44?text=incidunt",
                        "image_key": "7imAn2SoyDvuWJdNmzUl",
                        "created_at": "2024-07-28 03:10:10",
                        "updated_at": "2024-07-28 03:10:10",
                        "pivot": {
                            "calendar_event_id": 37,
                            "image_id": 3,
                            "created_at": "2024-07-28 03:10:13",
                            "updated_at": "2024-07-28 03:10:13"
                        }
                    }
                ],
                "authors": [
                    {
                        "id": 6,
                        "name": "Golden Konopelski",
                        "email": "dframi@example.net",
                        "language_id": 15,
                        "icon_url": "https://via.placeholder.com/640x480.png/00ee00?text=quia",
                        "time_zone_name": "Asia/Tokyo",
                        "email_verified_at": "2024-07-28 03:10:10",
                        "created_at": "2024-07-28 03:10:10",
                        "updated_at": "2024-07-28 03:10:10",
                        "deleted_at": null,
                        "pivot": {
                            "calendar_event_id": 37,
                            "author_id": 6,
                            "created_at": "2024-07-28 03:10:13",
                            "updated_at": "2024-07-28 03:10:13"
                        }
                    },
                    {
                        "id": 10,
                        "name": "Jordi Osinski",
                        "email": "emohr@example.com",
                        "language_id": 16,
                        "icon_url": "https://via.placeholder.com/640x480.png/0099ff?text=fugit",
                        "time_zone_name": "Pacific/Auckland",
                        "email_verified_at": "2024-07-28 03:10:10",
                        "created_at": "2024-07-28 03:10:10",
                        "updated_at": "2024-07-28 03:10:10",
                        "deleted_at": null,
                        "pivot": {
                            "calendar_event_id": 37,
                            "author_id": 10,
                            "created_at": "2024-07-28 03:10:13",
                            "updated_at": "2024-07-28 03:10:13"
                        }
                    },
                    {
                        "id": 11,
                        "name": "Dr. Art Friesen III",
                        "email": "jaida.schumm@example.net",
                        "language_id": 13,
                        "icon_url": "https://via.placeholder.com/640x480.png/00dd22?text=rerum",
                        "time_zone_name": "Asia/Dubai",
                        "email_verified_at": "2024-07-28 03:10:10",
                        "created_at": "2024-07-28 03:10:10",
                        "updated_at": "2024-07-28 03:10:10",
                        "deleted_at": null,
                        "pivot": {
                            "calendar_event_id": 37,
                            "author_id": 11,
                            "created_at": "2024-07-28 03:10:13",
                            "updated_at": "2024-07-28 03:10:13"
                        }
                    }
                ],
                "emails": [
                    {
                        "id": 75,
                        "subject": "NinbnRSME94pNJUQxirT",
                        "from_name": "Dr. Lorenzo Koelpin",
                        "from_mail": "annabell95@smith.com",
                        "to_name": "Bella Mertz",
                        "to_mail": "romaguera.thurman@gmail.com",
                        "body": "fQH54BiNqwbPy79ilYWm9kb9rK2xw9",
                        "created_at": "2024-07-28 03:10:11",
                        "updated_at": "2024-07-28 03:10:11",
                        "pivot": {
                            "calendar_event_id": 37,
                            "email_id": 75,
                            "created_at": "2024-07-28 03:10:13",
                            "updated_at": "2024-07-28 03:10:13"
                        }
                    }
                ],
                "pdfs": [
                    {
                        "id": 4,
                        "pdf_url": "http://dare.com/ut-porro-modi-in",
                        "pdf_key": "T3yyuGjLrdaG04eDJMys",
                        "created_at": "2024-07-28 03:10:10",
                        "updated_at": "2024-07-28 03:10:10",
                        "pivot": {
                            "calendar_event_id": 37,
                            "pdf_id": 4,
                            "created_at": "2024-07-28 03:10:13",
                            "updated_at": "2024-07-28 03:10:13"
                        }
                    },
                    {
                        "id": 8,
                        "pdf_url": "https://rice.net/enim-quia-deleniti-possimus.html",
                        "pdf_key": "Jp6Fby8ajPiGgqw8CXCR",
                        "created_at": "2024-07-28 03:10:10",
                        "updated_at": "2024-07-28 03:10:10",
                        "pivot": {
                            "calendar_event_id": 37,
                            "pdf_id": 8,
                            "created_at": "2024-07-28 03:10:13",
                            "updated_at": "2024-07-28 03:10:13"
                        }
                    }
                ],
                "index": 1,
                "event_id": 1
            }');
            $calendarEventService = new CalendarEventService();
            $eventService = new EventService();
            $result = $calendarEventService->saveCalendarEvent($request);
            if($result->status !== 200) {
                abort($result->status, $result->message);
            }
            
            $eventId = $request->event_id;
            $event = $eventService->getEventDetail($eventId);

            if($result->status !== 200) {
                abort($result->status, $result->message);
            }
            return response()->json($event, 201);
        } catch (Exception $e) {
            abort($e->getStatusCode(), $e->getMessage());
        }
    }
}
