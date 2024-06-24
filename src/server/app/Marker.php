<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Marker extends Model
{
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
        return $this->hasMany('App\Models\CalendarEvents');
    }
}
