<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Factories\HasFactory;

class Language extends Model
{
    
    // use HasFactory;

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
        return $this->hasMany('App\User');
    }
}
