<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Factories\HasFactory;

class Author extends Model
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
    public function events()
    {
        return $this->belongsToMany('App\Event')->withTimestamps();
    }

    // calendar events created by the author
    public function calendar_events()
    {
        return $this->belongsToMany('App\CalendarEvent')->withTimestamps();
    }

    // language of the author
    public function language()
    {
        return $this->belongsTo('App\Language');
    }

}
