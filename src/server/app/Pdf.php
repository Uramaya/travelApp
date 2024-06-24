<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pdf extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'pdf_url',
        'pdf_key', 
    ];
    
    // pdfs belongs to the calendar event
    public function calendar_events()
    {
        return $this->belongsToMany('App\Models\CalendarEvents')->withTimestamps();
    }
}
