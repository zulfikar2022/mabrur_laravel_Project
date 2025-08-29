<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        RateLimiter::for('three-per-day', function ($request) {
        return Limit::perDay(3)
            ->by($request->ip())
            ->response(function () {
                return response()->json([
                    'message' => 'দিনে তিনটির বেশি অর্ডার করতে পারবেন না।',
                    'success' => false
                ], 429);
            });
    });
    }
}
