<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Repositories\LanguageRepository;
use App\Language;

class LanguageService implements LanguageRepository
{

    /**
     * get language list
     * @param 
     * @return Collection
     *
     */
    public function getLanguages () 
    {
        return Language::all();  
    }
}