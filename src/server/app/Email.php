<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'subject',
        'from_name', 
        'from_mail',
        'to_name',
        'to_mail',
        'body',
    ];

    // emails belongs to the calendar event
    public function calendar_events()
    {
        return $this->belongsToMany('App\Models\CalendarEvents')->withTimestamps();
    }
}
