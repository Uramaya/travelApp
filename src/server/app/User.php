<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Model
{
    
    // use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'language_id',
        'icon_url',
        'time_zone_name',
        'deleted_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];
    
    // events created by the author
    public function author_events()
    {
        return $this->belongsToMany('App\Event')->withPivot('author_id')->withTimestamps();
    }

    // events created by the user
    public function user_events()
    {
        return $this->belongsToMany('App\Event')->withTimestamps();
    }

    // calendar events created by the author
    public function author_calendar_events()
    {
        return $this->belongsToMany('App\CalendarEvent')->withPivot('author_id')->withTimestamps();
    }

    // calendar events created by the user
    public function user_calendar_events()
    {
        return $this->belongsToMany('App\CalendarEvent')->withTimestamps();
    }

    // language of the user
    public function language()
    {
        return $this->belongsTo('App\Language');
    }

}
