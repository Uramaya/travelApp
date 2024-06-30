<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Factories\HasFactory;

class Location extends Model
{
    
    // use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'google_map_url',
        'google_map_json', 
    ];

    // events belong to the location
    public function events()
    {
        return $this->belongsToMany('App\Event')->withTimestamps();
    }

    // calendar events belong to the location
    public function calendar_events()
    {
        return $this->belongsToMany('App\CalendarEvent')->withTimestamps();
    }

    // calendar events belong to from locations(start location)
    public function locations_from_calendar_events()
    {
        return $this->belongsTo('App\CalendarEvent', 'location_from_id');
    }

    // calendar events belong to to locations(destination)
    public function locations_to_calendar_events()
    {
        return $this->belongsTo('App\CalendarEvent', 'location_to_id');
    }
}
