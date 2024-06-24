<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventType extends Model
{
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
        return $this->hasMany('App\Models\CalendarEvents')->withTimestamps();
    }

    // parent event type of the event type
    public function parent_event_type()
    {
        return $this->belongsTo('App\Models\EventTypes');
    }

    // child event types belongs to the event type
    public function child_event_types()
    {
        return $this->hasMany('App\Models\EventTypes', 'event_type_id');
    }
}
