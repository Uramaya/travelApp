<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    // use HasFactory;

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
        return $this->belongsToMany('App\User')->withPivot('author_id')->withTimestamps();
    }

    // locations of the event
    public function locations()
    {
        return $this->belongsToMany('App\Location')->withTimestamps();
    }

    // users of the event
    public function users()
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }

    // images of the event
    public function images()
    {
        return $this->belongsToMany('App\Image')->withTimestamps();
    }
    
    // child calendar events
    public function calendarEvents()
    {
        return $this->hasMany('App\CalendarEvent');
    }
}
