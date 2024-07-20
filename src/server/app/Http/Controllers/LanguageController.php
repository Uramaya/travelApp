<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\LanguageService;

class LanguageController extends Controller
{   
    public function index () 
    {
        $languageService = new LanguageService();
        $languages =  $languageService->getLanguages();
        return response()->json($languages, 200);
    }
}
