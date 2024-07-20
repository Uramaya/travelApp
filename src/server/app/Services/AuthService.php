<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Repositories\AuthRepository;
use App\User;

class AuthService implements AuthRepository
{

    /**
     * get the current login user
     * @param 
     * @return object
     *
     */
    public function getCurrentLoginUser ()
    {
        return User::where('id', 1)->first();
    }
}