<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
|
*/

/**
 * Forwards API requests
 */
Route::post('/forward-request', [\App\Http\Controllers\Application\ForwardRequestController::class, 'forward']);
