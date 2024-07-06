<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface LanguageRepository
{  
    /**
     * get the language list
     * @param 
     * @return array
     *
     */
    public function getLanguages ();
}