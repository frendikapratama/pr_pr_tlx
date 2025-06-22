<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\PaketController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PengirimanController;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/paket/search', [PaketController::class, 'searchByNoResi']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/paket', [PaketController::class, 'index']);
    Route::post('/paket', [PaketController::class, 'store']);
    Route::put('/paket/{id}', [PaketController::class, 'update']);
    Route::delete('/paket/{id}', [PaketController::class, 'destroy']);

    Route::get('/pengiriman', [PengirimanController::class, 'index']);
    Route::post('/pengiriman', [PengirimanController::class, 'store']);
    Route::post('/pengiriman/{id}', [PengirimanController::class, 'update']);
    Route::delete('/pengiriman/{id}', [PengirimanController::class, 'destroy']);

    Route::get('/users', [AuthController::class, 'index']);
    Route::post('/user', [AuthController::class, 'store']);
    Route::put('/user/{id}', [AuthController::class, 'update']);
    Route::delete('/user/{id}', [AuthController::class, 'destroy']);    
    
    Route::get('/me', function () {
        return auth()->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
});

