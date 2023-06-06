<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use Exception;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ApiController extends Controller
{
    public function initialize(Request $request)
    {
        $jwt = $request->cookie('user_session');

        if (!$jwt) {
            return $this->requestAuthorization();
        }

        try {
            $user = (array)JWT::decode($jwt, new Key(config('auth.public_key'), 'RS256'));
            //TODO Get access token using refresh token
        } catch (ExpiredException $e) {
            return $this->requestAuthorization();
        }

        if ($request->input('code')) {
            // TODO get access token using authorization code
        }

        return $user;
    }

    public function requestAuthorization(): JsonResponse
    {
        $query = http_build_query([
            'response_type' => 'code',
            'client_id' => env('OAUTH_CLIENT_ID'),
            'redirect_uri' => env('APP_URL'),
            'scope' => 'test test1',
        ]);

        return new JsonResponse([
            'success' => false,
            'data' => [
                'auth_url' => env('AUTH_SERVER') . 'oauth/authorize?' . $query
            ],
            'error' => 'unauthenticated'
        ], 401);
    }
}
