<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Repositories\CalendarEventRepository;
use App\Services\AuthService;
use App\Event;
use App\CalendarEvent;
use App\Location;
use App\User;
use App\Image;
use App\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Exception;

class CalendarEventService implements CalendarEventRepository
{
    /**
     * save calendar events
     * @param Request $request
     * @return boolean
     *
     */
    private function saveCalendarEvent ($request)
    {
        try {
            $validation_calendar_event = Validator::make($request, CalendarEvent::$rules);

            if ($validation_calendar_event->fails()) {
                return (object) [
                    status => 402,
                    message => 'validation error'
                ];
            } else {
                $event = Event::find($request->event_id);
                if(isEmpty($event)) {
                    // if event doesn't exist, stop the save process
                    return (object) [
                        status => 404,
                        message => 'The event is not found'
                    ];
                }
    
                // create or update the calendar event
                $isNew = false;
                $calendar_event = CalendarEvent::find($request->id);
                if(isEmpty($calendar_event)) {
                    $calendar_event = new CalendarEvent();
                    $isNew = true;
                }
                
                $calendarEvent->title =  $request->title;
                $calendarEvent->index =  $request->index;
                $calendarEvent->time_zone_name =  $request->time_zone_name;
                $calendarEvent->start =  $request->start;
                $calendarEvent->end =  $request->end;
                $calendarEvent->is_all_day = $request->is_all_day;
                $calendarEvent->watch =  $request->watch;
                $calendarEvent->like =  $request->like;
                $calendarEvent->event_type_id =  $$request->event_type->id;
                $calendarEvent->description =  $request->description;
    
                $calendarEvent->save();
    
                // save event pivot
                $calendarEventAttachedIds = $event->calendarEvents()->pluck('id')->all() ?? [];
                if ($isNew) {
                    array_push($calendarEventAttachedIds, $calendarEvent->id);
                    $event->calendarEvents()->sync($calendarEventAttachedIds); 
                }
                $calendarEvent->save();
    
                // save location pivot
                $location = Location::find($request->location->id);
                if (isEmpty($location) || $isNew) {
                    $location = new Location;
                }
    
                $location->google_map_url = $request->location->google_map_url;
                $location->google_map_json = json_encode($request->location->google_map_json);
                $location->save();
                
                $calendarEvent->location_id = $location->id;
                $calendarEvent->save();
    
                // save location_from pivot
                $location_from = Location::find($request->location_from->id);
                if (isEmpty($location_from) || $isNew) {
                    $location_from = new Location;
                }
    
                $location_from->google_map_url = $request->location_from->google_map_url;
                $location_from->google_map_json = json_encode($request->location_from->google_map_json);
                $location_from->save();
                
                $calendarEvent->location_from_id = $location_from->id;
                $calendarEvent->save();
    
                // save location_to pivot
                $location_to = Location::find($request->location_to->id);
                if (isEmpty($location_from) || $isNew) {
                    $location_to = new Location;
                }
    
                $location_to->google_map_url = $request->location_to->google_map_url;
                $location_to->google_map_json = json_encode($request->location_to->google_map_json);
                $location_to->save();
                
                $calendarEvent->location_to_id = $location_to->id;
                $calendarEvent->save();
    
                // get current author
                $authService = new AuthService();
                $current_author_id = $authService->getCurrentLoginUser()->id;
                if(isEmpty($current_author_id)) {
                    return (object) [
                        status => 404,
                        message => 'The current user is not found'
                    ];
                }
    
                // save authors pivot
                $author_ids = [];
                if (count($request->authors)) {
                    $author_ids = array_map(function ($author)
                    {
                      return $author->id;
                    }, $request->authors);
    
                    if (!in_array($current_author_id, $author_ids)) {
                        array_push($author_ids, $current_author_id);
                    }
                    $calendarEvent->authors()->sync($author_ids);
                }else {
                    $calendarEvent->authors()->sync([$current_author_id]);
                }
    
                // save users pivot
                $user_ids = [];
                if (count($request->users)) {
                    $user_ids = array_map(function ($user)
                    {
                      return $user->id;
                    }, $request->users);
                    $calendarEvent->users()->sync($user_ids);
                } else {
                    $calendarEvent->users()->sync([]);
                }
    
                // save images pivot
                if (count($request->images)) {
                    $imageIds = $calendarEvent->images()->pluck('id')->all() ?? [];
                    foreach ($request->images as $key => $imageItem) {
                        $image = Image::find($imageItem->id);
                        if(!$image) {
                            $image = new Image;
                            $image->image_url = $imageItem->image_url;
                            $image->image_key = $imageItem->image_key;
                            $image->save();
                        }
                        array_push($imageIds, $image->id);
                    }
                    $calendarEvent->users()->sync($imageIds);
                } else {
                    $calendarEvent->users()->sync([]);
                }
    
                // emails
                if (count($request->emails)) {
                    $emailIds = $calendarEvent->emails()->pluck('id')->all() ?? [];
                    foreach ($request->emails as $key => $emailItem) {
                        $email = Email::find($emailItem->id);
                        if(!$email) {
                            $email = new Email;
                            $email->subject = $emailItem->subject;
                            $email->from_name = $emailItem->from_name;
                            $email->from_mail = $emailItem->from_mail;
                            $email->to_name = $emailItem->to_name;
                            $email->to_mail = $emailItem->to_mail;
                            $email->body = $emailItem->body;
                            $email->save();
                        }
                        
                        array_push($emailIds, $email->id);
                    }
                    $calendarEvent->emails()->sync($emailIds);
                } else {
                    $calendarEvent->emails()->sync([]);
                }
    
                // pdfs
                if (count($request->pdfs)) {
                    $pdfIds = $calendarEvent->pdfs()->pluck('id')->all() ?? [];
                    foreach ($request->pdfs as $key => $pdfItem) {
                        $pdf = Pdf::find($pdfItem->id);
                        if(!$pdf) {
                            $pdf = new Pdf;
                            $pdf->pdf_url = $pdfItem->pdf_url;
                            $pdf->pdf_key = $pdfItem->pdf_key;
                            $pdf->save();
                        }
                        
                        array_push($pdfIds, $pdf->id);
                    }
                    $calendarEvent->pdfs()->sync($pdfIds);
                } else {
                    $calendarEvent->pdfs()->sync([]);
                }
            }
    
        }catch (Exception $e) {
            return (object) [
                status => $e->getStatusCode(),
                message => $e->getMessage()
            ];
        }
    }

    /**
     * delete events
     * @param $eventId event id
     * @return boolean
     *
     */
    private function deleteCalendarEvent ($calendarEventId)
    {
        $calendarEvent = CalendarEvent::find($calendarEventId);

        if (isEmpty($calendarEvent)) {
            return false;
        } else {

            $userIds = $user->users()->pluck('id')->all();
            $calendarEvent->users()->detach($userIds);

            $authorIds = $user->authors()->pluck('id')->all();
            $calendarEvent->authors()->detach($authorIds);

            $imageIds = $event->images()->pluck('id')->all();
            $calendarEvent->images()->sync([]);
            foreach($imageIds as $imageId) {
                $image = Image::find($imageId);
                $image->delete();
            }

            $emailIds = $event->emails()->pluck('id')->all();
            $calendarEvent->emails()->sync([]);
            foreach($emailIds as $emailId) {
                $email = Email::find($emailId);
                $email->delete();
            }

            $pdfIds = $event->pdfs()->pluck('id')->all();
            $calendarEvent->pdfs()->sync([]);
            foreach($pdfIds as $pdfId) {
                $pdf = Email::find($pdfId);
                $pdf->delete();
            }

            $calendarEvent->delete();
        }
    }
}