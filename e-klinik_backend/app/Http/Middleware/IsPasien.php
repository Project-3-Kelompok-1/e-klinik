<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsPasien
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->user()->role !== 'pasien') {
            return response()->json([
                'status' => 'failed',
                'message' => 'Permission denied'
            ], 403);
        }
        return $next($request);
    }
}
