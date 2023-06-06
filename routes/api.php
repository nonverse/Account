<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
|
*/

Route::post('/initialize', [\App\Http\Controllers\Application\ApiController::class, 'initialize']);
