<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ForwardRequestController extends Controller
{
    public function forward(Request $request)
    {
        $accessToken = $request->session()->get('access_token')['token_value'];

        if ($request->input('target') === 'api') {

            if ($request->input('method') === 'GET') {
                return Http::withToken($accessToken)->get(env('API_SERVER') . $request->input('url'));
            }

            if ($request->input('method') === 'POST') {
                return Http::withToken($accessToken)->post(env('API_SERVER') . $request->input('url'));
            }
        }
    }
}
