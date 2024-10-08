<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;

class AuthController extends Controller
{   
    protected $authService;

    public function __construct(
        AuthService $authService
    )
    {
        $this->authService = $authService;
    }
    
    public function currentUser () 
    {
        $user =  $this->authService->getCurrentLoginUser();
        return json($user, 200);
    }
}
