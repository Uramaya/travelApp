<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Factories\HasFactory;

class Image extends Model
{
    
    // use HasFactory;
    
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
        return $this->belongsToMany('App\Event')->withTimestamps();
    }
    
    
    // images belongs to the calendar event
    public function calendar_events()
    {
        return $this->belongsToMany('App\CalendarEvent')->withTimestamps();
    }
}
