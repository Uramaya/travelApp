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


            $event = Event::find($request->event_id);
            if(empty($event)) {
                // if event doesn't exist, stop the save process
                abort(404, 'The event is not found');
            }

            // create or update the calendar event
            $isNew = false;
            $calendarEvent = CalendarEvent::find($request->id);
            if(empty($calendarEvent)) {
                $calendarEvent = new CalendarEvent();
                $isNew = true;
            }

            $calendarEvent->title =  $request->title;
            $calendarEvent->index =  $request->index;
            $calendarEvent->time_zone_name =  $request->time_zone_name;
            $calendarEvent->start =  new Carbon($request->start);
            $calendarEvent->end =  new Carbon($request->end);
            $calendarEvent->is_all_day = $request->is_all_day;
            $calendarEvent->watch =  $request->watch;
            $calendarEvent->like =  $request->like;
            $calendarEvent->event_type_id =  $request->event_type['id'];
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
            $location = Location::find($request->location['id']);
            if (empty($location) || $isNew) {
                $location = new Location;
            }

            $location->google_map_url = $request->location['google_map_url'];
            $location->google_map_json = json_encode($request->location['google_map_json']);
            $location->save();
            
            $calendarEvent->location_id = $location->id;
            $calendarEvent->save();

            // save location_from pivot
            $locationFrom = Location::find($request->location_from['id']);
            if (empty($locationFrom) || $isNew) {
                $locationFrom = new Location;
            }

            $locationFrom->google_map_url = $request->location_from['google_map_url'];
            $locationFrom->google_map_json = json_encode($request->location_from['google_map_json']);
            $locationFrom->save();
            
            $calendarEvent->location_from_id = $locationFrom->id;
            $calendarEvent->save();

            // save location_to pivot
            $locationTo = Location::find($request->location_to['id']);
            if (empty($locationFrom) || $isNew) {
                $locationTo = new Location;
            }

            $locationTo->google_map_url = $request->location_to['google_map_url'];
            $locationTo->google_map_json = json_encode($request->location_to['google_map_json']);
            $locationTo->save();
            
            $calendarEvent->location_to_id = $locationTo->id;
            $calendarEvent->save();

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
                    $image = Image::find($imageItem['id']);
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
                $calendarEvent->users()->sync($imageIds);
            } else {
                $calendarEvent->users()->sync([]);
            }

            // emails
            if (count($request->emails)) {
                $emailIds = $calendarEvent->emails()->pluck('emails.id')->all() ?? [];
                foreach ($request->emails as $key => $emailItem) {
                    $email = Email::find($emailItem['id']);
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
                    $pdf = Pdf::find($pdfItem['id']);
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
    
        }catch (Exception $e) {
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
        $calendarEvent = CalendarEvent::find($calendarEventId);

        if (empty($calendarEvent)) {
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