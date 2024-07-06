<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface AuthRepository
{  
    /**
     * get the current login user
     * @param 
     * @return object
     *
     */
    public function getCurrentLoginUser ();
}