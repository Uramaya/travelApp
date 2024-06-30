<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Factories\HasFactory;

class EventType extends Model
{
    // use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'icon', 
        'type',
        'color',
        'background_color',
        'event_type_id',
    ];
    
    // calendar events belongs to the event type
    public function calendar_events()
    {
        return $this->hasMany('App\CalendarEvent')->withTimestamps();
    }

    // parent event type of the event type
    public function parent_event_type()
    {
        return $this->belongsTo('App\EventType');
    }

    // child event types belongs to the event type
    public function child_event_types()
    {
        return $this->hasMany('App\EventType', 'event_type_id');
    }
}
