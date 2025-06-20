<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class Authenticate extends Middleware
{
    protected function redirectTo(Request $request): ?string
    {
        return null; // Pastikan tidak redirect ke route login
    }

    protected function unauthenticated($request, array $guards)
    {
        abort(response()->json([
            'message' => 'Unauthorized access',
        ], 401));
    }
}
