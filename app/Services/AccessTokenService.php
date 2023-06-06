<?php

namespace App\Services;

use Carbon\CarbonImmutable;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AccessTokenService
{
    /**
     * Get access token using authorization code
     *
     * @param Request $request
     * @return array|true[]
     */
    public function usingAuthCode(Request $request): array
    {
        /**
         * Request access token using authorization code
         */
        $response = Http::post(env('AUTH_SERVER') . 'oauth/token', [
            'grant_type' => 'authorization_code',
            'code' => $request->input('code',),
            'redirect_uri' => env('APP_URL'),
            'client_id' => env('OAUTH_CLIENT_ID'),
            'client_secret' => env('OAUTH_CLIENT_SECRET'),
            'scope' => 'test test1'
        ]);

        if (!$response->successful()) {
            return [
                'success' => false,
                ...json_decode($response->body(), true)
            ];
        }

        /**
         * Set tokens
         */
        $this->setTokens($request, $response);

        return [
            'success' => true,
        ];
    }

    /**
     * Set tokens
     *
     * @param Request $request
     * @param Response $response
     * @return void
     */
    protected function setTokens(Request $request, Response $response): void
    {
        /**
         * Set access token and expiry in an encrypted session store
         */
        $request->session()->put('access_token', [
            'token_value' => $response['access_token'],
            'token_expiry' => CarbonImmutable::createFromTimestamp(time() + $response['expires_in'])
        ]);
    }
}
