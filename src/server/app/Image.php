<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'image_url',
        'image_key', 
    ];
    
    // images belongs to the event
    public function events()
    {
        return $this->belongsToMany('App\Models\Events')->withTimestamps();
    }
    
    
    // images belongs to the calendar event
    public function calendar_events()
    {
        return $this->belongsToMany('App\Models\CalendarEvents')->withTimestamps();
    }
}
