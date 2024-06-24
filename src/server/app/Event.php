<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'time_zone_name', 
        'start',
        'end',
        'author_ids',
        'watch',
        'like',
        'description',
    ];
    
    // authors of the event
    public function authors()
    {
        return $this->belongsToMany('App\Models\Users')->withPivot('author_id')->withTimestamps();
    }

    // locations of the event
    public function locations()
    {
        return $this->belongsToMany('App\Models\Locations')->withTimestamps();
    }

    // users of the event
    public function users()
    {
        return $this->belongsToMany('App\Models\Users')->withTimestamps();
    }

    // images of the event
    public function images()
    {
        return $this->belongsToMany('App\Models\Images')->withTimestamps();
    }
    
    // child calendar events
    public function calendarEvents()
    {
        return $this->hasMany('App\Models\CalendarEvent');
    }
}
