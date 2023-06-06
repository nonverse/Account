<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use Carbon\CarbonImmutable;
use Exception;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Client\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ApiController extends Controller
{
    public function initialize(Request $request): JsonResponse|array
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
            $response = Http::post(env('AUTH_SERVER') . 'oauth/token', [
                'grant_type' => 'authorization_code',
                'code' => $request->input('code',),
                'redirect_uri' => env('APP_URL'),
                'client_id' => env('OAUTH_CLIENT_ID'),
                'client_secret' => env('OAUTH_CLIENT_SECRET'),
                'scope' => 'test test1'
            ]);

            if (!$response->successful()) {
                return new JsonResponse([
                    'success' => false,
                    ...json_decode($response->body(), true)
                ]);
            }

            $this->setTokens($request, $response);

            return new JsonResponse([
                'success' => true,
            ]);
        }

        return $user;
    }

    protected function requestAuthorization(): JsonResponse
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

    protected function setTokens(Request $request, Response $response): void
    {
        $request->session()->put('access_token', [
            'token_value' => $response['access_token'],
            'token_expiry' => CarbonImmutable::createFromTimestamp(time() + $response['expires_in'])
        ]);
    }
}
