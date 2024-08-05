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
use App\Email;
use App\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\CalendarEventRequest;
use Exception;

class CalendarEventService implements CalendarEventRepository
{
    /**
     * save calendar events
     * @param \App\Http\Requests\CalendarEventRequest  $request
     * @return boolean
     *
     */
    public function saveCalendarEvent (CalendarEventRequest $request)
    {
        try {
            $validation_calendar_event = $request->validated();

            $event = Event::where('id', '=', (int)$request->event_id)->first();
            if(empty($event)) {
                // if event doesn't exist, stop the save process
                abort(404, 'The event is not found');
            }

            // create or update the calendar event
            $isNew = false;
            if(empty($request->id)) {
                $calendarEvent = new CalendarEvent();
                $isNew = true;
            } else {
                $calendarEvent = CalendarEvent::where('id', '=', (int)$request->id)->first();
                if(empty($calendarEvent)) {
                    $calendarEvent = new CalendarEvent();
                    $isNew = true;
                }
            }
            
            $calendarEvent->title =  $request->title;
            $calendarEvent->index =  $request->index;
            $calendarEvent->time_zone_name =  $request->time_zone_name;
            $calendarEvent->start =  new Carbon($request->start);
            $calendarEvent->end =  new Carbon($request->end);
            $calendarEvent->is_all_day = $request->is_all_day;
            $calendarEvent->watch =  $request->watch ?? 0;
            $calendarEvent->like =  $request->like ?? 0;
            $calendarEvent->event_type_id =  $request->event_type['id'];
            $calendarEvent->description =  $request->description;
            $calendarEvent->event_id =  $request->event_id;
            
            $calendarEvent->save();
            
            // save location pivot
            if (!empty($request->location)) {
                $location = Location::where('id', '=', (int)$request->location['id'])->first();
                if (empty($location) || $isNew) {
                    $location = new Location;
                }
    
                $location->google_map_url = $request->location['google_map_url'];
                $location->google_map_json = json_encode($request->location['google_map_json']);
                $location->save();

                $calendarEvent->location_id = $location->id;
                $calendarEvent->save();
            } else {
                $calendarEvent->location_id = null;
                $calendarEvent->save();
            }
            
            if (!empty($request->location_from)) {
                // save location_from pivot
                $locationFrom = Location::where('id', '=', (int)$request->location_from['id'])->first();
                if (empty($locationFrom) || $isNew) {
                    $locationFrom = new Location;
                }

                $locationFrom->google_map_url = $request->location_from['google_map_url'];
                $locationFrom->google_map_json = json_encode($request->location_from['google_map_json']);
                $locationFrom->save();

                $calendarEvent->location_from_id = $locationFrom->id;
                $calendarEvent->save();
            } else {
                $calendarEvent->location_from_id = null;
                $calendarEvent->save();
            }

            if (!empty($request->location_to)) {
                // save location_to pivot
                $locationTo = Location::where('id', '=', (int)$request->location_to['id'])->first();
                if (empty($locationFrom) || $isNew) {
                    $locationTo = new Location;
                }

                $locationTo->google_map_url = $request->location_to['google_map_url'];
                $locationTo->google_map_json = json_encode($request->location_to['google_map_json']);
                $locationTo->save();
                
                $calendarEvent->location_to_id = $locationTo->id;
                $calendarEvent->save();   
            } else {
                $calendarEvent->location_to_id = null;
                $calendarEvent->save();
            }

            // get current author
            $authService = new AuthService();
            $currentAuthorId = $authService->getCurrentLoginUser()->id;
            if(empty($currentAuthorId)) {
                abort(404, 'The current user is not found');
            }

            // save authors pivot
            $authorIds = [];
            if (count($request->authors)) {
                $authorIds = array_map(function ($author)
                {
                    return $author['id'];
                }, $request->authors);

                if (!in_array($currentAuthorId, $authorIds)) {
                    array_push($authorIds, $currentAuthorId);
                }
                $calendarEvent->authors()->sync($authorIds);
            }else {
                $calendarEvent->authors()->sync([$currentAuthorId]);
            }

            // save users pivot
            $userIds = [];
            if (count($request->users)) {
                $userIds = array_map(function ($user)
                {
                    return $user['id'];
                }, $request->users);
                $calendarEvent->users()->sync($userIds);
            } else {
                $calendarEvent->users()->sync([]);
            }

            // save images pivot
            if (count($request->images)) {
                $imageIds = $calendarEvent->images()->pluck('images.id')->all() ?? [];
                foreach ($request->images as $key => $imageItem) {
                    $image = Image::where('id', '=', (int)$imageItem['id'])->first();
                    if(!$image) {
                        $image = new Image;
                        $image->image_url = $imageItem['image_url'];
                        $image->image_key = $imageItem['image_key'];
                        $image->save();
                    }
                    if (!in_array($image->id, $imageIds)) {
                        array_push($imageIds, $image->id);
                    }
                }
                $calendarEvent->images()->sync($imageIds);
            } else {
                $calendarEvent->images()->sync([]);
            }

            // emails
            if (count($request->emails)) {
                $emailIds = $calendarEvent->emails()->pluck('emails.id')->all() ?? [];
                foreach ($request->emails as $key => $emailItem) {
                    $email = Email::where('id', '=', (int)$emailItem['id'])->first();
                    if(!$email) {
                        $email = new Email;
                        $email->subject = $emailItem['subject'];
                        $email->from_name = $emailItem['from_name'];
                        $email->from_mail = $emailItem['from_mail'];
                        $email->to_name = $emailItem['to_name'];
                        $email->to_mail = $emailItem['to_mail'];
                        $email->body = $emailItem['body'];
                        $email->save();
                    }
                    if (!in_array($email->id, $emailIds)) {
                        array_push($emailIds, $email->id);
                    }
                }
                $calendarEvent->emails()->sync($emailIds);
            } else {
                $calendarEvent->emails()->sync([]);
            }

            // pdfs
            if (count($request->pdfs)) {
                $pdfIds = $calendarEvent->pdfs()->pluck('pdfs.id')->all() ?? [];
                foreach ($request->pdfs as $key => $pdfItem) {
                    $pdf = Pdf::where('id', '=', (int)$pdfItem['id'])->first();
                    if(!$pdf) {
                        $pdf = new Pdf;
                        $pdf->pdf_url = $pdfItem['pdf_url'];
                        $pdf->pdf_key = $pdfItem['pdf_key'];
                        $pdf->save();
                    }
                    if (!in_array($pdf->id, $pdfIds)) {
                        array_push($pdfIds, $pdf->id);
                    }
                }
                $calendarEvent->pdfs()->sync($pdfIds);
            } else {
                $calendarEvent->pdfs()->sync([]);
            }

            return (object) [
                'status' => 200,
                'message' => 'Update Success'
            ];
    
        } catch (Exception $e) {
            abort(500, $e->getMessage());
        }
    }

