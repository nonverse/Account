<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PersonalInfoController extends Controller
{
    /**
     * @return Response
     */
    public function show(): Response
    {
        return Inertia::render('PersonalInfo/PersonalInfo');
    }
}
