<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Factories\HasFactory;

class CalendarEvent extends Model
{
    // use HasFactory;

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
        return $this->belongsToMany('App\User')->withPivot('author_id')->withTimestamps();
    }

    // location of the calendar event
    public function location()
    {
        return $this->belongsTo('App\Location');
    }

    // from location(start location) of the calendar event
    public function location_from()
    {
        return $this->belongsTo('App\Location');
    }

    // to location(destination) of the calendar event
    public function location_to()
    {
        return $this->belongsTo('App\Location');
    }

    // users of the calendar event
    public function users()
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }

    // images of the calendar event
    public function images()
    {
        return $this->belongsToMany('App\Image')->withTimestamps();
    }
    
    // parent event of the calendar event
    public function event()
    {
        return $this->belongsTo('App\Event');
    }

    // event type
    public function event_type()
    {
        return $this->belongsTo('App\EventType');
    }

    // emails of the calendar event
    public function emails()
    {
        return $this->belongsToMany('App\Email')->withTimestamps();
    }

    // pdfs of the calendar event
    public function pdfs()
    {
        return $this->belongsToMany('App\Pdf')->withTimestamps();
    }

    // marker of the calendar event
    public function marker()
    {
        return $this->belongsTo('App\Marker');
    }
}
