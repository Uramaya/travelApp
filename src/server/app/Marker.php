<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Factories\HasFactory;

class Marker extends Model
{
    
    // use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'color',
        'background_color', 
    ];
    
    // calendar events belongs to the marker
    public function calendarEvents()
    {
        return $this->hasMany('App\CalendarEvent');
    }
}
