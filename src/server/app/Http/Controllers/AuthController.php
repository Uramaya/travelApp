<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;

class AuthController extends Controller
{   
    public function currentUser () 
    {
        $authService = new AuthService();
        $user =  $authService->getCurrentLoginUser();
        return json($user, 200);
    }
}
