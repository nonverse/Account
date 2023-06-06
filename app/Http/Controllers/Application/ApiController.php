<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use App\Services\AccessTokenService;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    /**
     * @var AccessTokenService
     */
    private AccessTokenService $accessTokenService;

    public function __construct(
        AccessTokenService $accessTokenService
    )
    {
        $this->accessTokenService = $accessTokenService;
    }

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
            return new JsonResponse($this->accessTokenService->usingAuthCode($request));
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
}
