<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CalendarEvent extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'marker_id', 
        'time_zone_name',
        'start',
        'end',
        'is_all_day',
        'watch',
        'like',
        'event_type_id',
        'location_id',
        'location_from_id',
        'location_to_id',
        'event_id',
        'description',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'start' => 'datetime',
        'end' => 'datetime',
    ];

    // authors of the calendar event
    public function authors()
    {
        return $this->belongsToMany('App\Models\Users')->withPivot('author_id')->withTimestamps();
    }

    // location of the calendar event
    public function location()
    {
        return $this->belongsTo('App\Models\Locations');
    }

    // from location(start location) of the calendar event
    public function location_from()
    {
        return $this->belongsTo('App\Models\Locations');
    }

    // to location(destination) of the calendar event
    public function location_to()
    {
        return $this->belongsTo('App\Models\Locations');
    }

    // users of the calendar event
    public function users()
    {
        return $this->belongsToMany('App\Models\Users')->withTimestamps();
    }

    // images of the calendar event
    public function images()
    {
        return $this->belongsToMany('App\Models\Images')->withTimestamps();
    }
    
    // parent event of the calendar event
    public function event()
    {
        return $this->belongsTo('App\Models\Event');
    }

    // event type
    public function event_type()
    {
        return $this->belongsTo('App\Models\EventTypes');
    }

    // emails of the calendar event
    public function emails()
    {
        return $this->belongsToMany('App\Models\Emails')->withTimestamps();
    }

    // pdfs of the calendar event
    public function pdfs()
    {
        return $this->belongsToMany('App\Models\Pdfs')->withTimestamps();
    }

    // marker of the calendar event
    public function marker()
    {
        return $this->belongsTo('App\Models\Markers');
    }
}
