<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\LanguageService;

class LanguageController extends Controller
{   
    protected $authService;

    public function __construct(
        LanguageService $languageService
    )
    {
        $this->languageService = $languageService;
    }
    
    public function index () 
    {
        $languages =  $this->languageService->getLanguages();
        return response()->json($languages, 200);
    }
}
