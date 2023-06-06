<?php

namespace App\Repositories;

use App\Contracts\Repository\RefreshTokenRepositoryInterface;
use App\Models\RefreshToken;

class RefreshTokenRepository extends Repository implements RefreshTokenRepositoryInterface
{

    public function model(): string
    {
        return RefreshToken::class;
    }
}