    /**
     * delete events
     * @param $eventId event id
     * @return boolean
     *
     */
    public function deleteCalendarEvent ($calendarEventId)
    {
        $calendarEvent = CalendarEvent::where('id', '=', (int)$calendarEventId)->first();
        
        if (empty($calendarEvent)) {
            return false;
        } else {
            $userIds = $calendarEvent->users()->pluck('users.id')->all();
            $calendarEvent->users()->detach($userIds);

            $authorIds = $calendarEvent->authors()->pluck('authors.id')->all();
            $calendarEvent->authors()->detach($authorIds);

            $imageIds = $calendarEvent->images()->pluck('images.id')->all();
            $calendarEvent->images()->sync([]);
            foreach($imageIds as $imageId) {
                $image = Image::where('id', '=', (int)$imageId)->first();
                $image->delete();
            }

            $emailIds = $calendarEvent->emails()->pluck('emails.id')->all();
            $calendarEvent->emails()->sync([]);
            foreach($emailIds as $emailId) {
                $email = Email::where('id', '=', (int)$emailId)->first();
                $email->delete();
            }

            $pdfIds = $calendarEvent->pdfs()->pluck('pdfs.id')->all();
            $calendarEvent->pdfs()->sync([]);
            foreach($pdfIds as $pdfId) {
                $pdfnjh7 = Email::where('id', '=', (int)$pdfId)->first();
                $pdf->delete();
            }

            $calendarEvent->delete();
        }
    }
}