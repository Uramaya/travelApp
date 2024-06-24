<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'icon', 
    ];
    
    // users belongs to the language
    public function users()
    {
        return $this->hasMany('App\Models\Users');
    }
}
